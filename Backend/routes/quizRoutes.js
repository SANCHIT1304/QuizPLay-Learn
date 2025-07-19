import express from "express";
import User from "../models/User.js";

const router = express.Router();

// router.post("/submit-quiz", async (req, res) => {
//   const { userId, subject, score, tokensEarned } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     // update tokens
//     user.tokens += tokensEarned;

//     // update quiz history
//     user.quizHistory.push({
//       subject,
//       score,
//     });

//     await user.save();

//     res.json({ message: "Quiz result saved", tokens: user.tokens, quizHistoryCount: user.quizHistory.length });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to save quiz result" });
//   }
// });

router.post("/submit-quiz", async (req, res) => {
  const { userId, subject, score, tokensEarned } = req.body;

  if (!userId || !subject || score == null || tokensEarned == null) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let lastActive = user.lastActiveDate ? new Date(user.lastActiveDate) : null;
    if (lastActive) lastActive.setHours(0, 0, 0, 0);

    if (!lastActive) {
      // First time playing
      user.streak = 1;
    } else if (lastActive.getTime() === today.getTime()) {
      // Already played today → streak remains
    } else if (lastActive.getTime() === yesterday.getTime()) {
      // Continued streak
      user.streak += 1;
    } else {
      // Missed one or more days → reset streak
      user.streak = 1;
    }

    user.lastActiveDate = today;

    user.tokens += tokensEarned;

    user.quizHistory.push({
      subject,
      score,
      date: new Date(),
    });

    await user.save();

    res.json({
      message: "Quiz submitted & streak updated",
      streak: user.streak,
      tokens: user.tokens,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;