import express from "express";
import {
  getAllAppointments,
  getAppointment,
  postAppointment,
  getAppointmentsByPatient,
} from "../controllers";

import { verifyJWT } from "../middlewares/verifyJWT.middleware";

const router = express.Router();

router.get("/", getAllAppointments);
router.get("/:id", getAppointment);
router.post("/patient/:idPatient/medic/:idMedic", postAppointment);

router.get("/patient/:idPatient", verifyJWT, getAppointmentsByPatient);

export default router;
