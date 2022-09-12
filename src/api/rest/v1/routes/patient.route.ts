import express from "express";
import { addPatient, getPatientsByUser, postPatient } from "../controllers";
import { checkJWT } from "../middlewares/session";
//import { verifyJWT } from "../middlewares/verifyJWT.middleware";
import { validateCreatePatient } from "../validations";

const router = express.Router();

router.get("/myPatients", checkJWT, getPatientsByUser);
router.post("/addPatient", checkJWT, addPatient);

router.post("/", validateCreatePatient, postPatient);

export default router;
