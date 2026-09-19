-- FAN BATTLE SEED DATA
-- Run this in Supabase SQL Editor

INSERT INTO polls (id, question) VALUES
  ('fb-ind-vs-aus', 'Who will dominate — India or Australia?'),
  ('fb-kohli-vs-sachin', 'Greatest batsman of all time?'),
  ('fb-ind-vs-eng', 'Who will win — India or England?'),
  ('fb-babar-vs-kohli', 'Best modern-era batsman?'),
  ('fb-warne-vs-murali', 'Greatest spinner of all time?'),
  ('fb-dhoni-vs-ponting', 'Greatest captain ever?')
ON CONFLICT (id) DO NOTHING;

INSERT INTO poll_options (id, poll_id, option_text) VALUES
  ('fb-ind', 'fb-ind-vs-aus', 'India'),
  ('fb-aus', 'fb-ind-vs-aus', 'Australia'),
  ('fb-kohli', 'fb-kohli-vs-sachin', 'Virat Kohli'),
  ('fb-sachin', 'fb-kohli-vs-sachin', 'Sachin Tendulkar'),
  ('fb-ind2', 'fb-ind-vs-eng', 'India'),
  ('fb-eng', 'fb-ind-vs-eng', 'England'),
  ('fb-babar', 'fb-babar-vs-kohli', 'Babar Azam'),
  ('fb-kohli2', 'fb-babar-vs-kohli', 'Virat Kohli'),
  ('fb-warne', 'fb-warne-vs-murali', 'Shane Warne'),
  ('fb-murali', 'fb-warne-vs-murali', 'Muttiah Muralitharan'),
  ('fb-dhoni', 'fb-dhoni-vs-ponting', 'MS Dhoni'),
  ('fb-ponting', 'fb-dhoni-vs-ponting', 'Ricky Ponting')
ON CONFLICT (id) DO NOTHING;
