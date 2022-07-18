import { body } from "express-validator";

const appointmentValidations = [
  body("appointmentType").trim().isIn(["PRESENCIAL", "VIRTUAL"]),
];

export default appointmentValidations;
