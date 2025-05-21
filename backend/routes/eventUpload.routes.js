import express from "express";
import { uploadEventMaterial, getEventPhotos } from "../controllers/eventUpload.js";

const router = express.Router();

router.post("/upload", uploadEventMaterial); // No middleware here
router.get("/photos/:eventName", getEventPhotos);

export default router;
