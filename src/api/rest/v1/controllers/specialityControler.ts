import { Request, Response } from "express";
import Speciality from "../model/Speciality";

const getAllSpecialities = async (req: Request, res: Response) => {
  try {
    const specialities = await Speciality.find();
    res.send(specialities);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getSpeciality = async (req: Request, res: Response) => {
  const _id = req.params.id;
  try {
    const speciality = await Speciality.findOne({ _id });

    if (!speciality) {
      return res.status(404).send();
    }

    return res.send(speciality);
  } catch (error) {
    res.status(500).send(error);
  }
};

const postSpeciality = async (req: Request, res: Response) => {
  const speciality = new Speciality({
    ...req.body,
  });

  try {
    await speciality.save();
    res.status(201).send(speciality);
  } catch (error) {
    res.status(400).send(error);
  }
};

export { getAllSpecialities, getSpeciality, postSpeciality };
