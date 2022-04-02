import express from "express";
import {
  getAllSpecialities,
  getSpeciality,
  postSpeciality,
} from "../controllers";

const router = express.Router();

router.get("/", getAllSpecialities);
router.get("/:id", getSpeciality);
router.post("/", postSpeciality);

export default router;
