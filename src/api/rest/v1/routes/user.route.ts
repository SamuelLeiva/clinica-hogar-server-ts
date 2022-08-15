import express from "express";
import { getMyUser } from "../controllers";
import { verifyJWT } from "../middlewares/verifyJWT.middleware";

const router = express.Router();

router.get("/me", verifyJWT, getMyUser);

export default router;
