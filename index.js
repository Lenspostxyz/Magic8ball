const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); // Serves static files correctly

// Magic 8-Ball possible answers
const responses = [
  "Yes, absolutely!",
  "No way, try again!",
  "The stars are unsure, ask later.",
  "Most likely, yes!",
  "Don't count on it.",
  "Ask again later.",
  "Definitely!",
  "Not in a million years.",
  "Signs point to yes.",
  "Better not tell you now."
];

// API for Farcaster Frame
app.get("/frame", (req, res) => {
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  res.json({
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Magic_eight_ball.png",
    buttons: [
      {
        label: "Ask the Magic 8-Ball",
        action: "post_redirect",
        target: "/answer"
      }
    ],
    text: `🎱 The Magic 8-Ball says: "${randomResponse}"`
  });
});

// ✅ Serve the frontend page at `/answer`
app.get("/answer", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API to return a random answer
app.get("/api/answer", (req, res) => {
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  res.json({ response: randomResponse });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Magic 8-Ball Frame running on port ${PORT}`);
});
