import { Router } from "express";
import isAuth from "../middleware/is-auth.js";
import { getOrganizationData, updateOrganizationData } from "../controllers/organization.js";
import { uploadOrganizationImage, uploadMiddleware } from "../controllers/organizationUpload.js";

const router = Router();

router.get("/api/organization", getOrganizationData);
router.put("/api/organization", isAuth, updateOrganizationData);
router.post("/api/organization/upload-image", isAuth, (req, res, next) => {
  uploadMiddleware(req, res, (err) => {
    if (err) return res.status(400).json({ error: err.message });
    next();
  });
}, uploadOrganizationImage);

export default router;
