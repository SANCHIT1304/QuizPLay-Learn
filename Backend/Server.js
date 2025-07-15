import express from 'express'
import axios from 'axios';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import authRoutes from './routes/authRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js';


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

//routes or api endpoints
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
