import { Request, Response } from "express";
import Medic from "../model/Medic";
import { Schema } from "mongoose";

const getAllMedics = async (req: Request, res: Response) => {
  try {
    const medics = await Medic.find();
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
    ...req.body,
    speciality: req.params.speciality,
  });

  try {
    await medic.save();
    res.status(201).send(medic);
  } catch (error) {
    res.status(400).send(error);
  }
};

//custom methods
const getMedicsBySpeciality = async (req: Request, res: Response) => {
  try {
    const medics = await Medic.find({
      speciality: req.params.idEsp,
    });

    res.send(medics);
  } catch (error) {
    res.status(500).send();
  }
};

export { getAllMedics, getMedic, postMedic, getMedicsBySpeciality };
