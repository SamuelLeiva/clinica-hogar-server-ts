import { Schema, Document, model, Model } from "mongoose";

export interface ISpeciality extends Document {
  name?: string;
  appointmentCost?: number;
}

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

const Speciality: Model<ISpeciality> = model("Speciality", specialitySchema);

export default Speciality;
