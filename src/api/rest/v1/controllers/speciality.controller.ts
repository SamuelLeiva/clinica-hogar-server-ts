import { Request, Response } from "express";
import {
  findAllSpecialities,
  findSpeciality,
  saveSpeciality,
} from "../services";
import { handleHttpError } from "../utils";

const getAllSpecialities = async (req: Request, res: Response) => {
  try {
    const specialities = await findAllSpecialities();
    res.send(specialities);
  } catch (error) {
    handleHttpError(res, 500, "SERVER_ERROR");
  }
};

const getSpeciality = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;

    const speciality = await findSpeciality({ _id });

    if (!speciality) {
      handleHttpError(res, 404, "SPECIALITY_NOT_FOUND");
    }

    res.send(speciality);
  } catch (error) {
    handleHttpError(res, 500, "SERVER_ERROR");
  }
};

const postSpeciality = async (req: Request, res: Response) => {
  try {
    const { name, appointmentCost } = req.body;
    const speciality = await saveSpeciality({ name, appointmentCost });
    if (speciality === "ALREADY_SPECIALITY")
      handleHttpError(res, 400, speciality);
    res.status(201).json({ message: "Speciality created", speciality });
  } catch (error) {
    handleHttpError(res, 500, "SERVER_ERROR");
  }
};

export { getAllSpecialities, getSpeciality, postSpeciality };
