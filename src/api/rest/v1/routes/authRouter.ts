import express from "express";
import {
  login,
  logout,
  logoutAll,
  refresh,
  register,
} from "../controllers/authController";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.get("/refresh", refresh);

router.get("/logout", logout);
router.post("/logout-all", logoutAll);

export default router;
