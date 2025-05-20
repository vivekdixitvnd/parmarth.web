import StudyMaterial from '../models/StudyMaterial.js';

export const uploadMaterial = async (req, res) => {
  try {
    const { className, subject, title, type } = req.body;
    const file = req.file;

    if (!className || !subject || !title || !type || !file) {
      return res.status(400).json({ message: 'All fields including a file are required.' });
    }

    const newMaterial = new StudyMaterial({
      className,
      subject,
      title,
      type,
      fileUrl: file.path, // Cloudinary URL
    });

    await newMaterial.save();
    return res.status(201).json({
      message: 'Study material uploaded successfully',
      material: newMaterial,
    });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ message: 'Server error while uploading material' });
  }
};

