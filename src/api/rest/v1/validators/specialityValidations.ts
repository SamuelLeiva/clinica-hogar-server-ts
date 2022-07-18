import { body } from "express-validator";
import { SPECIALITIES } from "../constants/index";

const specialityValidations = [
  body("name").isIn(SPECIALITIES),
  body("appointmentCost").isFloat({ min: 1.0 }),
];

export { specialityValidations };
