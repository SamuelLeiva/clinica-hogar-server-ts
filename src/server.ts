import http from "http";
import express from "express";
import cors from "cors";

//import routes

import logging from "./config/logging";
import config from "./config/config";
import {
  appointmentRoutes,
  authRoutes,
  medicRoutes,
  specialityRoutes,
  userRoutes,
} from "./api/rest/v1/routes";
import { startConnection } from "./config/database";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsOptions";
import { allowedOrigins } from "./config/constants/allowedOrigins";

const NAMESPACE = "Server";
const router = express();

//initializing the db
startConnection();

//-------------------

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

/* CORS */
//router.use(cors(corsOptions));

/** Rules of our API */
// router.use((req, res, next) => {
//   //let origin = req.headers.origin!;
//   if (allowedOrigins.includes(req.headers.origin!)) {
//     //res.header("Access-Control-Allow-Origin", origin); // restrict it to the required domain
//     res.header("Access-Control-Allow-Credentials", "true");
//   }

//   //res.header("Access-Control-Allow-Credentials", true);

//   res.header("Access-Control-Allow-Origin", "*"); //TODO: cambiar luego
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie"
//   );

//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//     return res.status(200).json({});
//   }

//   //console.log("res.header", res.header("Access-Control-Allow-Origin"));

//   next();
// });

/** Routes go here */

router.use("/api/v1/auth", authRoutes);

router.use("/api/v1/user", userRoutes);
router.use("/api/v1/medic", medicRoutes);
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
