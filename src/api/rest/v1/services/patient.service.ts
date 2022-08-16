import { Patient } from "../models";

const findAllPatients = async () => {
  const allPatients = await Patient.find();
  return allPatients;
};

const findPatient = async (props: any) => {
  const patient = Patient.findOne({ ...props });
  return patient;
};

export { findAllPatients, findPatient };
