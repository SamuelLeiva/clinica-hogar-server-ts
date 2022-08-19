import { Request, Response } from "express";
import {
  findPatient,
  savePatient,
  updatePatientUser,
  updateUserPatient,
} from "../services";

const getPatientsByUser = async (req: Request, res: Response) => {
  try {
    //TODO: ese user lo inserta el middleware en el body
    const user = await req.body.user.populate({
      path: "patients",
      populate: { path: "appointments" },
    });

    return res.send(user.patients);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//usan servicios
const postPatient = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastNameF,
      lastNameM,
      document,
      sex,
      documentType,
      birthday,
      phoneNumber,
    } = req.body;

    const patientDb = await savePatient({
      firstName,
      lastNameF,
      lastNameM,
      document,
      sex,
      documentType,
      birthday,
      phoneNumber,
    });

    res.status(201).send(patientDb);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//add patient to user
const addPatient = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;

    const {
      firstName,
      lastNameF,
      lastNameM,
      document,
      sex,
      documentType,
      birthday,
      phoneNumber,
    } = req.body;

    //si el paciente ya existe
    const exactDuplicate = await findPatient({ document, users: user._id });

    //si ya existe el paciente conectado a ese mismo usuario
    if (exactDuplicate) return res.status(409).json({ message: "Conflict" }); //Conflict

    const duplicate = await findPatient({ document });

    //si existe el paciente, mas no esta conectado a este usuario
    if (duplicate) {
      //actualizar paciente
      await updatePatientUser(duplicate._id, user._id);

      //actualizar usuario
      await updateUserPatient(user._id, duplicate._id);

      return res.send({ message: "Patient linked to actual user." }); //conectados
    }

    const patientDb = await savePatient({
      firstName,
      lastNameF,
      lastNameM,
      document,
      sex,
      documentType,
      birthday,
      phoneNumber,
    });

    //actualizar usuario
    await updateUserPatient(user._id, patientDb._id);

    //actualizar paciente
    await updatePatientUser(patientDb._id, user._id);

    res.status(201).json({ message: "Created and added patient to this user" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { postPatient, getPatientsByUser, addPatient };
