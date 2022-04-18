import express from "express";
import {
  getAllAppointments,
  getAppointment,
  getAppointmentsByUser,
  postAppointment,
} from "../controllers/appointmentController";

const router = express.Router();

router.get("/", getAllAppointments);
router.get("/:id", getAppointment);
router.post("/patient/:idPatient/medic/:idMedic", postAppointment);

//router.get("/:patient", getAppointmentsByUser);

export default router;
