import {
  getAllAppointments,
  getAppointment,
  postAppointment,
  getAppointmentsByPatient,
} from "../controllers";

import { verifyJWT } from "../middlewares/verifyJWT";
import { appointmentValidations } from "../validators";
import express from "express";
import { showErrors } from "../helpers";

const router = express.Router();

// const showErrors = (req: Request, res: Response, next: NextFunction) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };

router.get("/", getAllAppointments);
router.get("/:id", getAppointment);
router.post(
  "/patient/:idPatient/medic/:idMedic",
  verifyJWT,
  ...appointmentValidations,
  showErrors,
  postAppointment
);

router.get("/patient/:idPatient", verifyJWT, getAppointmentsByPatient);

export default router;
