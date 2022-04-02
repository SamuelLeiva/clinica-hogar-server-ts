import { model, Schema } from "mongoose";

const medicSchema = new Schema(
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
        hour: {
          type: String,
          required: true,
        },
        ocuppied: {
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

//relacion con appointments
medicSchema.virtual("appointments", {
  ref: "Appointment",
  localField: "_id",
  foreignField: "medic",
});

export default model("Medic", medicSchema);
