import { Appointment } from "../interfaces";
import { AppointmentModel } from "../models";

const findAllAppointments = async () => {
  const allAppointments = await AppointmentModel.find();
  return allAppointments;
};

const findAppointment = async (id: string) => {
  const appointment = AppointmentModel.findOne({ _id: id });
  return appointment;
};

const saveAppointment = async ({ appointmentType, date }: Appointment) => {
  const appointment = AppointmentModel.create({
    appointmentType,
    date,
  });
  return appointment;
};

const findAppointmentsByPatient = async (patientId: string) => {
  const appointments = await AppointmentModel.find({
    patient: patientId,
  })
    .populate({
      path: "medic",
      select: ["firstName", "lastNameF", "lastNameM"],
      populate: {
        path: "speciality",
        select: ["name"],
      },
    })
    .populate("patient", ["firstName", "lastNameF", "lastNameM"]);
  return appointments;
};

export {
  findAllAppointments,
  findAppointment,
  saveAppointment,
  findAppointmentsByPatient,
};
