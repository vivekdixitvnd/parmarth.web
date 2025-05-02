import { Router } from "express";
import isAuth from "../middleware/is-auth.js";
import { login, createUser, getUsers, getUserType, deleteUser, verifyOtpAndChangePassword, requestChangePasswordOtp } from "../controllers/auth.js";
const router = Router();

router.post("/api/login", login);
router.post("/api/createUser", isAuth, createUser);
router.get("/api/getUsers", isAuth, getUsers);
router.get("/api/getUserType/:id", getUserType);
router.delete(
  "/api/deleteUser/:masterId/:id",
  isAuth,
  deleteUser,
);
router.post("/api/change-password", isAuth, requestChangePasswordOtp);
router.post("/api/verify-otp-and-change-password", isAuth, verifyOtpAndChangePassword);

export default router;
