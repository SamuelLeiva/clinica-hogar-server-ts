import { Schema, Document, model, Model } from "mongoose";

export interface IPatient extends Document {
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

const patientSchema: Schema = new Schema(
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

const Patient: Model<IPatient> = model("Patient", patientSchema);

export default Patient;
