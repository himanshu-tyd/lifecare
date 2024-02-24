import express from "express";
import {
  updateDoctor,
  getAllDoctor,
  deleteDoctor,
  getSingleDoctor,
  getDoctorProfile,
} from "../controllers/doctor-controller.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from "./review.js";


const router = express.Router();

//nested route
router.use("/:doctorId/reviews", reviewRouter);

router.get("/", getAllDoctor);
router.get("/:id", getSingleDoctor);
router.put("/:id", authenticate, restrict(["doctor"]), updateDoctor);
router.delete("/:id", authenticate, restrict(["doctor"]), deleteDoctor);

router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);

export default router;
