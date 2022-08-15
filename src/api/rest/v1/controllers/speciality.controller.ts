import { Request, Response } from "express";
import Speciality from "../models/speciality.schema";

const getAllSpecialities = async (req: Request, res: Response) => {
  try {
    const specialities = await Speciality.find();
    res.send(specialities);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getSpeciality = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;

    const speciality = await Speciality.findOne({ _id });

    if (!speciality) {
      return res.status(404).json({ message: "Not found" });
    }

    res.send(speciality);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const postSpeciality = async (req: Request, res: Response) => {
  try {
    const speciality = new Speciality({
      ...req.body,
    });

    await speciality.save();
    res.status(201).json({ message: "Speciality created", speciality });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { getAllSpecialities, getSpeciality, postSpeciality };
