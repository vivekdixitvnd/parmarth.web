import express from 'express';
import { getUpdates, addUpdate, deleteUpdate } from '../controllers/liveUpdateController.js';

const router = express.Router();

// GET /api/live-updates
router.get('/', getUpdates);

// POST /api/live-updates
router.post('/', addUpdate);

// DELETE /api/live-updates/:id
router.delete('/:id', deleteUpdate);

export default router; 