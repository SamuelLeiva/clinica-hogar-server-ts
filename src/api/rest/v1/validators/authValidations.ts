import { body } from "express-validator";
import { patientValidations } from "./patientValidations";

const loginValidations = [
  body("email").matches(
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  ),
  body("password").isLength({ min: 6 }),
];

const registerValidations = [...loginValidations, ...patientValidations];

export { loginValidations, registerValidations };
