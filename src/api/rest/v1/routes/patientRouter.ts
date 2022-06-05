import express from "express";
import { getPatientsByUser } from "../controllers";
import { verifyJWT } from "../middlewares/verifyJWT";

const router = express.Router();

router.get("/myPatients", verifyJWT, getPatientsByUser);

export default router;
