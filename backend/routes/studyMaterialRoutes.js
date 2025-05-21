// routes/study.js
import express from "express";
import multer from "multer";
import path from "path";
import { uploadStudyMaterial } from "../controllers/studyMaterialController.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

const router = express.Router();

// Must match frontend route
router.post("/upload", upload.single("file"), uploadStudyMaterial);

router.get('/by-class/:className', async (req, res) => {
  try {
    const className = decodeURIComponent(req.params.className);
    const materials = await StudyMaterial.find({ classOrExam: className });
    res.status(200).json(materials);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
