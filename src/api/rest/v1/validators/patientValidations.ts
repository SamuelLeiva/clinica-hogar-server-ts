import { body } from "express-validator";

const patientValidations = [
  body("firstName").isLength({ min: 1 }),
  body("lastNameF").trim().isLength({ min: 1 }),
  body("lastNameM").trim().isLength({ min: 1 }),
  body("document").matches(/^(\d{8}|\d{11}|\d{12})$/),
  body("sex").isIn(["M", "F"]),
  body("documentType").isIn(["DNI", "CARNET EXTRANJERIA", "RUC", "PASAPORTE"]),
  body("birthday").isDate(),
  body("phoneNumber").matches(/^(\d{7}|\d{9})$/),
];

export { patientValidations };
