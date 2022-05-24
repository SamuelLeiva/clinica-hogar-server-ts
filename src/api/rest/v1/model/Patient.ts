import { Schema, Document, model, Model } from "mongoose";

interface IPatient {
  firstName?: string;
  lastNameF?: string;
  lastNameM?: string;
  document?: string;
  birthday?: string;
  phoneNumber?: string;
  users?: Array<any>;
}

interface IPatientDocument extends IPatient, Document {
  //methods
  //generateAuthToken: () => any;
}

interface IPatientModel extends Model<IPatientModel> {
  //statics
  //   findProfile: (email: string) => any;
  //   findByCredentials: (email: string, password: string) => any;
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

export default model<IPatient, IPatientModel>("Patient", patientSchema);
