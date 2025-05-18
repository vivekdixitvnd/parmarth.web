import express from "express";
import {
  sendLoginOtp,
  verifyLoginOtp,
} from "../controllers/otpLogin.js";

const router = express.Router();

router.post("/api/login/send-otp", sendLoginOtp);
router.post("/api/login/verify-otp", verifyLoginOtp);

export default router;