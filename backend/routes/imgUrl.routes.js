import { Router } from "express";
const router = Router();
import isAuth from "../middleware/is-auth.js";
import { getImgUrl } from "../controllers/imgUrl.js";

router.post("/api/getImgUrl", isAuth, getImgUrl);

export default router;
