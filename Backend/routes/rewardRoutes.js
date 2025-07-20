// routes/rewards.js
import express from 'express';
import Reward from '../models/Reward.js';
import User from '../models/User.js';
import protect from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/rewards', protect, async (req, res) => {
  try {
    const rewards = await Reward.find();
    res.json(rewards);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rewards' });
  }
});

router.get('/user-rewards/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('ownedRewards');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      ownedRewardIds: user.ownedRewards.map(r => r._id)
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user rewards' });
  }
});

router.post('/redeem', protect, async (req, res) => {
  const { userId, rewardId } = req.body;

  try {
    const user = await User.findById(userId);
    const reward = await Reward.findById(rewardId);

    if (!user || !reward) {
      return res.status(404).json({ error: 'User or Reward not found' });
    }

    // if (user.ownedRewards.includes(rewardId)) {
    //   return res.status(400).json({ error: 'Reward already owned' });
    // }

    if (user.tokens < reward.cost) {
      return res.status(400).json({ error: 'Not enough tokens' });
    }

    user.tokens -= reward.cost;
    if (!user.ownedRewards.includes(reward._id)) {
      user.ownedRewards.push(reward._id);
    }
    // Deduct tokens and add reward
    // user.tokens -= reward.cost;
    // user.ownedRewards.push(reward._id);

    await user.save();

    res.json({
      success: true,
      message: 'Reward redeemed!',
      Tokens: user.tokens
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to redeem reward' });
  }
});

export default router;