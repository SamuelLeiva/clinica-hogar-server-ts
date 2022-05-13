import express from "express";
import {
  login,
  logout,
  logoutAll,
  refresh,
  register,
} from "../controllers/authController";
//import { verifyJWT } from "../middlewares/verifyJWT";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);

router.get("/refresh", refresh);

router.post("/logout", logout);
router.post("/logout-all", logoutAll);

export default router;
