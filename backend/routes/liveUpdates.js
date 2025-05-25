import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

// Define LiveUpdate Schema
const liveUpdateSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const LiveUpdate = mongoose.model('LiveUpdate', liveUpdateSchema);

// GET all live updates
router.get('/', async (req, res) => {
  try {
    const updates = await LiveUpdate.find().sort({ createdAt: -1 });
    res.json({ updates });
  } catch (error) {
    console.error('Error fetching live updates:', error);
    res.status(500).json({ error: 'Failed to fetch live updates' });
  }
});

// POST new live update
router.post('/', async (req, res) => {
  try {
    const { update } = req.body;
    if (!update) {
      return res.status(400).json({ error: 'Update text is required' });
    }

    const newUpdate = new LiveUpdate({ text: update });
    await newUpdate.save();
    res.status(201).json({ message: 'Update added successfully', update: newUpdate });
  } catch (error) {
    console.error('Error adding live update:', error);
    res.status(500).json({ error: 'Failed to add live update' });
  }
});

// DELETE live update
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUpdate = await LiveUpdate.findByIdAndDelete(id);
    
    if (!deletedUpdate) {
      return res.status(404).json({ error: 'Update not found' });
    }
    
    res.json({ message: 'Update deleted successfully' });
  } catch (error) {
    console.error('Error deleting live update:', error);
    res.status(500).json({ error: 'Failed to delete live update' });
  }
});

export default router; 