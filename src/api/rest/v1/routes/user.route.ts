import express from "express";
import { getMyUser } from "../controllers";
import { checkJWT } from "../middlewares/session";

const router = express.Router();

router.get("/me", checkJWT, getMyUser);

export default router;
