import express from "express";
import {
  loginController,
  logout,
  logoutAll,
  refresh,
  registerController,
} from "../controllers";
import { validateLogin, validateRegister } from "../validations";

const router = express.Router();

router.post("/login", validateLogin, loginController);
router.post("/register", validateRegister, registerController);

router.get("/refresh", refresh);

router.get("/logout", logout);
router.post("/logout-all", logoutAll);

export default router;
