import express from 'express';
import { createWellness, getAllWellness } from '../controllers/wellness.js';

const router = express.Router();

// POST /api/wellness - Create new wellness entry
router.post('/', createWellness);

// GET /api/wellness - Get all wellness entries (optional)
router.get('/', getAllWellness);

export default router;