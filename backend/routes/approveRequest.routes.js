import { Router } from "express";
const router = Router();
import { approveRequest } from "../controllers/approveRequest.js";
import isAuth from "../middleware/is-auth.js";

router.post("/api/approveRequest/:id", isAuth, approveRequest);

export default router;
