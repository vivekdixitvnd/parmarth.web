import { Router } from "express";
const router = Router();
import isAuth from "../middleware/is-auth.js";
import {
  getRequestData,
  addRequestData,
  deleteRequestData,
} from "../controllers/requestData.js";

router.post("/api/getRequestData", isAuth, getRequestData);
router.post("/api/addRequestData", addRequestData);
router.delete("/api/deleteRequestData/:id", isAuth, deleteRequestData);

export default router;
