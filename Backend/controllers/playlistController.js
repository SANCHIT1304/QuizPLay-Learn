import Playlist from '../models/Playlist.js';
import { fetchYouTubePlaylistVideos } from '../utils/fetchYouTubeVideo.js';

// POST: Add a new playlist
export const createPlaylist = async (req, res) => {
  try {
    const { title, url, category, year, subject } = req.body;

    if (!title || !url || !category || !year || !subject) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Step 1: Extract playlist ID from URL
    const match = url.match(/[?&]list=([a-zA-Z0-9_-]+)/);
    if (!match) return res.status(400).json({ message: "Invalid playlist URL" });

    const playlistId = match[1];

    // ✅ Step 2: Fetch videos from YouTube API using the helper
    const videos = await fetchYouTubePlaylistVideos(playlistId);

    // ✅ Step 3: Get thumbnail from first video (if any)
    const thumbnail = videos.length > 0 ? videos[0].thumbnail : null;

    // ✅ Step 4: Create new playlist document
    const newPlaylist = new Playlist({
      title,
      url,
      thumbnail,
      category,
      year,
      subject,
      videos,
      createdBy: req.user._id, // from logged-in admin
    });

    // ✅ Step 5: Save it to MongoDB
    await newPlaylist.save();

    // ✅ Step 6: Send response
    res.status(201).json({
      message: "Playlist created successfully",
      playlist: newPlaylist,
    });

  } catch (err) {
    console.error("Error in createPlaylist:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// get all playlist
// GET /api/playlists
export const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.status(200).json(playlists);
  } catch (err) {
    res.status(500).json({ message: "Error fetching playlists", error: err.message });
  }
};

// Get Playlists by Category (All Playlists in a Category)
// GET /api/playlists/category/:category
export const getPlaylistsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }
    const playlists = await Playlist.find({ category });
    res.status(200).json(playlists);
  } catch (err) {
    res.status(500).json({ message: "Error fetching playlists", error: err.message });
  }
};

// Get Playlists by Year (All Playlists for a Year, regardless of subject)
// GET /api/playlists/year/:year
export const getPlaylistsByYear = async (req, res) => {
  try {
    const { year } = req.params;
    if (!year) {
      return res.status(400).json({ message: "Year is required" });
    }
    const playlists = await Playlist.find({ year });
    res.status(200).json(playlists);
  } catch (err) {
    res.status(500).json({ message: "Error fetching playlists", error: err.message });
  }
};

// Get Playlists by Year and Subject (for All Subjects category)
// GET /api/playlists/byYearAndSubject?year=1st%20Year&subject=Physics
export const getPlaylistsByYearAndSubject = async (req, res) => {
  try {
    const { year, subject } = req.params;
    console.log({year , subject});
    
    if (!year || !subject) {
      return res.status(400).json({ message: "Year and subject are required" });
    }
    const playlists = await Playlist.find({ year, subject, category: "All Subjects" });
    res.status(200).json(playlists);
  } catch (err) {
    res.status(500).json({ message: "Error fetching playlists", error: err.message });
  }
};

// Get Unique Subjects for a Category (e.g., Placement Prep, Skill Tracks)
// GET /api/subjects?category=Placement%20Prep
export const getSubjectsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    if (!category) {
      return res.status(400).json({ message: "Category is required" });
    }
    const subjects = await Playlist.distinct('subject', { category });
    res.status(200).json(subjects);
  } catch (err) {
    res.status(500).json({ message: "Error fetching subjects", error: err.message });
  }
};

// Get Playlists by Category and Subject (for Placement Prep or Skill Tracks)
// GET /api/playlists/byCategoryAndSubject?category=Placement%20Prep&subject=DSA
// export const getPlaylistsByCategoryAndSubject = async (req, res) => {
//   try {
//     const { category, subject } = req.params;
//     if (!category || !subject) {
//       return res.status(400).json({ message: "Category and subject are required" });
//     }
//     const playlists = await Playlist.find({ category, subject });
//     res.status(200).json(playlists);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching playlists", error: err.message });
//   }
// };

export const getPlaylistsPlacementSubject = async (req, res) => {
  try {
    const { subject } = req.params;
    if (!subject) {
      return res.status(400).json({ message: "subject are required" });
    }
    const playlists = await Playlist.find({ subject, category: "Placement Prep" });
    res.status(200).json(playlists);
  } catch (err) {
    res.status(500).json({ message: "Error fetching playlists", error: err.message });
  }
};

export const getPlaylistsSkillSubject = async (req, res) => {
  try {
    const { subject } = req.params;
    console.log(subject);
    if (!subject) {
      return res.status(400).json({ message: "subject are required" });
    }
    const playlists = await Playlist.find({ subject, category: "Skill Tracks" });
    res.status(200).json(playlists);
  } catch (err) {
    res.status(500).json({ message: "Error fetching playlists", error: err.message });
  }
};

// Get a Single Playlist by ID
// GET /api/playlists/:id
export const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }
    res.status(200).json(playlist);
  } catch (err) {
    res.status(500).json({ message: "Error fetching playlist", error: err.message });
  }
};