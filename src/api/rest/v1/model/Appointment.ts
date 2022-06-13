import { model, Model, Schema } from "mongoose";

interface IAppointment {
  date: Date;
  medic?: any;
  patient?: any;
  appointmentType?: string;
}

interface IAppointmentDocument extends IAppointment, Document {
  //methods
}

interface IAppointmentModel extends Model<IAppointmentDocument> {
  //statics
  findByPatient: (id: string) => any;
}

const appointmentSchema: Schema<IAppointmentDocument> = new Schema(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    appointmentType: {
      type: String,
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

const appointment = model<IAppointmentDocument, IAppointmentModel>(
  "Appointment",
  appointmentSchema
);

export default appointment;
