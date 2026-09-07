require('dotenv').config();
const express = require("express");

const app = express();

app.use(express.static(__dirname));

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/test", (req, res) => {
  res.json({
    message: "Cricket Hub API is working! 🏏",
    apiKeyLoaded: !!process.env.API_KEY
  });
});

app.get("/matches", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.cricapi.com/v1/currentMatches?apikey=${process.env.API_KEY}&offset=0`
    );

    const data = await response.json();

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch cricket data"
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log("API key loaded:", process.env.API_KEY ? "YES ✅" : "NO ❌");
});