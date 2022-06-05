import { Request, Response } from "express";
import Appointment from "../model/Appointment";
import Medic from "../model/Medic";
import Patient from "../model/Patient";

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
  const patient = await Patient.findById(req.params.idPatient);
  const medic = await Medic.findById(req.params.idMedic);

  const { date } = req.body;

  const appointment = new Appointment({
    date,
    patient,
    medic,
  });

  try {
    const saved = await appointment.save();
    return res.status(201).send(saved);
  } catch (error) {
    return res.status(400).send(error);
  }
};

//custom methods
const getAppointmentsByPatient = async (req: Request, res: Response) => {
  const patient = await Patient.findById(req.params.idPatient).populate(
    "appointments"
  );

  console.log("patient", patient);

  return res.send(patient!.appointments);
};

export {
  getAllAppointments,
  postAppointment,
  getAppointment,
  getAppointmentsByPatient,
};
