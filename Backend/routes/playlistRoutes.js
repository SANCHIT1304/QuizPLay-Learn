import express from 'express';
import {
    createPlaylist,
    getAllPlaylists,
    getPlaylistsByYear,
    getPlaylistsByYearAndSubject,
    getSubjectsByCategory,
    getPlaylistsByCategory,
    getPlaylistsPlacementSubject,
    getPlaylistsSkillSubject,
    getPlaylistById
} from '../controllers/playlistController.js';
import protect from '../middlewares/authMiddleware.js';
import isAdmin from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Create new playlist (admin only)
router.post('/', protect, isAdmin, createPlaylist);

// Get all playlists
router.get('/', getAllPlaylists);

// get all playlist in a category
router.get('/category/:category', getPlaylistsByCategory);

// get all playlist for a year
router.get('/year/:year', getPlaylistsByYear);

//// Get playlists for a year and subject (All Subjects category)
// GET /api/playlists/year/:year/subject/:subject
router.get('/year/:year/subject/:subject', getPlaylistsByYearAndSubject);

// Get unique subjects for a category (e.g., Placement Prep, Skill Tracks)
router.get('/subjects/category/:category', getSubjectsByCategory);

// Get playlists by category and subject (Placement Prep or Skill Tracks)
router.get('/placement/subject/:subject', getPlaylistsPlacementSubject);

router.get('/skills/subject/:subject', getPlaylistsSkillSubject);

// Get a single playlist by ID
router.get('/:id', getPlaylistById);


export default router;
