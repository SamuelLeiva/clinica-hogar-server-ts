import express from "express";
import {
  getAllMedics,
  getMedic,
  getMedicsBySpeciality,
  postMedic,
  putMedic,
} from "../controllers";
import { validateCreateMedic, validateUpdateMedic } from "../validations";

const router = express.Router();

router.get("/", getAllMedics);
router.post("/", validateCreateMedic, postMedic);
router.get("/:id", getMedic);
router.put("/:id", validateUpdateMedic, putMedic);

router.get("/speciality/:idSpe", getMedicsBySpeciality);

export default router;
