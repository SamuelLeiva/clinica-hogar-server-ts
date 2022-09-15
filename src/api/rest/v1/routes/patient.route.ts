import express from "express";
import { addPatient, getPatientsByUser, postPatient } from "../controllers";
import { checkJWT } from "../middlewares";
import { validateCreatePatient } from "../validations";

const router = express.Router();

router.get("/myPatients", checkJWT, getPatientsByUser);
router.post("/addPatient", checkJWT, addPatient);

router.post("/", checkJWT, validateCreatePatient, postPatient);

export default router;
