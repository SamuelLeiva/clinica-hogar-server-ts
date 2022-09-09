import express from "express";
import {
  getAllAppointments,
  getAppointment,
  postAppointment,
  getAppointmentsByPatient,
} from "../controllers";

import { verifyJWT } from "../middlewares/verifyJWT.middleware";
import { validateCreateAppointment } from "../validations";

const router = express.Router();
/**
 * Get All appointments
 * @openapi
 * /api/v1/appointment:
 *    get:
 *      tags:
 *        - appointment
 *      summary: "List all appointments"
 *      description: This endpoint lists all appointments
 *      responses:
 *        '200':
 *          description: Return all appointments, even if there aren't appointments
 *        '500':
 *          description: Server error
 */
router.get("/", getAllAppointments);
router.get("/:id", getAppointment);

router.post(
  "/patient/:idPatient/medic/:idMedic",
  validateCreateAppointment,
  postAppointment
);

router.get("/patient/:idPatient", getAppointmentsByPatient);

export default router;
