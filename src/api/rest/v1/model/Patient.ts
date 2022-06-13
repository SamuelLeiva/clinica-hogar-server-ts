import { Schema, Document, model, Model } from "mongoose";
import User from "./User";
import mongoose from "mongoose";

interface IPatient {
  firstName?: string;
  lastNameF?: string;
  lastNameM?: string;
  documentType?: string;
  document?: string;
  birthday?: string;
  phoneNumber?: string;
  sex?: string;
  deletedAt?: Date;
  users?: Array<any>;
  appointments?: Array<any>;
}

export interface IPatientDocument extends IPatient, Document {
  //methods
  addAppointment: (appointment: any) => Promise<void>;
  setUser: (userId: string) => Promise<typeof Patient>;
}

interface IPatientModel extends Model<IPatientDocument> {
  //statics
  //addAppointment: (appointment: any) => Promise<void>;
}

const patientSchema: Schema<IPatientDocument> = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastNameF: {
      type: String,
      required: true,
      trim: true,
    },
    lastNameM: {
      type: String,
      required: true,
      trim: true,
    },
    documentType: {
      type: String,
      required: true,
    },
    document: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    birthday: {
      type: Date,
      required: true,
    },
    sex: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    // appointments: [
    //   {
    //     appointment: {
    //       type: Schema.Types.ObjectId,
    //       ref: "Appointment",
    //     },
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

//relacion con citas
patientSchema.virtual("appointments", {
  ref: "Appointment",
  localField: "_id",
  foreignField: "patient",
});

//a;ade appointment (cambiar despues)
// patientSchema.methods.addAppointment = async function (appointment: any) {
//   const patient = this;
//   patient.appointments = patient.appointments.concat({ appointment });

//   //await patient.save();
// };

// patientSchema.methods.setUser = async function (user: any) {
// const patient = this;
// patient.users = patient.users.concat(user._id);
// console.log("patient.users", patient.users);
// await patient.save();
// };

const Patient = model<IPatientDocument, IPatientModel>(
  "Patient",
  patientSchema
);

export default Patient;
