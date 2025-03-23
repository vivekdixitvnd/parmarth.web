import upload from "../middleware/multer.js";
import { Router } from "express";
const router = Router();
import { getEventVolunteersData, addEventVolunteerDataViaExcel } from "../controllers/eventVolunteers.js";
import isAuth from "../middleware/is-auth.js";



router.get(
  "/api/getEventVolunteersData",
  isAuth,
  getEventVolunteersData,
);

router.post(
  "/api/addEventVolunteerDataViaExcel",
  isAuth,
  upload,
  addEventVolunteerDataViaExcel,
);

export default router;
