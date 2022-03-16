import { model, Schema } from "mongoose";

const appointmentSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    medic: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Medic",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Appointment", appointmentSchema);
