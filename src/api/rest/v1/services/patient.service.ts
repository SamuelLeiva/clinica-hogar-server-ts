import { PatientModel } from "../models";

const findAllPatients = async () => {
  const allPatients = await PatientModel.find();
  return allPatients;
};

const findPatient = async (props: any) => {
  const patient = await PatientModel.findOne({ ...props });
  return patient;
};

const savePatient = async (props: any) => {
  const patient = await PatientModel.create({
    ...props,
  });
  return patient;
};

const updatePatientUser = async (idPatient: string, idUser: string) => {
  await PatientModel.updateOne(
    { _id: idPatient },
    { $push: { users: idUser } }
  );
};

export { findAllPatients, findPatient, savePatient, updatePatientUser };
