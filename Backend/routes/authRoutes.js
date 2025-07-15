// const express = require('express');
// const router = express.Router();
// const { registerUser, loginUser } = require('../controllers/authController');

// router.post('/register', registerUser);
// router.post('/login', loginUser);

// export default router;


import express from 'express';
import { registerUser, loginUser, loggedUser } from '../controllers/authController.js';
import protect from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', protect, loggedUser);

// router.get('/profile', protect, (req, res) => {
//   res.json({
//     message: "You accessed a protected route!",
//     user: req.user,
//   });
// });

// router.route("/user").get(authController.user);

export default router;
