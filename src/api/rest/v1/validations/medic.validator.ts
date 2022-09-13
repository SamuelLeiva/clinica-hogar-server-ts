import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../utils/validation.handle";

const validateCreateMedic = [
  check("firstName").exists().not().isEmpty(),
  check("lastNameF").exists().not().isEmpty(),
  check("lastNameM").exists().not().isEmpty(),
  check("speciality").exists().not().isEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

export { validateCreateMedic };
