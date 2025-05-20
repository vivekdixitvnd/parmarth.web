// routes/upload.js
import express from 'express';
import upload from '../config/cloudinary.js';

const router = express.Router();

router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'File not uploaded' });

  res.json({
    url: req.file.path,
    filename: req.file.filename,
  });
});

export default router;
