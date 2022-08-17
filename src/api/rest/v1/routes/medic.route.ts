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
router.post("/", postMedic);
router.get("/:id", getMedic);
router.put("/:id", putMedic);

router.get("/speciality/:idSpe", getMedicsBySpeciality);

export default router;
