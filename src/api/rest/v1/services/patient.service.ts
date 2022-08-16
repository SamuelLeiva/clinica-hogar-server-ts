import { Patient } from "../models";

const getAllPatients = async () => {
  const allPatients = await Patient.find();
  return allPatients;
};

const findPatient = async (props: any) => {
  const patient = Patient.findOne({ ...props });
  return patient;
};

export { getAllPatients, findPatient };
