require('dotenv').config();
const express = require("express");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const app = express();

// Serve static files
app.use(express.static(__dirname));
app.use(express.json());

// ========================================
// 🗄️ SUPABASE CLIENT (server-side only)
// ========================================
const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

// Test endpoint
app.get("/test", (req, res) => {
  res.json({
    message: "Cricket Hub API is working! 🏏",
    apiKeyLoaded: !!process.env.API_KEY,
    supabaseLoaded: !!process.env.SUPABASE_URL
  });
});

// Matches endpoint (unchanged — still uses Cricket Data API)
app.get("/matches", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.cricapi.com/v1/currentMatches?apikey=${process.env.API_KEY}&offset=0`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching cricket data:", error);
    res.status(500).json({ error: "Failed to fetch cricket data" });
  }
});

// ========================================
// 🗳️ FAN VOTE ARENA API (Supabase)
// ========================================

// GET all polls with results
app.get("/api/polls", async (req, res) => {
  try {
    // Fetch all polls
    const { data: polls, error: pollErr } = await supabase
      .from("polls")
      .select("id, question")
      .order("created_at", { ascending: true });

    if (pollErr) throw pollErr;

    // Fetch all options
    const { data: options, error: optErr } = await supabase
      .from("poll_options")
      .select("id, poll_id, option_text, vote_count");

    if (optErr) throw optErr;

    // Combine polls with their options
    const result = polls.map((poll) => {
      const pollOptions = options.filter((o) => o.poll_id === poll.id);
      const totalVotes = pollOptions.reduce((sum, o) => sum + o.vote_count, 0);

      return {
        id: poll.id,
        question: poll.question,
        options: pollOptions.map((o) => ({
          id: o.id,
          text: o.option_text,
          votes: o.vote_count,
          percentage:
            totalVotes > 0 ? Math.round((o.vote_count / totalVotes) * 100) : 0,
        })),
        totalVotes,
      };
    });

    res.json({ success: true, polls: result });
  } catch (error) {
    console.error("Error fetching polls:", error);
    res.status(500).json({ success: false, error: "Failed to fetch polls" });
  }
});

// POST vote on a poll
app.post("/api/polls/:pollId/vote", async (req, res) => {
  const { pollId } = req.params;
  const { optionId, token } = req.body || {};

  if (!optionId || !token) {
    return res
      .status(400)
      .json({ success: false, error: "Missing optionId or token" });
  }

  try {
    // 1. Verify poll exists
    const { data: poll, error: pollErr } = await supabase
      .from("polls")
      .select("id, question")
      .eq("id", pollId)
      .single();

    if (pollErr || !poll) {
      return res.status(404).json({ success: false, error: "Poll not found" });
    }

    // 2. Verify option exists for this poll
    const { data: option, error: optErr } = await supabase
      .from("poll_options")
      .select("id, option_text")
      .eq("id", optionId)
      .eq("poll_id", pollId)
      .single();

    if (optErr || !option) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid option for this poll" });
    }

    // 3. Check duplicate vote by token
    const { data: existing } = await supabase
      .from("votes")
      .select("id")
      .eq("poll_id", pollId)
      .eq("voter_token", token)
      .maybeSingle();

    if (existing) {
      return res.status(409).json({
        success: false,
        error: "You have already voted on this poll",
        alreadyVoted: true,
      });
    }

    // 4. Insert vote record (UNIQUE constraint on poll_id+voter_token as safety net)
    const { error: voteErr } = await supabase.from("votes").insert({
      poll_id: pollId,
      option_id: optionId,
      voter_token: token,
    });

    if (voteErr) {
      // Race condition: UNIQUE constraint violation = duplicate vote
      if (voteErr.code === "23505") {
        return res.status(409).json({
          success: false,
          error: "You have already voted on this poll",
          alreadyVoted: true,
        });
      }
      throw voteErr;
    }

    // 5. Increment vote count on the option
    const { error: updateErr } = await supabase.rpc("increment_vote", {
      p_option_id: optionId,
    });

    // Fallback: manual increment if RPC not set up
    if (updateErr) {
      const { data: currentOpt } = await supabase
        .from("poll_options")
        .select("vote_count")
        .eq("id", optionId)
        .single();

      await supabase
        .from("poll_options")
        .update({ vote_count: (currentOpt?.vote_count || 0) + 1 })
        .eq("id", optionId);
    }

    // 6. Return updated poll results
    const { data: updatedOptions } = await supabase
      .from("poll_options")
      .select("id, option_text, vote_count")
      .eq("poll_id", pollId);

    const totalVotes = updatedOptions.reduce(
      (sum, o) => sum + o.vote_count,
      0
    );

    res.json({
      success: true,
      message: "Vote recorded!",
      poll: {
        id: poll.id,
        question: poll.question,
        options: updatedOptions.map((o) => ({
          id: o.id,
          text: o.option_text,
          votes: o.vote_count,
          percentage:
            totalVotes > 0
              ? Math.round((o.vote_count / totalVotes) * 100)
              : 0,
        })),
        totalVotes,
      },
    });
  } catch (error) {
    console.error("Error recording vote:", error);
    res.status(500).json({ success: false, error: "Failed to record vote" });
  }
});

// Serve index.html for all other routes (for local development)
app.get("/{*path}", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log("API key loaded:", process.env.API_KEY ? "YES ✅" : "NO ❌");
    console.log("🗄️  Supabase loaded:", process.env.SUPABASE_URL ? "YES ✅" : "NO ❌");
    console.log("🗳️  Fan Vote Arena: /api/polls");
  });
}

module.exports = app;
