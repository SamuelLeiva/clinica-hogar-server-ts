import express from "express";
import { login, logout, logoutAll, refresh, register } from "../controllers";
import { showErrors } from "../helpers";
import {
  loginValidations,
  registerValidations,
} from "../validators/authValidations";

const router = express.Router();

router.post("/login", ...loginValidations, showErrors, login);
router.post("/register", ...registerValidations, showErrors, register);

router.get("/refresh", refresh);

router.get("/logout", logout);
router.post("/logout-all", logoutAll);

export default router;
