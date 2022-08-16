import { Appointment } from "../models";

const getAllAppointments = async () => {
  const allAppointments = await Appointment.find();
  return allAppointments;
};

export { getAllAppointments };
