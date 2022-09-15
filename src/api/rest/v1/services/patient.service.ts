import { Patient } from "../interfaces";
import { PatientModel } from "../models";
import { IndexPatient } from "../interfaces";

const findAllPatients = async () => {
  const allPatients = await PatientModel.find();
  return allPatients;
};

const findPatient = async (props: IndexPatient) => {
  const patient = await PatientModel.findOne({ ...props }).select([
    "-deletedAt",
    "-users",
    "-updatedAt",
    "-createdAt",
  ]);
  return patient;
};

const savePatient = async (props: Patient) => {
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
