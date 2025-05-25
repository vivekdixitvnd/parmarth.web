import LiveUpdate from '../models/LiveUpdate.js';

// Get all updates
export const getUpdates = async (req, res) => {
  try {
    const updates = await LiveUpdate.find().sort({ createdAt: -1 });
    res.json({ updates });
  } catch (error) {
    console.error('Error fetching updates:', error);
    res.status(500).json({ error: 'Failed to fetch updates' });
  }
};

// Add new update
export const addUpdate = async (req, res) => {
  try {
    const { update } = req.body;
    if (!update) {
      return res.status(400).json({ error: 'Update text is required' });
    }
    const newUpdate = new LiveUpdate({ text: update });
    await newUpdate.save();
    res.status(201).json({ message: 'Update added successfully', update: newUpdate });
  } catch (error) {
    console.error('Error adding update:', error);
    res.status(500).json({ error: 'Failed to add update' });
  }
};

// Delete update
export const deleteUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    await LiveUpdate.findByIdAndDelete(id);
    res.json({ message: 'Update deleted successfully' });
  } catch (error) {
    console.error('Error deleting update:', error);
    res.status(500).json({ error: 'Failed to delete update' });
  }
}; 