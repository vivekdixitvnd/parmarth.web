import express from "express";
import multer from "multer";
import path from "path";
import { uploadStudyMaterial } from "../controllers/studyMaterialController.js";

// Multer setup
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
router.post("/upload", upload.single("file"), uploadStudyMaterial);

export default router;
