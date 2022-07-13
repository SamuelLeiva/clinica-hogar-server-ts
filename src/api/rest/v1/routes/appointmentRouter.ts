import express from "express";
import {
  getAllAppointments,
  getAppointment,
  getAppointmentsByPatient,
  postAppointment,
} from "../controllers/appointmentController";
import { verifyJWT } from "../middlewares/verifyJWT";

const router = express.Router();

router.get("/", getAllAppointments);
router.get("/:id", getAppointment);
router.post("/patient/:idPatient/medic/:idMedic", verifyJWT, postAppointment);

router.get("/patient/:idPatient", verifyJWT, getAppointmentsByPatient);

export default router;
