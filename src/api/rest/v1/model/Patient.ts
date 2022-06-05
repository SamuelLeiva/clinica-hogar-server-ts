import { Schema, Document, model, Model } from "mongoose";

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

interface IPatientDocument extends IPatient, Document {
  //methods
  addAppointment: (appointment: any) => Promise<void>;
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

//metodo que genera el token
patientSchema.methods.addAppointment = async function (appointment: any) {
  const patient = this;
  patient.appointments = patient.appointments.concat({ appointment });

  //await patient.save();
};

const Patient = model<IPatientDocument, IPatientModel>(
  "Patient",
  patientSchema
);

export default Patient;
