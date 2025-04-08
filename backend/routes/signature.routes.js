import { Router } from "express";
import upload from "../middleware/signatureMulter.js";
import isAuth from "../middleware/is-auth.js";
import fs from "fs";
import path from "path";
import Signature from "../models/signature.js";

const router = Router();


router.get("/api/checkSignatures", isAuth, async (req, res) => {
  try {
    const faculty1 = await Signature.findOne({ uploadedBy: "faculty1" });
    const faculty2 = await Signature.findOne({ uploadedBy: "faculty2" });

    res.status(200).json({
      faculty1: !!faculty1, // true if exists
      faculty2: !!faculty2,
    });
  } catch (err) {
    console.error("Error checking signatures:", err);
    res.status(500).json({ message: "Server error while checking signatures." });
  }
});

router.post("/api/upload-signature", isAuth, upload.single("signature"), async (req, res) => {
  try {
    const { uploadedBy } = req.body;
    const filePath = req.file?.path;

    if (!uploadedBy || !filePath) {
      return res.status(400).json({ message: "Missing uploadedBy or signature file" });
    }

    const existing = await Signature.findOne({ uploadedBy });

    if (existing) {
      existing.signatureUrl = filePath;
      await existing.save();
    } else {
      const newSignature = new Signature({
        uploadedBy,
        signatureUrl: filePath,
      });
      await newSignature.save();
    }

    res.status(200).json({ message: "Signature uploaded successfully" });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ message: "Upload failed" });
  }
});


export default router;
