require('dotenv').config();
const express = require("express");
const path = require("path");

const app = express();

// Serve static files
app.use(express.static(__dirname));

app.use(express.json());

// Test endpoint
app.get("/test", (req, res) => {
  res.json({
    message: "Cricket Hub API is working! 🏏",
    apiKeyLoaded: !!process.env.API_KEY
  });
});

// Matches endpoint
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

// Serve index.html for all other routes (for local development)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log("API key loaded:", process.env.API_KEY ? "YES ✅" : "NO ❌");
  });
}

module.exports = app;