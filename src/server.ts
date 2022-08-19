import http from "http";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import logging from "./config/logging";
import config from "./config/config";
import {
  appointmentRoutes,
  authRoutes,
  medicRoutes,
  patientRoutes,
  specialityRoutes,
  userRoutes,
} from "./api/rest/v1/routes";
import { startConnection } from "./config/database";

import { corsOptions } from "./config/cors";
import { allowedOrigins } from "./config/constants/allowedOrigins";

const NAMESPACE = "Server";
const router = express();

//initializing the db
startConnection();

/** Logger */
router.use((req, res, next) => {
  /** Log the req */
  logging.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    /** Log the res */
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

//use credentials
router.use((req, res, next) => {
  const origin = req.headers.origin!;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Credentials", "true");
  }
  next();
});

//cors
router.use(cors(corsOptions));

/** Parse the body of the request */
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

/** Cookies Middleware */
router.use(cookieParser());

/** Routes */
router.use("/api/v1/auth", authRoutes);

router.use("/api/v1/user", userRoutes);
router.use("/api/v1/medic", medicRoutes);
router.use("/api/v1/patient", patientRoutes);
router.use("/api/v1/speciality", specialityRoutes);
router.use("/api/v1/appointment", appointmentRoutes);

/** Error handling */
router.use((req, res, next) => {
  const error = new Error("Not found");

  res.status(404).json({
    message: error.message,
  });
});

const httpServer = http.createServer(router);

httpServer.listen(config.server.port, () => {
  logging.info(
    NAMESPACE,
    `Server is running ${config.server.hostname}:${config.server.port}`
  );
});
