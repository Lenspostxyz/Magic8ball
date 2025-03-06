const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

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

app.get("/frame", (req, res) => {
  const randomResponse = responses[Math.floor(Math.random() * responses.length)];
  
  res.json({
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Magic_eight_ball.png", // Magic 8-Ball Image
    buttons: [
      {
        label: "Ask the Magic 8-Ball",
        action: "post_redirect",
        target: `https://your-frame.vercel.app/answer` // Redirects to another API call that returns a new answer
      }
    ],
    text: `🎱 The Magic 8-Ball says: "${randomResponse}"`
  });
});

app.listen(PORT, () => {
  console.log(`Magic 8-Ball Frame running on port ${PORT}`);
});
