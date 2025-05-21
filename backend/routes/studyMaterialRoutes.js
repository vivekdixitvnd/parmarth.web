import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { uploadStudyMaterial } from "../controllers/studyMaterialController.js";

// For __dirname support in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Multer setup (disk storage with unique filename)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/")); // Upload path adjusted
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const router = express.Router();

// Route to upload a single study material file
router.post("/upload", upload.single("file"), uploadStudyMaterial);

export default router;
