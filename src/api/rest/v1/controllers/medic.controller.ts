import { Request, Response } from "express";
import {
  findAllMedics,
  findMedic,
  findMedicsBySpeciality,
  saveMedic,
  updateMedic,
} from "../services";

const getAllMedics = async (req: Request, res: Response) => {
  try {
    let medics = (await findAllMedics()).map((medic) => {
      medic.schedule = [];
      return medic;
    });
    res.send(medics);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getMedic = async (req: Request, res: Response) => {
  try {
    const medic = await findMedic({ _id: req.params.id });

    if (!medic) {
      return res.status(404).json({ message: "Not found" });
    }

    res.send(medic);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const postMedic = async (req: Request, res: Response) => {
  try {
    const { firstName, lastNameF, lastNameM, speciality } = req.body;
    const medic = await saveMedic({
      firstName,
      lastNameF,
      lastNameM,
      speciality,
    });
    res.status(201).send(medic);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const putMedic = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { firstName, lastNameF, lastNameM, schedule } = req.body;

    const medic = await updateMedic(id, {
      firstName,
      lastNameF,
      lastNameM,
      schedule,
    });

    if (!medic) return res.status(404).json({ message: "Not found" });

    res.status(201).send({ medic, message: "Medico actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getMedicsBySpeciality = async ({ params }: Request, res: Response) => {
  try {
    const medics = (await findMedicsBySpeciality(params.idSpe)).map((medic) => {
      medic.schedule = [];
      return medic;
    });

    res.send(medics);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { getAllMedics, getMedic, postMedic, getMedicsBySpeciality, putMedic };
