import { Request, Response } from "express";
import { RequestExt } from "../interfaces/req-ext.interface";
import {
  findPatient,
  findUser,
  savePatient,
  updatePatientUser,
  updateUserPatient,
} from "../services";

const getPatientsByUser = async ({ user }: RequestExt, res: Response) => {
  try {
    //buscar al user
    const userDb = await findUser({ email: user!.id });

    //poblamos al user
    const userWithPatients = await userDb.populate({
      path: "patients",
      populate: { path: "appointments" },
    });

    return res.send(userWithPatients.patients);
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
const addPatient = async ({ user, body }: RequestExt, res: Response) => {
  try {
    const userDb = await findUser({ email: user!.id });

    const {
      email,
      firstName,
      lastNameF,
      lastNameM,
      document,
      sex,
      documentType,
      birthday,
      phoneNumber,
    } = body;

    //si el paciente ya existe
    const exactDuplicate = await findPatient({
      document,
      email,
      users: userDb._id,
    });

    //si ya existe el paciente conectado a ese mismo usuario
    if (exactDuplicate)
      return res.status(409).json({
        message: "PATIENT_WITH_SAME_DOCUMENT_AND_EMAIL_ALREADY_IN_THIS_USER",
      }); //Conflict

    //si existe el paciente , mas no esta conectado a este usuario
    const duplicate = await findPatient({ document, email });

    //TODO: comprobar exhaustivamente los datos que se han ingresado para verificar que es el mismo usuario

    if (duplicate) {
      //actualizar paciente
      await updatePatientUser(duplicate._id, userDb._id);

      //actualizar usuario
      await updateUserPatient(userDb._id, duplicate._id);

      return res.send({ message: "Patient linked to actual user." }); //conectados
    }

    const patientDb = await savePatient({
      firstName,
      lastNameF,
      lastNameM,
      email,
      document,
      sex,
      documentType,
      birthday,
      phoneNumber,
    });

    //actualizar usuario
    await updateUserPatient(userDb._id, patientDb._id);

    //actualizar paciente
    await updatePatientUser(patientDb._id, userDb._id);

    res.status(201).json({ message: "Created and added patient to this user" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { postPatient, getPatientsByUser, addPatient };
