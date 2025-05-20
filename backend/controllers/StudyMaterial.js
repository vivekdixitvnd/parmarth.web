import StudyMaterial from '../models/StudyMaterial.js';

export const uploadMaterial = async (req, res) => {
  console.log('🔔 UploadMaterial controller triggered');
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
    console.error('❌ Upload Error:', err.message);
    res.status(500).json({ message: 'Server error while uploading material' });
  }
};
