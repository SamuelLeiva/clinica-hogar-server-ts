import express from "express";
import { sample } from "../controllers/sampleController";

const router = express.Router();

router.get("/sample1", sample);

export default router;
