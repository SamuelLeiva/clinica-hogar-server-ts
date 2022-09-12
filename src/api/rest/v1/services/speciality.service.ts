import { Speciality } from "../models";

const findAllSpecialities = async () => {
  const allSpecialities = await Speciality.find();
  return allSpecialities;
};

const findSpeciality = async (props: any) => {
  const speciality = Speciality.findOne({ ...props });
  return speciality;
};

const saveSpeciality = async (props: any) => {
  const speciality = new Speciality({
    ...props,
  });
  const specialityDB = await speciality.save();
  return specialityDB;
};

export { findAllSpecialities, findSpeciality, saveSpeciality };
