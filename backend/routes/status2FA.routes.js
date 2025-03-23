import { Router } from "express";
const router = Router();
import status2FA from "../controllers/status2FA.js";
import isAuth from "../middleware/is-auth.js";

router.patch("/api/status2FA", isAuth, status2FA);

export default router;

