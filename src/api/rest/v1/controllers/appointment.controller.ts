import { Request, Response } from "express";

import {
  findAllAppointments,
  findAppointment,
  findAppointmentsByPatient,
  findMedic,
  findPatient,
  saveAppointment,
} from "../services";

const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await findAllAppointments();
    res.send(appointments);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const getAppointment = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;

    const appointment = await findAppointment({ _id });

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
    const patient = await findPatient({ _id: req.params.idPatient });
    const medic = await findMedic({ _id: req.params.idMedic });

    if (!patient || !medic)
      return res.status(404).json({ message: "Not found" });

    const { date, appointmentType } = req.body;

    const saved = await saveAppointment({
      date,
      appointmentType,
      patient,
      medic,
    });

    return res.status(201).send(saved);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const getAppointmentsByPatient = async (req: Request, res: Response) => {
  try {
    const appointments = await findAppointmentsByPatient(req.params.idPatient);
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
