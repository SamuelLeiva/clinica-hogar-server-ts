import { Schema, model } from "mongoose";

const specialitySchema = new Schema(
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
  }
);

//relacion con medics
specialitySchema.virtual("medics", {
  ref: "Medic",
  localField: "_id",
  foreignField: "speciality",
});

export default model("Speciality", specialitySchema);
