import express from "express";
import {
  getAllMedics,
  getMedic,
  getMedicsBySpeciality,
  postMedic,
  putMedic,
} from "../controllers";

const router = express.Router();

router.get("/", getAllMedics);
router.get("/:id", getMedic);
router.put("/:id", putMedic);

router.post("/:speciality", postMedic);

router.get("/speciality/:idEsp", getMedicsBySpeciality);

export default router;
