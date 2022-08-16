import { Medic } from "../models";

const findAllMedics = async () => {
  const allMedics = await Medic.find();
  return allMedics;
};

const findMedic = async (props: any) => {
  const medic = Medic.findOne({ ...props });
  return medic;
};

export { findAllMedics, findMedic };
