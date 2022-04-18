import express from "express";
import { login, signUp } from "../controllers/authController";

const router = express.Router();

router.post("/login", login);
router.post("/sign-up", signUp);

export default router;
