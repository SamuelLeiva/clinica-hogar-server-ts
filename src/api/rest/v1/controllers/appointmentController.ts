import { Request, Response } from "express";
import Appointment from "../model/Appointment";
import Medic from "../model/Medic";
import User from "../model/User";

const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await Appointment.find();
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAppointment = async (req: Request, res: Response) => {
  const _id = req.params.id;
  try {
    const appointment = await Appointment.findOne({ _id });

    if (!appointment) {
      return res.status(404).send();
    }

    res.send(appointment);
  } catch (error) {
    res.status(500).send(error);
  }
};

const postAppointment = async (req: Request, res: Response) => {
  const patient = await User.findById(req.params.idPatient);
  const medic = await Medic.findById(req.params.idMedic);

  const appointment = new Appointment({
    ...req.body,
    patient: patient,
    medic: medic,
  });

  try {
    await appointment.save();
    res.status(201).send(appointment);
  } catch (error) {
    res.status(400).send(error);
  }
};

//custom methods
const getAppointmentsByUser = async (req: Request, res: Response) => {
  console.log(req.body.user.email)
  try {
    const appointments = await Appointment.findByPatient(req.body.user._id.toString());
    if(!appointments) return res.sendStatus(404);
    res.send(appointments);
  } catch (error) {
    res.status(500).send(error);
  }
};

export {
  getAllAppointments,
  postAppointment,
  getAppointment,
  getAppointmentsByUser,
};
