export const computeAchievements = (user) => {
  const achievements = [];

  const quizCount = user.quizHistory.length;
  const perfectScores = user.quizHistory.filter(q => q.score === 10).length;
  const streak = user.streak;
  const videosWatched = user.videoHistory?.length || 0;

  // Quiz Mastery
  if (quizCount >= 1) achievements.push("First Steps");
  if (quizCount >= 5) achievements.push("Quiz Explorer");
  if (quizCount >= 10) achievements.push("Knowledge Seeker");
  if (quizCount >= 25) achievements.push("Quiz Master");
  if (quizCount >= 50) achievements.push("Learning Legend");
  if (quizCount >= 100) achievements.push("Quiz Champion");

  // Perfection
  if (perfectScores >= 1) achievements.push("Perfect Start");
  if (perfectScores >= 3) achievements.push("Consistency");
  if (perfectScores >= 10) achievements.push("Perfectionist");
  if (perfectScores >= 25) achievements.push("Flawless");

  // Streak
  if (streak >= 1) achievements.push("Day One");
  if (streak >= 3) achievements.push("Committed");
  if (streak >= 7) achievements.push("Dedicated");
  if (streak >= 14) achievements.push("Persistent");
  if (streak >= 30) achievements.push("Unstoppable");
  if (streak >= 60) achievements.push("Legendary");

  // Video Badges
  if (videosWatched >= 1) achievements.push("Video Beginner");
  if (videosWatched >= 5) achievements.push("Video Explorer");
  if (videosWatched >= 10) achievements.push("Video Master");
  if (videosWatched >= 25) achievements.push("Video Champion");

  return achievements;
};
