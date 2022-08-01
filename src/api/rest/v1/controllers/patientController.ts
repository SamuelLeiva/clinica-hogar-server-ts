import { Request, Response } from "express";
import mongoose from "mongoose";
import Patient from "../model/Patient";
import User from "../model/User";

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

    res.status(201).send(patientDb);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getPatientsByUser = async (req: Request, res: Response) => {
  try {
    const user = await req.body.user.populate({
      path: "patients",
      populate: { path: "appointments" },
    });

    return res.send(user.patients);
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
    const exactDuplicate = await Patient.findOne({
      document,
      users: new mongoose.Types.ObjectId(user._id),
    });

    //si ya existe el paciente conectado a ese mismo usuario
    if (exactDuplicate) return res.status(409).json({ message: "Conflict" }); //Conflict

    const duplicate = await Patient.findOne({ document });

    //si existe el paciente, mas no esta conectado a este usuario
    if (duplicate) {
      //actualizar paciente
      await Patient.updateOne(
        { _id: duplicate._id },
        { $push: { users: user._id } }
      );

      //actualizar usuario
      await User.updateOne(
        { _id: user._id },
        { $push: { patients: duplicate._id } }
      );

      return res.send({ message: "Patient linked to actual user." }); //conectados
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

    res.status(201).json({ message: "Created and added patient to this user" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { postPatient, getPatientsByUser, addPatient };
