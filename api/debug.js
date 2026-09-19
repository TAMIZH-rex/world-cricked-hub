// api/debug.js — Diagnostic endpoint (remove after testing)
const { createClient } = require("@supabase/supabase-js");

module.exports = async function handler(req, res) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const info = {
    hasUrl: !!url,
    hasKey: !!key,
    urlPreview: url ? url.substring(0, 30) + "..." : "MISSING",
    keyPreview: key ? key.substring(0, 20) + "..." : "MISSING",
  };

  if (!url || !key) {
    return res.status(500).json({ error: "Missing env vars", details: info });
  }

  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase.from("polls").select("id").limit(1);

    if (error) {
      return res.status(500).json({ error: "Supabase query failed", details: info, supabaseError: error.message });
    }

    return res.status(200).json({ status: "OK", details: info, sampleData: data });
  } catch (e) {
    return res.status(500).json({ error: "Exception", details: info, message: e.message });
  }
};
