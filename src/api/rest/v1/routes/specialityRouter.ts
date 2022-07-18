import express from "express";
import {
  getAllSpecialities,
  getSpeciality,
  postSpeciality,
} from "../controllers";
import { showErrors } from "../helpers";
import { specialityValidations } from "../validators/specialityValidations";

const router = express.Router();

router.get("/", getAllSpecialities);
router.get("/:id", getSpeciality);
router.post("/", ...specialityValidations, showErrors, postSpeciality);

export default router;
