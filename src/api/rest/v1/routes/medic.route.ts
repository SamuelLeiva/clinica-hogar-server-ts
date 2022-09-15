import express from "express";
import {
  getAllMedics,
  getMedic,
  getMedicsBySpeciality,
  postMedic,
  putMedic,
} from "../controllers";
import { validateCreateMedic } from "../validations";

const router = express.Router();

router.get("/", getAllMedics);
router.get("/:id", getMedic);
router.post("/", validateCreateMedic, postMedic);
router.put("/:id", putMedic);

router.get("/speciality/:idSpe", getMedicsBySpeciality);

export default router;
