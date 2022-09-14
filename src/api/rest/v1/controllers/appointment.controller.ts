import { Request, Response } from "express";

import {
  findAllAppointments,
  findAppointment,
  findAppointmentsByPatient,
  findMedic,
  findPatient,
  saveAppointment,
} from "../services";
import { handleHttpError } from "../utils/error.handle";

const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments = await findAllAppointments();
    res.send(appointments);
  } catch (error) {
    handleHttpError(res, 500, "SERVER_ERROR");
  }
};

const getAppointment = async (req: Request, res: Response) => {
  try {
    const _id = req.params.id;

    const appointment = await findAppointment({ _id });

    if (!appointment) {
      handleHttpError(res, 404, "APPOINTMENT_NOT_FOUND");
    }

    res.send(appointment);
  } catch (error) {
    handleHttpError(res, 500, "SERVER_ERROR");
  }
};

const postAppointment = async (req: Request, res: Response) => {
  try {
    const patient = await findPatient({ _id: req.params.idPatient });
    const medic = await findMedic({ _id: req.params.idMedic });

    if (!patient || !medic)
      handleHttpError(res, 404, "PATIENT_OR_MEDIC_DOESN'T_EXIST");

    const { date, appointmentType } = req.body;

    const saved = await saveAppointment({
      date,
      appointmentType,
      patient,
      medic,
    });

    return res.status(201).send(saved);
  } catch (error) {
    handleHttpError(res, 500, "SERVER_ERROR");
  }
};

const getAppointmentsByPatient = async (req: Request, res: Response) => {
  try {
    const appointments = await findAppointmentsByPatient(req.params.idPatient);
    return res.send(appointments);
  } catch (error) {
    handleHttpError(res, 500, "SERVER_ERROR");
  }
};

export {
  getAllAppointments,
  postAppointment,
  getAppointment,
  getAppointmentsByPatient,
};
