import express from 'express'
import axios from 'axios';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import authRoutes from './routes/authRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js';
import quizRoutes from "./routes/quizRoutes.js";
import User from "./models/User.js";


// const express = require('express')
const app = express()
const port = process.env.PORT || 3000


connectDB() // Connect to MongoDB



//middlewares
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies to be sent with requests
}

app.use(cors(corsOptions)); // Enable CORS with options
// app.use(cors()) // Enable CORS for all origins (not recommended for production)

app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/playlists', playlistRoutes);
// app.get('/api/quiz', async (req, res) => {
//   const { videoId } = req.query;
//   const response = await axios.post('http://localhost:5000/generate-quiz', { videoId });
//   res.json(response.data);
// });

// app.get('/api/quiz', async (req, res) => {
//   const { videoId } = req.params;
//   console.log(videoId);
//   const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
//   console.log(videoUrl);

//   try {
//     const response = await axios.post(
//       'http://localhost:5000/generate-quiz',
//       { video_url: videoUrl } //  match Flask expected body
//     );
//     res.json(response.data);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to fetch quiz" });
//   }
// });


app.get('/api/quiz', async (req, res) => {
  try {
    const { videoId } = req.query;
    const video_url = `https://www.youtube.com/watch?v=${videoId}`;
    console.log('Sending to Flask:', video_url);

    const response = await axios.post('http://127.0.0.1:5000/generate-quiz', {
      video_url,
    });

    if (!response.data || !response.data.quiz) {
      return res.status(500).json({ error: 'Quiz generation failed' });
    }

    res.json(response.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

app.use("/api", quizRoutes);

app.get('/api/leaderboard', async (req, res) => {
  try {
    const users = await User.find({role: "user"})
      .sort({ tokens: -1 }) // highest tokens first
      .select("name tokens streak year quizHistory avatar email") // only needed fields

    const leaderboard = users.map((u, idx) => ({
      rank: idx + 1,
      name: u.name,
      avatar: u.avatar,
      tokens: u.tokens,
      quizzes: u.quizHistory.length,
      streak: u.streak,
      year: u.year,
      userId: u._id
    }));

    res.json(leaderboard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});



//routes or api endpoints
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
