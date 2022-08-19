import { Patient } from "../models";

const findAllPatients = async () => {
  const allPatients = await Patient.find();
  return allPatients;
};

const findPatient = async (props: any) => {
  const patient = Patient.findOne({ ...props });
  return patient;
};

const savePatient = async (props: any) => {
  const patient = new Patient({
    ...props,
  });
  const patientDB = await patient.save();
  return patientDB;
};

const updatePatientUser = async (idPatient: string, idUser: string) => {
  await Patient.updateOne({ _id: idPatient }, { $push: { users: idUser } });
};

export { findAllPatients, findPatient, savePatient, updatePatientUser };
