import { Request, Response } from "express";
import mongoose from "mongoose";
import Appointment from "../model/Appointment";
import Medic from "../model/Medic";
import Patient from "../model/Patient";

const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find();
    res.send(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAppointment = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;

    const appointment = await Appointment.findOne({ _id });

    if (!appointment) {
      return res.status(404).json({ message: "Not found" });
    }

    res.send(appointment);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const postAppointment = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findById(req.params.idPatient);
    const medic = await Medic.findById(req.params.idMedic);

    if (!patient || !medic)
      return res.status(404).json({ message: "Not found" });

    const { date, appointmentType } = req.body;

    const appointment = new Appointment({
      date,
      appointmentType,
      patient,
      medic,
    });

    const saved = await appointment.save();

    return res.status(201).send(saved);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

//custom methods
const getAppointmentsByPatient = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find({
      patient: new mongoose.Types.ObjectId(req.params.idPatient),
    })
      .populate({
        path: "medic",
        populate: {
          path: "speciality",
        },
      })
      .populate("patient");

    return res.send(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export {
  getAllAppointments,
  postAppointment,
  getAppointment,
  getAppointmentsByPatient,
};
