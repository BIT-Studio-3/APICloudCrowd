import express from 'express';
import { createWellness, getWellnessDataByUserId } from '../controllers/wellness.js';

const router = express.Router();

// POST /api/wellness - Create new wellness entry
router.post('/', createWellness);

// *** THE ROUTE FOR RETRIEVING DATA TO THE GRAPH ***
// GET: http://localhost:3000/api/wellness/your_user_id
router.get("/:userId", getWellnessDataByUserId);

export default router;