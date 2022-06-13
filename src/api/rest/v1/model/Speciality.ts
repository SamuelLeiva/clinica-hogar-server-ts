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

//relationships
specialitySchema.virtual("medics", {
  ref: "Medic",
  localField: "_id",
  foreignField: "speciality",
});

const Speciality = model("Speciality", specialitySchema);

export default Speciality;
