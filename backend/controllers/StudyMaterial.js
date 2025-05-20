// ✅ FILE: controllers/StudyMaterial.js

import StudyMaterial from '../models/StudyMaterial.js';

export const uploadMaterial = async (req, res) => {
  try {
    console.log("Received form data:", req.body);
    console.log("Received file:", req.file);

    const { className, subject, title, type } = req.body;
    const file = req.file;

    if (!className || !subject || !title || !type || !file) {
      return res.status(400).json({ message: 'All fields are required including a file.' });
    }

    const fileUrl = file.path; // Cloudinary provides full URL here

    const newMaterial = new StudyMaterial({
      className,
      subject,
      title,
      type,
      fileUrl,
    });

    await newMaterial.save();
    return res.status(201).json({ message: 'Study material uploaded successfully', material: newMaterial });
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
