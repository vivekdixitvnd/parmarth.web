import { Router } from "express";
const router = Router();
import isAuth from "../middleware/is-auth.js";
import {
  getRteData,
  getRteDataByAcademicYear,
  addRteData,
  addRteDataViaExcel,
} from "../controllers/rteData.js";
import upload from "../middleware/multer.js";



router.get("/api/getRteData", getRteData);
router.get("/api/getRteData/:academicYear", getRteDataByAcademicYear);
router.post("/api/addRteData", isAuth, addRteData);
router.post("/api/addRteDataViaExcel", isAuth, upload, addRteDataViaExcel);

export default router;
