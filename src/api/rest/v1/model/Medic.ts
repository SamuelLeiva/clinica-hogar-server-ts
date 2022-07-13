import { model, Schema, Document, Model } from "mongoose";

export interface IMedic extends Document {
  firstName?: string;
  lastNameF?: string;
  lastNameM?: string;
  schedule?: any;
  speciality?: any;
}

const medicSchema: Schema = new Schema(
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
    schedule: [
      {
        day: {
          type: String,
          required: true,
          trim: true,
        },
        hour: {
          type: String,
          required: true,
        },
        occupied: {
          type: Boolean,
          required: true,
        },
      },
    ],
    speciality: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Speciality",
    },
  },
  {
    timestamps: true,
  }
);

//relationships
medicSchema.virtual("appointments", {
  ref: "Appointment",
  localField: "_id",
  foreignField: "medic",
});

const Medic: Model<IMedic> = model("Medic", medicSchema);

export default Medic;
