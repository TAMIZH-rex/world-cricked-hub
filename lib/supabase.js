// lib/supabase.js — Shared Supabase client (server-side only)
// Uses service-role key for full database access (never exposed to browser)

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️  SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set in .env");
}

const supabase = createClient(supabaseUrl || "", supabaseKey || "");

module.exports = supabase;
