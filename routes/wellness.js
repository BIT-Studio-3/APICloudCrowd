// routes/wellness.js
const express = require('express');
const router = express.Router();
const { createWellness, getAllWellness } = require('../controllers/wellnessController');

// POST /api/wellness - Create new wellness entry
router.post('/', createWellness);

// GET /api/wellness - Get all wellness entries (optional)
router.get('/', getAllWellness);

module.exports = router;