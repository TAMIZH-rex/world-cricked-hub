-- WORLD CRICKET HUB - FAN VOTE ARENA
-- Run this in Supabase SQL Editor

-- 1. Polls table
CREATE TABLE IF NOT EXISTS polls (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Poll options table
CREATE TABLE IF NOT EXISTS poll_options (
  id TEXT PRIMARY KEY,
  poll_id TEXT NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  vote_count INTEGER DEFAULT 0
);

-- 3. Votes table (with duplicate prevention)
CREATE TABLE IF NOT EXISTS votes (
  id BIGSERIAL PRIMARY KEY,
  poll_id TEXT NOT NULL REFERENCES polls(id) ON DELETE CASCADE,
  option_id TEXT NOT NULL REFERENCES poll_options(id) ON DELETE CASCADE,
  voter_token TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(poll_id, voter_token)
);

-- 4. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_poll_options_poll_id ON poll_options(poll_id);
CREATE INDEX IF NOT EXISTS idx_votes_poll_id ON votes(poll_id);
CREATE INDEX IF NOT EXISTS idx_votes_token ON votes(voter_token);

-- 5. Enable Row Level Security (RLS)
ALTER TABLE polls ENABLE ROW LEVEL SECURITY;
ALTER TABLE poll_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes ENABLE ROW LEVEL SECURITY;

-- 6. Policies
CREATE POLICY "Public can read polls" ON polls FOR SELECT USING (true);
CREATE POLICY "Public can read options" ON poll_options FOR SELECT USING (true);
CREATE POLICY "Public can read votes" ON votes FOR SELECT USING (true);
CREATE POLICY "Service role can insert polls" ON polls FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can insert options" ON poll_options FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can insert votes" ON votes FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role can update options" ON poll_options FOR UPDATE USING (true);
CREATE POLICY "Service role can delete all" ON polls FOR DELETE USING (true);
CREATE POLICY "Service role can delete options" ON poll_options FOR DELETE USING (true);
CREATE POLICY "Service role can delete votes" ON votes FOR DELETE USING (true);

-- 7. Seed data
INSERT INTO polls (id, question) VALUES
  ('favourite-cricketer', 'Who is your favourite cricketer of all time?'),
  ('best-captain', 'Who is the best cricket captain ever?'),
  ('best-format', 'Which cricket format do you enjoy the most?'),
  ('memorable-moment', 'What is the most memorable cricket moment?'),
  ('best-bowler', 'Who is the greatest bowler in cricket history?')
ON CONFLICT (id) DO NOTHING;

INSERT INTO poll_options (id, poll_id, option_text) VALUES
  ('sachin', 'favourite-cricketer', 'Sachin Tendulkar'),
  ('kohli', 'favourite-cricketer', 'Virat Kohli'),
  ('bradman', 'favourite-cricketer', 'Don Bradman'),
  ('lara', 'favourite-cricketer', 'Brian Lara'),
  ('dhoni', 'best-captain', 'MS Dhoni'),
  ('border', 'best-captain', 'Allan Border'),
  ('fleming', 'best-captain', 'Stephen Fleming'),
  ('sourav', 'best-captain', 'Sourav Ganguly'),
  ('test', 'best-format', 'Test Cricket'),
  ('odi', 'best-format', 'ODI Cricket'),
  ('t20', 'best-format', 'T20 Cricket'),
  ('ipl', 'best-format', 'IPL / Franchise Leagues'),
  ('wc2011', 'memorable-moment', 'India winning 2011 World Cup'),
  ('ashes2005', 'memorable-moment', 'Ashes 2005 epic series'),
  ('lara400', 'memorable-moment', 'Brian Lara 400 not out'),
  ('ind2007', 'memorable-moment', 'India winning 2007 T20 World Cup'),
  ('murali', 'best-bowler', 'Muttiah Muralitharan'),
  ('warne', 'best-bowler', 'Shane Warne'),
  ('wasim', 'best-bowler', 'Wasim Akram'),
  ('mcgrath', 'best-bowler', 'Glenn McGrath')
ON CONFLICT (id) DO NOTHING;

-- 8. Atomic increment function
CREATE OR REPLACE FUNCTION increment_vote(p_option_id TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE poll_options SET vote_count = vote_count + 1 WHERE id = p_option_id;
END;
$$ LANGUAGE plpgsql;
