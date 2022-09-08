import express from "express";
import {
  getAllSpecialities,
  getSpeciality,
  postSpeciality,
} from "../controllers";
import { checkJWT } from "../middlewares/session";
import { validateCreateSpeciality } from "../validations";

const router = express.Router();

router.get("/", checkJWT, getAllSpecialities);
router.get("/:id", checkJWT, getSpeciality);
router.post("/", checkJWT, validateCreateSpeciality, postSpeciality);

export default router;
