import express from "express";
import {
  updateUser,
  getSingleUser,
  getAllUser,
  deleteUser,
  getUserProfile,
  getMyAppointments,
} from "../controllers/user-controller.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.get("/:id", authenticate, restrict(["patient"]), getSingleUser);
router.get("/", restrict(["admin"]), getAllUser);
router.put("/:id", restrict(["patient"]), updateUser);
router.delete("/:id", restrict(["patient"]), deleteUser);
router.get("/profile/me", restrict(["patient"]), getUserProfile);
router.get(
  "appointments/my-appointments",
  restrict(["patient"]),
  getMyAppointments
);

export default router;
