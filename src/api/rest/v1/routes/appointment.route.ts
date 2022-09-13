import express from "express";
import {
  getAllAppointments,
  getAppointment,
  postAppointment,
  getAppointmentsByPatient,
} from "../controllers";
import { checkJWT } from "../middlewares/session";

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
router.get("/", checkJWT, getAllAppointments);
router.get("/:id", checkJWT, getAppointment);

router.post(
  "/patient/:idPatient/medic/:idMedic",
  checkJWT,
  validateCreateAppointment,
  postAppointment
);

router.get("/patient/:idPatient", checkJWT, getAppointmentsByPatient);

export default router;
