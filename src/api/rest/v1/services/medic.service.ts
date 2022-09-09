import MedicModel from "../models/medic.schema";

const findAllMedics = async () => {
  const allMedics = await MedicModel.find();
  return allMedics;
};

const findMedic = async (props: any) => {
  const medic = MedicModel.findOne({ ...props });
  return medic;
};

const saveMedic = async (props: any) => {
  const saved = await MedicModel.create({ ...props });
  return saved;
};

const updateMedic = async (id: string, props: any) => {
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
  });
  return medics;
};

export {
  findAllMedics,
  findMedic,
  findMedicsBySpeciality,
  saveMedic,
  updateMedic,
};
