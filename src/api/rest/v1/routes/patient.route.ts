import express from "express";
import { addPatient, getPatientsByUser, postPatient } from "../controllers";
import { verifyJWT } from "../middlewares/verifyJWT.middleware";
import { validateCreatePatient } from "../validations";

const router = express.Router();

router.post("/", validateCreatePatient, postPatient);

router.get("/myPatients", verifyJWT, getPatientsByUser);
router.post("/addPatient", verifyJWT, addPatient);

export default router;
