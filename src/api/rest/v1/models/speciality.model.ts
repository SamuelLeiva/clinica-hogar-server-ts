import { Schema, Document, model, Model } from "mongoose";
import { Speciality } from "../interfaces";

const SpecialitySchema = new Schema<Speciality>(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    appointmentCost: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

SpecialitySchema.virtual("medics", {
  ref: "medics",
  localField: "_id",
  foreignField: "speciality",
});

const SpecialityModel = model("specialities", SpecialitySchema);

export default SpecialityModel;
