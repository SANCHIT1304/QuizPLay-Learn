import mongoose from 'mongoose';

const playlistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true }, // YouTube playlist URL
  thumbnail: { type: String }, // Optional: preview image
  category: {
    type: String,
    enum: ['All Subjects', 'Placement Prep', 'Skill Tracks'],
    required: true,
  },
  year: { type: String, required: true }, // E.g., "1st Year"
  subject: {type: String, required: true},
  videos: [
    {
      title: String,
      videoId: String,
      url: String,
      thumbnail: String
    }
  ],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional
}, { timestamps: true });

const Playlist = mongoose.model('Playlist', playlistSchema);
export default Playlist;
