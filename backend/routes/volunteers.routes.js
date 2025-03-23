import upload from "../middleware/multer.js";
import { Router } from "express";
const router = Router();
import isAuth from "../middleware/is-auth.js";
import { getVolunteersData, addVolunteerData, addVolunteerDataViaExcel } from "../controllers/volunteers.js";

router.get(
  "/api/getVolunteersData",
  isAuth,
  getVolunteersData,
);

router.post(
  "/api/addVolunteerData",
  isAuth,
  addVolunteerData,
);
router.post(
  "/api/addVolunteerDataViaExcel",
  isAuth,
  upload,
  addVolunteerDataViaExcel,
);

export default router
