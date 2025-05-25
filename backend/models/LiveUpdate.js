import mongoose from 'mongoose';

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

export default LiveUpdate; 