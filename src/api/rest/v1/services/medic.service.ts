import { Medic } from "../interfaces";
import { MedicModel } from "../models";

const findAllMedics = async () => {
  const allMedics = await MedicModel.find().select("-schedule");
  return allMedics;
};

const findMedic = async (id: string) => {
  const medic = MedicModel.findOne({ _id: id });
  return medic;
};

const saveMedic = async (props: Medic) => {
  const saved = await MedicModel.create({ ...props });
  return saved;
};

const updateMedic = async (id: string, props: Medic) => {
  const medic = await MedicModel.findOneAndUpdate(
    { _id: id },
    {
      ...props,
    },
    { new: true }
  );
  return medic;
};

const findMedicsBySpeciality = async (idSpe: string) => {
  const medics = await MedicModel.find({
    speciality: idSpe,
  }).select("-schedule");
  return medics;
};

export {
  findAllMedics,
  findMedic,
  findMedicsBySpeciality,
  saveMedic,
  updateMedic,
};
