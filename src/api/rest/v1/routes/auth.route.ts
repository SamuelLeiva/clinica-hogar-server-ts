import express from "express";
import { login, logout, logoutAll, refresh, register } from "../controllers";
import { validateLogin, validateRegister } from "../validations";

const router = express.Router();

router.post("/login", validateLogin, login);
router.post("/register", validateRegister, register);

router.get("/refresh", refresh);

router.get("/logout", logout);
router.post("/logout-all", logoutAll);

export default router;
