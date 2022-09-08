import { Request, Response } from "express";
import {
  findAllSpecialities,
  findSpeciality,
  saveSpeciality,
} from "../services";

const getAllSpecialities = async (req: Request, res: Response) => {
  try {
    const specialities = await findAllSpecialities();
    res.send(specialities);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getSpeciality = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;

    const speciality = await findSpeciality({ _id });

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
    const { name, appointmentCost } = req.body;
    const speciality = await saveSpeciality({ name, appointmentCost });
    if (speciality === "ALREADY_SPECIALITY")
      return res.status(400).json({ message: speciality });
    res.status(201).json({ message: "Speciality created", speciality });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { getAllSpecialities, getSpeciality, postSpeciality };
