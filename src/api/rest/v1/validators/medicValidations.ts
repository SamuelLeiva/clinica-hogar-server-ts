import { body } from "express-validator";

const medicValidations = [
  body("firstName").isLength({ min: 1 }),
  body("lastNameF").trim().isLength({ min: 1 }),
  body("lastNameM").trim().isLength({ min: 1 }),
];

const postMedicValidations = [...medicValidations];

const putMedicValidations = [
  ...medicValidations,
  body("schedule").isArray({ min: 1 }),
];

export { postMedicValidations, putMedicValidations };
