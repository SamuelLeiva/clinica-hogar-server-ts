import express from "express";
import { addPatient, getPatientsByUser, postPatient } from "../controllers";
import { verifyJWT } from "../middlewares/verifyJWT";

const router = express.Router();

router.post("/", postPatient);

router.get("/myPatients", verifyJWT, getPatientsByUser);
router.post("/addPatient", verifyJWT, addPatient);

export default router;
