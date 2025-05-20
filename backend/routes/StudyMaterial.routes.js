// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import {
//   uploadMaterial,
//   getAllMaterials,
// } from '../controllers/StudyMaterial.js';

// const router = express.Router();

// // Handle __dirname in ESM
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // File storage setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads')); // Make sure this folder exists
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, file.fieldname + '-' + uniqueSuffix + ext);
//   }
// });

// const upload = multer({ storage });

// // ✅ POST - Upload Material
// router.post('/upload', upload.single('file'), uploadMaterial);

// // ✅ GET - All Materials
// router.get('/all', getAllMaterials);

// // ✅ NEW: GET - Class-wise Materials
// router.get('/by-class/:className', async (req, res) => {
//   try {
//     const className = decodeURIComponent(req.params.className);
//     const StudyMaterial = (await import('../models/StudyMaterial.js')).default;

//     const materials = await StudyMaterial.find({ className });
//     res.status(200).json(materials);
//   } catch (err) {
//     console.error('Error fetching class-wise material:', err);
//     res.status(500).json({ message: 'Error fetching class materials' });
//   }
// });

// export default router;

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  uploadMaterial,
  getAllMaterials,
} from '../controllers/StudyMaterial.js';
import upload from '../config/cloudinary.js';

const router = express.Router();

// ✅ POST - Upload Material
router.post('/upload', upload.single('file'), uploadMaterial);

// ✅ GET - All Materials
router.get('/all', getAllMaterials);

// ✅ NEW: GET - Class-wise Materials
router.get('/by-class/:className', async (req, res) => {
  try {
    const className = decodeURIComponent(req.params.className);
    const StudyMaterial = (await import('../models/StudyMaterial.js')).default;

    const materials = await StudyMaterial.find({ className });
    res.status(200).json(materials);
  } catch (err) {
    console.error('Error fetching class-wise material:', err);
    res.status(500).json({ message: 'Error fetching class materials' });
  }
});

export default router;

