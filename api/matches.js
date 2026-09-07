require('dotenv').config();

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const apiKey = process.env.API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ 
        error: "API_KEY environment variable is not configured" 
      });
    }

    const response = await fetch(
      `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`
    );

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching cricket data:", error);
    return res.status(500).json({ 
      error: "Failed to fetch cricket data" 
    });
  }
};
