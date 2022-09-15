import { AppointmentModel } from "../models";

const findAllAppointments = async () => {
  const allAppointments = await AppointmentModel.find();
  return allAppointments;
};

const findAppointment = async (props: any) => {
  const appointment = AppointmentModel.findOne({ ...props });
  return appointment;
};

const saveAppointment = async (props: any) => {
  const appointment = AppointmentModel.create({
    ...props,
  });
  return appointment;
};

//custom methods
//TODO: cuando se poble medic que no aparezca schedule
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
