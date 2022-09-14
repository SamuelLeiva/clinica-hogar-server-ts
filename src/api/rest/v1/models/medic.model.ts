import { model, Schema, Document, Model } from "mongoose";
import { Medic } from "../interfaces";

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
      ref: "specialities",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//relationships
MedicSchema.virtual("appointments", {
  ref: "appointments",
  localField: "_id",
  foreignField: "medic",
});

const MedicModel = model("medics", MedicSchema);

export default MedicModel;
