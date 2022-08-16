import { Speciality } from "../models";

const getAllSpecialities = async () => {
  const allSpecialities = await Speciality.find();
  return allSpecialities;
};

export { getAllSpecialities };
