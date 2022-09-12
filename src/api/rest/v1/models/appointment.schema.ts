import { model, Model, Schema, Document } from "mongoose";

export interface IAppointment extends Document {
  date: Date;
  medic?: any;
  patient?: any;
  appointmentType?: string;
}

const appointmentSchema: Schema = new Schema(
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
  }
);

const Appointment: Model<IAppointment> = model(
  "Appointment",
  appointmentSchema
);

export default Appointment;
