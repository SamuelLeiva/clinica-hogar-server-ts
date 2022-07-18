import express from "express";
import { addPatient, getPatientsByUser, postPatient } from "../controllers";
import { showErrors } from "../helpers";
import { verifyJWT } from "../middlewares/verifyJWT";
import { patientValidations } from "../validators/patientValidations";

const router = express.Router();

router.post("/", postPatient);

router.get("/myPatients", verifyJWT, getPatientsByUser);
router.post(
  "/addPatient",
  verifyJWT,
  ...patientValidations,
  showErrors,
  addPatient
);

export default router;
