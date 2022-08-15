import { Request, Response } from "express";
import Medic from "../models/medic.schema";

const getAllMedics = async (req: Request, res: Response) => {
  try {
    let medics = await Medic.find(); //depende de los casos de uso si queremos mostrar el schedule
    medics = medics.map((medic) => {
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
    const _id = req.params.id;

    const medic = await Medic.findOne({ _id });

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
    const medic = new Medic({
      firstName,
      lastNameF,
      lastNameM,
      speciality,
    });

    await medic.save();
    res.status(201).send(medic);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const putMedic = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;

    const { firstName, lastNameF, lastNameM, schedule } = req.body;

    const medic = await Medic.findOneAndUpdate(
      { _id },
      {
        firstName,
        lastNameF,
        lastNameM,
        schedule,
      }
    );

    if (!medic) return res.status(404).json({ message: "Not found" });

    res.status(201).send(medic);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//custom methods
const getMedicsBySpeciality = async (req: Request, res: Response) => {
  try {
    const medics = await Medic.find({
      speciality: req.params.idEsp,
    }).populate("speciality");

    res.send(medics);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { getAllMedics, getMedic, postMedic, getMedicsBySpeciality, putMedic };
