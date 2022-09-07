import { model, Schema, Document, Model } from "mongoose";
import { Medic } from "../interfaces/medic.interface";

// export interface IMedic extends Document {
//   firstName?: string;
//   lastNameF?: string;
//   lastNameM?: string;
//   schedule?: any;
//   speciality?: any;
// }

const MedicSchema: Schema = new Schema<Medic>(
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
MedicSchema.virtual("appointments", {
  ref: "Appointment",
  localField: "_id",
  foreignField: "medic",
});

const MedicModel = model("Medic", MedicSchema);

export default MedicModel;
