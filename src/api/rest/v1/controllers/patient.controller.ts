import { Request, Response } from "express";
import { RequestExt } from "../interfaces";
import {
  findPatient,
  findUser,
  findUserWithPatients,
  savePatient,
  updatePatientUser,
  updateUserPatient,
} from "../services";
import { handleHttpError } from "../utils";

const getPatientsByUser = async ({ user }: RequestExt, res: Response) => {
  try {
    //buscar al user
    const userDb = await findUserWithPatients({ email: user!.id });

    return res.send(userDb.patients);
  } catch (error) {
    handleHttpError(res, 500, "SERVER_ERROR");
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
    handleHttpError(res, 500, "SERVER_ERROR");
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
      handleHttpError(
        res,
        409,
        "PATIENT_WITH_SAME_DOCUMENT_AND_EMAIL_ALREADY_IN_THIS_USER"
      ); //Conflict

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
    handleHttpError(res, 500, "SERVER_ERROR");
  }
};

export { postPatient, getPatientsByUser, addPatient };
