import { model, Model, Schema, Document } from "mongoose";
import { Appointment } from "../interfaces/appointment.interface";

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
      ref: "patients",
    },
    medic: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "medics",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const AppointmentModel = model("appointments", AppointmentSchema);

export default AppointmentModel;
