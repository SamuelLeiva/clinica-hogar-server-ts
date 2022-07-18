import express from "express";
import {
  getAllMedics,
  getMedic,
  getMedicsBySpeciality,
  postMedic,
  putMedic,
} from "../controllers";
import { showErrors } from "../helpers";
import {
  postMedicValidations,
  putMedicValidations,
} from "../validators/medicValidations";

const router = express.Router();

router.get("/", getAllMedics);
router.get("/:id", getMedic);
router.put("/:id", ...putMedicValidations, showErrors, putMedic);

router.post("/:speciality", ...postMedicValidations, showErrors, postMedic);

router.get("/speciality/:idEsp", getMedicsBySpeciality);

export default router;
