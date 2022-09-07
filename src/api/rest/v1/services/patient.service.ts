import { Patient } from "../models";
import PatientModel from "../models/patient.schema";

const findAllPatients = async () => {
  const allPatients = await Patient.find();
  return allPatients;
};

const findPatient = async (props: any) => {
  const patient = Patient.findOne({ ...props });
  return patient;
};

const savePatient = async (props: any) => {
  const patient = await PatientModel.create({
    ...props,
  });
  return patient;
};

const updatePatientUser = async (idPatient: string, idUser: string) => {
  await Patient.updateOne({ _id: idPatient }, { $push: { users: idUser } });
};

export { findAllPatients, findPatient, savePatient, updatePatientUser };
