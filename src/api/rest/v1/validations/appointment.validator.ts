import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../helpers/validation.helper";

const validateCreateAppointment = [
  check("date").exists().not().isEmpty(),
  check("appointmentType")
    .exists()
    .not()
    .isEmpty()
    .isIn(["PRESENCIAL", "VIRTUAL"]),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export { validateCreateAppointment };
