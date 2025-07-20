// import express from 'express';
// import User from '../models/User.js';
// import { computeAchievements } from '../utils/computeAchievements.js';
// import authMiddleware from '../middlewares/authMiddleware.js';

// const router = express.Router();

// router.get('/:userId', authMiddleware, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.userId);
//     if (!user) return res.status(404).json({ error: 'User not found' });

//     const achievements = computeAchievements(user);
//     res.json({ achievements });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// export default router;
import express from 'express';
import User from '../models/User.js';
import protect from '../middlewares/authMiddleware.js';


const router = express.Router();

router.get('/achievements', protect, async (req, res) => {
  const user = req.user;

  const achievements = [];

  // Quiz Mastery Badges
  const quizCount = user.quizHistory.length;
  if (quizCount >= 1) achievements.push({ title: 'First Steps', description: 'Complete 1 quiz', icon: '🎉' });
  if (quizCount >= 5) achievements.push({ title: 'Quiz Explorer', description: 'Complete 5 quizzes', icon: '🚀' });
  if (quizCount >= 10) achievements.push({ title: 'Knowledge Seeker', description: 'Complete 10 quizzes', icon: '📘' });
  if (quizCount >= 25) achievements.push({ title: 'Quiz Master', description: 'Complete 25 quizzes', icon: '🏆' });
  if (quizCount >= 50) achievements.push({ title: 'Learning Legend', description: 'Complete 50 quizzes', icon: '👑' });
  if (quizCount >= 100) achievements.push({ title: 'Quiz Champion', description: 'Complete 100 quizzes', icon: '🔥' });

  // Streak Badges
  const streak = user.streak;
  if (streak >= 1) achievements.push({ title: 'Day One', description: '1-day streak', icon: '🌟' });
  if (streak >= 3) achievements.push({ title: 'Committed', description: '3-day streak', icon: '💪' });
  if (streak >= 7) achievements.push({ title: 'Dedicated', description: '7-day streak', icon: '🏅' });
  if (streak >= 14) achievements.push({ title: 'Persistent', description: '14-day streak', icon: '🎯' });
  if (streak >= 30) achievements.push({ title: 'Unstoppable', description: '30-day streak', icon: '🔥' });
  if (streak >= 60) achievements.push({ title: 'Legendary', description: '60-day streak', icon: '👑' });

  // Perfect Score Badges
  const perfectScores = user.quizHistory.filter(q => q.score === 10).length;
  if (perfectScores >= 1) achievements.push({ title: 'Perfect Start', description: 'Get first perfect score', icon: '✨' });
  if (perfectScores >= 3) achievements.push({ title: 'Consistency', description: 'Get 3 perfect scores', icon: '🔷' });
  if (perfectScores >= 10) achievements.push({ title: 'Perfectionist', description: 'Get 10 perfect scores', icon: '🏅' });
  if (perfectScores >= 25) achievements.push({ title: 'Flawless', description: 'Get 25 perfect scores', icon: '🔥' });

  res.json({ achievements });
});

export default router;
