import StudyMaterial from '../models/StudyMaterial.js';
import { v2 as cloudinary } from 'cloudinary';

export const uploadMaterial = async (req, res) => {
  try {
    const { className, subject, title, type } = req.body;
    const file = req.file;

    if (!className || !subject || !title || !type || !file) {
      return res.status(400).json({ message: 'All fields are required including a file.' });
    }

    const fileUrl = file.path;

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

export const uploadMaterialBase64 = async (req, res) => {
  try {
    const { className, subject, title, type, fileName, fileType, fileData } = req.body;

    if (!className || !subject || !title || !type || !fileData) {
      return res.status(400).json({ message: 'All fields and file are required.' });
    }

    const uploaded = await cloudinary.uploader.upload(`data:${fileType};base64,${fileData}`, {
      folder: 'study_materials',
      public_id: `${Date.now()}-${fileName.split('.')[0]}`,
      resource_type: 'auto',
    });

    const newMaterial = new StudyMaterial({
      className,
      subject,
      title,
      type,
      fileUrl: uploaded.secure_url,
    });

    await newMaterial.save();

    res.status(201).json({ message: 'Upload successful', material: newMaterial });
  } catch (err) {
    console.error('Upload Error:', err);
    res.status(500).json({ message: 'Failed to upload base64 file to Cloudinary.' });
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
