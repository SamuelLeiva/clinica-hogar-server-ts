import { Schema, Document, model, Model } from "mongoose";
import { Patient } from "../interfaces";

const PatientSchema: Schema = new Schema<Patient>(
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
    email: {
      type: String,
      required: true,
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
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

PatientSchema.virtual("appointments", {
  ref: "appointments",
  localField: "_id",
  foreignField: "patient",
});

const PatientModel = model("patients", PatientSchema);

export default PatientModel;
