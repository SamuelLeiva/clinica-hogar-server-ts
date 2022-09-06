import { Appointment } from "../models";

const findAllAppointments = async () => {
  const allAppointments = await Appointment.find();
  return allAppointments;
};

const findAppointment = async (props: any) => {
  const appointment = Appointment.findOne({ ...props });
  return appointment;
};

const saveAppointment = async (props: any) => {
  const appointment = new Appointment({
    ...props,
  });
  const saved = await appointment.save();
  return saved;
};

//custom methods
//TODO: cuando se poble medic que no aparezca schedule
const findAppointmentsByPatient = async (patientId: string) => {
  const appointments = await Appointment.find({
    patient: patientId,
  })
    .populate({
      path: "medic",
      populate: {
        path: "speciality",
      },
    })
    .populate("patient");

  return appointments;
};

export {
  findAllAppointments,
  findAppointment,
  saveAppointment,
  findAppointmentsByPatient,
};
