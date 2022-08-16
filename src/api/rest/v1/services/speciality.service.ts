import { Speciality } from "../models";

const findAllSpecialities = async () => {
  const allSpecialities = await Speciality.find();
  return allSpecialities;
};

export { findAllSpecialities };
