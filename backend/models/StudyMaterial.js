const mongoose = require('mongoose');

const studyMaterialSchema = new mongoose.Schema({
  className: { type: String, required: true },
  subject: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['pdf', 'video', 'note'], required: true },
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StudyMaterial', studyMaterialSchema);
