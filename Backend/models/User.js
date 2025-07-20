// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: {
//     type: String,
//     enum: ["patient", "doctor", "admin"],
//     default: "patient",
//   },
//   isVerified: {
//     type: Boolean,
//     default: false, // admin sets true when verifying doctor
//   },
// }, { timestamps: true });

// export default mongoose.model("User", userSchema);

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // will be hashed
  year: { type: String, enum: ["1st", "2nd", "3rd", "4th"], required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  tokens: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastActiveDate: { type: Date },
  quizHistory: [
    {
      subject: String,
      score: Number,
      date: { type: Date, default: Date.now },
    },
  ],
  ownedRewards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reward' }]
});

const User = mongoose.model("User", userSchema);
export default User;