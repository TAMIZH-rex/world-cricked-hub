// api/polls/[pollId]/vote.js — Vercel serverless function: POST vote
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  const { pollId } = req.query;
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

    // 3. Check duplicate vote (UNIQUE constraint on poll_id + voter_token)
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

    // 4. Insert vote record
    const { error: voteErr } = await supabase.from("votes").insert({
      poll_id: pollId,
      option_id: optionId,
      voter_token: token,
    });

    if (voteErr) {
      // Handle race condition: UNIQUE constraint violation
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

    return res.status(200).json({
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
    return res
      .status(500)
      .json({ success: false, error: "Failed to record vote" });
  }
};
