import express from "express";
import multer from "multer";
import path from "path";
import { uploadEventMaterial } from "../controllers/eventUpload";
import EventMaterial from "../models/EventMaterial";

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

// POST route for event photo upload, matches frontend route file key 'file'
router.post("/upload", upload.single("file"), uploadEventMaterial);

// Get photos by event name (optional, if you want to fetch photos per event)
router.get("/by-event/:eventName", async (req, res) => {
  try {
    const eventName = decodeURIComponent(req.params.eventName);
    // Your EventPhoto model should be imported here (create if not exist)
    const photos = await EventMaterial.find({ eventName });
    res.status(200).json(photos);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
