// models/Reward.js
import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  cost: { type: Number, required: true },
  icon: { type: String, default: '🏆' }, // emoji or url
  type: { type: String, enum: ['badge', 'perk'], default: 'badge' },
});

const Reward = mongoose.model('Reward', rewardSchema);
export default Reward;
