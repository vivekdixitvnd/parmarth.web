import { Router } from "express";
import upload from "../middleware/signatureMulter.js";
import isAuth from "../middleware/is-auth.js";
import fs from "fs";
import path from "path";
import Signature from "../models/signature.js";
import sharp from "sharp";

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
    res
      .status(500)
      .json({ message: "Server error while checking signatures." });
  }
});

const deletePngFiles = async (dir) => {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.endsWith(".png")) {
        const filePath = path.join(dir, file);
        try {
          await new Promise((resolve) => setTimeout(resolve, 500));
          await fs.promises.unlink(filePath);
          console.log("✅ Deleted PNG:", filePath);
        } catch (unlinkErr) {
          console.warn("❌ Failed to delete PNG:", filePath, unlinkErr.message);
        }
      }
    }
  } catch (readErr) {
    console.warn("Error reading upload dir:", readErr.message);
  }
};


  router.post(
    "/api/upload-signature",
    isAuth,
    upload.single("signature"),
    async (req, res) => {
      try {
        const { uploadedBy } = req.body;
        const filePath = req.file?.path;

        if (!uploadedBy || !filePath) {
          return res.status(400).json({ message: "Missing uploadedBy or signature file" });
        }

        console.log("uploadedBy:", uploadedBy);
        console.log("Original File Path:", filePath);

        if (!fs.existsSync(filePath)) {
          console.error("Original file not found at:", filePath);
          return res.status(500).json({ message: "File not found after upload" });
        }

        const jpgFileName = uploadedBy === "faculty1" ? "sig1.jpg" : "sig2.jpg";
        const jpgPath = path.join(path.dirname(filePath), jpgFileName);

        console.log("Target JPG Path:", jpgPath);

        await sharp(path.resolve(filePath))
          .jpeg({ quality: 90 })
          .toFile(path.resolve(jpgPath));

        await deletePngFiles(path.dirname(filePath));

        const normalizedPath = path.relative(process.cwd(), jpgPath).replace(/\\/g, "/");
        console.log("Normalized JPG Path:", normalizedPath);

        const existing = await Signature.findOne({ uploadedBy });

        if (existing) {
          existing.signatureUrl = normalizedPath;
          await existing.save();
        } else {
          const newSignature = new Signature({
            uploadedBy,
            signatureUrl: normalizedPath,
          });
          await newSignature.save();
        }

        res.status(200).json({
          message: "Signature uploaded and converted to JPG successfully!",
        });
      } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Upload failed", error: error.message });
      }
    }
  );


// router.post("/api/upload-signature", isAuth, upload.single("signature"), async (req, res) => {
//   try {
//     const { uploadedBy } = req.body;
//     const filePath = req.file?.path;

//     if (!uploadedBy || !filePath) {
//       return res.status(400).json({ message: "Missing uploadedBy or signature file" });
//     }

//     // Determine the new JPG path
//     const jpgFileName = uploadedBy === "faculty1" ? "sig1.jpg" : "sig2.jpg";
//     const jpgPath = path.join(path.dirname(filePath), jpgFileName);

//     // Convert to JPG using sharp
//     await sharp(filePath)
//       .jpeg({ quality: 90 })
//       .toFile(jpgPath);

//     // Remove the original file (png etc)
//     fs.unlinkSync(filePath);

//     // Update or create signature document
//     const existing = await Signature.findOne({ uploadedBy });

//     if (existing) {
//       existing.signatureUrl = jpgPath;
//       await existing.save();
//     } else {
//       const newSignature = new Signature({
//         uploadedBy,
//         signatureUrl: jpgPath,
//       });
//       await newSignature.save();
//     }

//     res.status(200).json({ message: "Signature uploaded and converted to JPG successfully!" });
//   } catch (error) {
//     console.error("Upload Error:", error);
//     res.status(500).json({ message: "Upload failed" });
//   }
// });

// router.post("/api/upload-signature", isAuth, upload.single("signature"), async (req, res) => {
//   try {
//     const { uploadedBy } = req.body;
//     const filePath = req.file?.path;

//     if (!uploadedBy || !filePath) {
//       return res.status(400).json({ message: "Missing uploadedBy or signature file" });
//     }

//     const existing = await Signature.findOne({ uploadedBy });

//     if (existing) {
//       existing.signatureUrl = filePath;
//       await existing.save();
//     } else {
//       const newSignature = new Signature({
//         uploadedBy,
//         signatureUrl: filePath,
//       });
//       await newSignature.save();
//     }

//     res.status(200).json({ message: "Signature uploaded successfully" });
//   } catch (error) {
//     console.error("Upload Error:", error);
//     res.status(500).json({ message: "Upload failed" });
//   }
// });

export default router;
