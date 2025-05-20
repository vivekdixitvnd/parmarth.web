// ✅ FILE: routes/StudyMaterial.routes.js

import express from 'express';
import upload from '../config/cloudinary.js';
import { uploadMaterial, getAllMaterials } from '../controllers/StudyMaterial.js';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadMaterial);
router.get('/all', getAllMaterials);

export default router;
