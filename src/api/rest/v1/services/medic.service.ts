import { Medic } from "../models";

const findAllMedics = async () => {
  const allMedics = await Medic.find();
  return allMedics;
};

const findMedic = async (props: any) => {
  const medic = Medic.findOne({ ...props });
  return medic;
};

const saveMedic = async (props: any) => {
  const medic = new Medic({
    ...props,
  });
  const saved = await medic.save();

  return saved;
};

const updateMedic = async (id: string, props: any) => {
  const medic = await Medic.findOneAndUpdate(
    { _id: id },
    {
      ...props,
    }
  );
  return medic;
};

const findMedicsBySpeciality = async (idSpe: string) => {
  const medics = await Medic.find({
    speciality: idSpe,
  }).populate("speciality");
  return medics;
};

export {
  findAllMedics,
  findMedic,
  findMedicsBySpeciality,
  saveMedic,
  updateMedic,
};
