import express from "express";
import { getMyUser } from "../controllers";
import { authToken } from "../middlewares/authToken";

const router = express.Router();

router.get("/me", authToken, getMyUser);

export default router;
