import express from "express";
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
} from "../controllers";
import { checkJWT } from "../middlewares/session";
import { validateLogin, validateRegister } from "../validations";

const router = express.Router();

router.post("/login", validateLogin, loginController);
router.post("/register", validateRegister, registerController);
router.post("/logout", checkJWT, logoutController);

router.get("/refresh", checkJWT, refreshController);

export default router;
