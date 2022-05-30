import { Schema, Document, model, Model } from "mongoose";

interface IPatient {
  firstName?: string;
  lastNameF?: string;
  lastNameM?: string;
  document?: string;
  birthday?: string;
  phoneNumber?: string;
  sex?: string;
  users?: Array<any>;
}

interface IPatientDocument extends IPatient, Document {
  //methods
}

interface IPatientModel extends Model<IPatientModel> {
  //statics
}

const patientSchema = new Schema(
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

//relationships
patientSchema.virtual("appointments", {
  ref: "Appointment",
  localField: "_id",
  foreignField: "patient",
});

export default model<IPatient, IPatientModel>("Patient", patientSchema);
