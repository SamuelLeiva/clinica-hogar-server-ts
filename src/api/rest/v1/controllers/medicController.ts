import { Request, Response } from "express";
import Medic from "../model/Medic";

const getAllMedics = async (req: Request, res: Response) => {
  try {
    let medics = await Medic.find(); //depende de los casos de uso si queremos mostrar el schedule
    medics = medics.map((medic) => {
      medic.schedule = [];
      return medic;
    });
    res.send(medics);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getMedic = async (req: Request, res: Response) => {
  const _id = req.params.id;
  try {
    const medic = await Medic.findOne({ _id });

    if (!medic) {
      return res.status(404).send();
    }

    res.send(medic);
  } catch (error) {
    res.status(500).send(error);
  }
};

const postMedic = async (req: Request, res: Response) => {
  const medic = new Medic({
    firstName: req.body.firstName,
    lastNameF: req.body.lastNameF,
    lastNameM: req.body.lastNameM,
    speciality: req.params.speciality,
  });

  try {
    await medic.save();
    res.status(201).send(medic);
  } catch (error) {
    res.status(400).send(error);
  }
};

const putMedic = async (req: Request, res: Response) => {
  const _id = req.params.id;
  try {
    const medic = await Medic.findOneAndUpdate(
      { _id },
      {
        firstName: req.body.firstName,
        lastNameF: req.body.lastNameF,
        lastNameM: req.body.lastNameM,
        schedule: req.body.schedule,
      }
    );

    res.send(medic.schedule);
  } catch (error) {
    res.status(500).send(error);
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
    res.status(500).send();
  }
};

export { getAllMedics, getMedic, postMedic, getMedicsBySpeciality, putMedic };
