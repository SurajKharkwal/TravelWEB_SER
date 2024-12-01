const express = require('express');
const { signUp, login, logout } = require('../auth/authController');
const router = express.Router();

// Sign Up route
router.post('/sign-up', signUp);

// Login route
router.post('/login', login);

// Logout route
router.post('/logout', logout);

module.exports = router;
