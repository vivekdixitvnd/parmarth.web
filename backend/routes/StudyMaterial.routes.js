import express from 'express';
import upload from '../config/cloudinary.js';
import {
  uploadMaterial,
  uploadMaterialBase64,
  getAllMaterials
} from '../controllers/StudyMaterial.js';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadMaterial);
router.post('/uploadBase64', uploadMaterialBase64);
router.get('/all', getAllMaterials);

export default router;
