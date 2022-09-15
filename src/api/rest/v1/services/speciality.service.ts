import { Speciality } from "../interfaces";
import { SpecialityModel } from "../models";
import { IndexSpeciality } from "../interfaces/speciality.interface";

const findAllSpecialities = async () => {
  const allSpecialities = await SpecialityModel.find();
  return allSpecialities;
};

const findSpeciality = async (props: IndexSpeciality) => {
  const speciality = SpecialityModel.findOne({ ...props });
  return speciality;
};

const saveSpeciality = async ({ name, appointmentCost }: Speciality) => {
  const checkIs = await SpecialityModel.findOne({ name });
  if (checkIs) return "ALREADY_SPECIALITY";
  const specialityDB = await SpecialityModel.create({ name, appointmentCost });
  return specialityDB;
};

export { findAllSpecialities, findSpeciality, saveSpeciality };
