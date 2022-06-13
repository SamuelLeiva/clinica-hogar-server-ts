import express from "express";
import { addPatient, getPatientsByUser } from "../controllers";
import { verifyJWT } from "../middlewares/verifyJWT";

const router = express.Router();

router.get("/myPatients", verifyJWT, getPatientsByUser);
router.post("/addPatient", verifyJWT, addPatient);

export default router;
