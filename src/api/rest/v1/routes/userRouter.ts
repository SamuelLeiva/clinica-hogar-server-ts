import express from "express";
import { getMyUser } from "../controllers";
import { verifyJWT } from "../middlewares/verifyJWT";

const router = express.Router();

router.get("/me", verifyJWT, getMyUser);

export default router;
