import express from "express";
import {
  getAllMedics,
  getMedic,
  getMedicsBySpeciality,
  postMedic,
} from "../controllers";

const router = express.Router();

router.get("/", getAllMedics);
router.get("/:id", getMedic);

router.post("/:speciality", postMedic);

router.get("/speciality/:idEsp", getMedicsBySpeciality);

export default router;
