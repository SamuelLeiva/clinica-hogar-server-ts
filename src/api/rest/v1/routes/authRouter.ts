import express from "express";
import {
  login,
  logout,
  logoutAll,
  register,
} from "../controllers/authController";
import { authToken } from "../middlewares/authToken";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.post("/logout", authToken, logout);
router.post("/logout-all", logoutAll);

export default router;
