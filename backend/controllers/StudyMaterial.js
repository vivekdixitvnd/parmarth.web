import StudyMaterial from '../models/StudyMaterial.js';
import path from 'path';

export const uploadMaterial = async (req, res) => {
  try {
    console.log('➡️ Request Body:', req.body);
    console.log('📎 Uploaded File:', req.file);
    const { className, subject, title, type } = req.body;
    const file = req.file;

    if (!className || !subject || !title || !type || !file) {
      console.warn('⚠️ Missing required fields:', { className, subject, title, type, file });
      return res.status(400).json({ message: 'All fields are required including a file.' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;

    console.log('✅ File URL:', fileUrl);
    const newMaterial = new StudyMaterial({
      className,
      subject,
      title,
      type,
      fileUrl,
    });

    await newMaterial.save();
    console.log('✅ Material saved to DB:', newMaterial);
    return res.status(201).json({
      message: 'Study material uploaded successfully',
      material: newMaterial,
    });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ message: 'Server error while uploading material' });
  }
};

export const getAllMaterials = async (req, res) => {
  try {
    const materials = await StudyMaterial.find().sort({ uploadedAt: -1 });
    res.status(200).json(materials);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching materials' });
  }
};
