import express from "express";
import { getMyUser } from "../controllers";
import { checkJWT } from "../middlewares";

const router = express.Router();

router.get("/me", checkJWT, getMyUser);

export default router;
