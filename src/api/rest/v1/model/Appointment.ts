import { model, Model, Schema } from "mongoose";

interface IAppointment {
  date: Date;
}

interface IAppointmentDocument extends IAppointment, Document {
  //methods
  //generateAuthToken: () => any;
}

interface IAppointmentModel extends Model<IAppointmentModel> {
  //statics
  findByPatient: (id: string) => any;
}

const appointmentSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Patient",
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

appointmentSchema.static(
  "findByPatient",
  async function findByPatient(id: string) {
    const appointments: any = await this.find({ patient: id }).populate({
      path: "medic",
      populate: { path: "speciality" },
    });

    console.log("appointments", appointments);

    if (!appointments) {
      return null;
    }

    return appointments;
  }
);

export default model<IAppointment, IAppointmentModel>(
  "Appointment",
  appointmentSchema
);
