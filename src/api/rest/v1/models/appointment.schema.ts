import { model, Model, Schema, Document } from "mongoose";
import { Appointment } from "../interfaces/appointment.interface";

// export interface IAppointment extends Document {
//   date: Date;
//   medic?: any;
//   patient?: any;
//   appointmentType?: string;
// }

const AppointmentSchema: Schema = new Schema<Appointment>(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    appointmentType: {
      type: String,
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
    },
    medic: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Medic",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AppointmentModel = model("appointments", AppointmentSchema);

export default AppointmentModel;
