import express from "express";
import {
  updateDoctor,
  getAllDoctor,
  deleteDoctor,
  getSingleDoctor,
} from "../controllers/doctor-controller.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from "./review.js";

const router = express.Router();

//nested route
router.use("/:doctorId/reviews", reviewRouter);


router.get("/", getAllDoctor);
router.get("/:id",  getSingleDoctor);
router.put("/:id", restrict(["doctor"]), updateDoctor);
router.delete("/:id", restrict(["doctor"]), deleteDoctor);

export default router;
