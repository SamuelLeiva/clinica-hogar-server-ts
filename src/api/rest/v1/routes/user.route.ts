import express from "express";
import { getMyUser } from "../controllers";
import { checkJWT } from "../middlewares/session";
//import { verifyJWT } from "../middlewares/verifyJWT.middleware";

const router = express.Router();

router.get("/me", checkJWT, getMyUser);

export default router;
