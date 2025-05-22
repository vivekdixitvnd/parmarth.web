import express from "express";
import uploadEventMaterial from "../controllers/eventController.js";
import EventMaterial from "../models/EventMaterial.js";

const router = express.Router();

// Upload endpoint (handled internally in controller with multer)
router.post("/upload", uploadEventMaterial);

// Fetch photos for a specific event
router.get("/photos/:eventName", async (req, res) => {
  try {
    const eventName = decodeURIComponent(req.params.eventName);
    if (!eventName) {
      return res.status(400).json({ message: "Event name is required" });
    }

    const photos = await EventMaterial.find({ eventName });

    const urls = photos.map((photo) => photo.fileUrl);

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
