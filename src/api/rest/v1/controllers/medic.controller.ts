import { Request, Response } from "express";
import {
  findAllMedics,
  findMedic,
  findMedicsBySpeciality,
  saveMedic,
  updateMedic,
} from "../services";
import { handleHttpError } from "../utils";

const getAllMedics = async (req: Request, res: Response) => {
  try {
    const medics = await findAllMedics();
    res.send(medics);
  } catch (error) {
    handleHttpError(res, 500, "SERVER_ERROR");
  }
};

const getMedic = async (req: Request, res: Response) => {
  try {
    const medic = await findMedic({ _id: req.params.id });

    if (!medic) {
      handleHttpError(res, 404, "MEDIC_NOT_FOUND");
      //return res.status(404).json({ message: "Not found" });
    }

    res.send(medic);
  } catch (error) {
    handleHttpError(res, 500, "SERVER_ERROR");
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
    handleHttpError(res, 500, "SERVER_ERROR");
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

    if (!medic) handleHttpError(res, 404, "MEDIC_NOT_FOUND");

    res.status(201).send({ medic, message: "Medico actualizado" });
  } catch (error) {
    handleHttpError(res, 500, "SERVER_ERROR");
  }
};

const getMedicsBySpeciality = async ({ params }: Request, res: Response) => {
  try {
    const medics = await findMedicsBySpeciality(params.idSpe);

    res.send(medics);
  } catch (error) {
    handleHttpError(res, 500, "SERVER_ERROR");
  }
};

export { getAllMedics, getMedic, postMedic, getMedicsBySpeciality, putMedic };
