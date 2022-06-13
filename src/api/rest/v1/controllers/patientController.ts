import { Request, Response } from "express";
import mongoose from "mongoose";
import Patient from "../model/Patient";
import User, { IUserDocument } from "../model/User";

const getPatientsByUser = async (req: Request, res: Response) => {
  const user: IUserDocument = await req.body.user.populate({
    path: "patients",
    populate: { path: "appointments" },
  });

  return res.send(user.patients);
};

//add patient to user
const addPatient = async (req: Request, res: Response) => {
  const user: IUserDocument = req.body.user;
  //const idUser = new mongoose.Types.ObjectId(user._id);
  console.log("user", user);
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
  const exactDuplicate = await Patient.findOne({
    document,
    users: new mongoose.Types.ObjectId(user._id),
  });
  console.log("exactDuplicate", exactDuplicate);
  if (exactDuplicate) return res.sendStatus(409); //Conflict

  const duplicate = await Patient.findOne({ document });
  console.log("duplicate", duplicate);
  if (duplicate) {
    //await duplicate.setUser(user._id);
    //await duplicate.save();
    //await user.setPatient(duplicate._id);
    //await user.save();
    return res.sendStatus(200); //conectados
  }

  //crear paciente
  const patient = new Patient({
    firstName,
    lastNameF,
    lastNameM,
    document,
    sex,
    documentType,
    birthday,
    phoneNumber,
  });

  const patientDb = await patient.save();

  //actualizar usuario
  await User.updateOne(
    { _id: user._id },
    { $push: { patients: patientDb._id } }
  );

  //actualizar paciente
  await Patient.updateOne(
    { _id: patientDb._id },
    { $push: { users: user._id } }
  );

  return res.status(201).send(patientDb);
};

export { getPatientsByUser, addPatient };
