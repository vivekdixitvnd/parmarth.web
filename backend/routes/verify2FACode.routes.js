import { Router } from "express";
const router = Router();
import { verify2FACode } from "../controllers/verify2FACode.js";

router.post("/api/verify2FACode", verify2FACode);

export default router;
