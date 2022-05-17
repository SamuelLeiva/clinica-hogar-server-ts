import express from "express";
import {
  getAllAppointments,
  getAppointment,
  getAppointmentsByUser,
  postAppointment,
} from "../controllers/appointmentController";
import { verifyJWT } from "../middlewares/verifyJWT";

const router = express.Router();

router.get("/", getAllAppointments);
router.get("/myAppointments", verifyJWT, getAppointmentsByUser);

router.get("/:id", getAppointment);

router.post("/patient/:idPatient/medic/:idMedic", postAppointment);

//router.get("/:patient", getAppointmentsByUser);


export default router;
