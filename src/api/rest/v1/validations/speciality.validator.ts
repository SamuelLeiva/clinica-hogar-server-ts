import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../utils";

const validateCreateSpeciality = [
  check("name").exists().not().isEmpty(),
  check("appointmentCost").exists().not().isEmpty().isFloat({ min: 10.0 }),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export { validateCreateSpeciality };
