import express from "express";

import EventMaterial from "../models/EventMaterial.js";
import { uploadEventMaterial } from "../controllers/eventUpload.js";


const router = express.Router();

// POST: Upload Event Material (multer handled in controller)
router.post("/upload", uploadEventMaterial);

// GET: Fetch Photos for a Specific Event
router.get("/photos/:eventName", async (req, res) => {
  try {
    const eventName = decodeURIComponent(req.params.eventName);
    if (!eventName) {
      return res.status(400).json({ message: "Event name is required" });
    }

    const photos = await EventMaterial.find({ eventName }).sort({ createdAt: -1 });
    const urls = photos.map(photo => photo.fileUrl);

    res.status(200).json({
      eventName,
      count: urls.length,
      photos: urls,
    });
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ message: "Failed to fetch event photos" });
  }
});

export default router;
