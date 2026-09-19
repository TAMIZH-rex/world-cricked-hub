// api/polls.js — Vercel serverless function: GET all polls with results
const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

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

    return res.status(200).json({ success: true, polls: result });
  } catch (error) {
    console.error("Error fetching polls:", error);
    return res.status(500).json({ success: false, error: "Failed to fetch polls" });
  }
};
