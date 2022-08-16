import { Medic } from "../models";

const getAllMedics = async () => {
  const allMedics = await Medic.find();
  return allMedics;
};

export { getAllMedics };
