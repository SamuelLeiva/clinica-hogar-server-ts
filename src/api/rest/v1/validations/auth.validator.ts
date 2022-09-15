import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../utils";

const validateLogin = [
  check("email").exists().not().isEmpty().isEmail(),
  check("password").exists().not().isEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];

const validateRegister = [
  check("firstName").exists().not().isEmpty(),
  check("lastNameF").exists().not().isEmpty(),
  check("lastNameM").exists().not().isEmpty(),
  check("document").exists().not().isEmpty(),
  check("sex").exists().not().isEmpty().isIn(["M", "F"]),
  check("documentType")
    .exists()
    .not()
    .isEmpty()
    .isIn(["DNI", "CARNET EXTRANJERIA", "PASAPORTE", "RUC"]),
  check("birthday").exists().not().isEmpty().isDate(),
  check("phoneNumber")
    .exists()
    .not()
    .isEmpty()
    .matches(/^\d{7}(?:\d{2})?$/),
  ...validateLogin,
];

export { validateLogin, validateRegister };
