import { Schema, Document, model, Model } from "mongoose";

import validator from "validator";

interface IUser {
  //_id?: ObjectId;
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  tokens?: Array<string>;

  //static
  //findOne(): Promise<this>;
}

interface IUserDocument extends IUser, Document {
  //methods
  generateAuthToken: () => any;
}

interface IUserModel extends Model<IUserModel> {
  //statics
  findByCredentials: (email: string, password: string) => any;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
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
    document: {
      type: String,
      required: true,
      trim: true,
    },

    birthday: {
      type: Date,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

//relacion con citas
userSchema.virtual("appointments", {
  ref: "Appointment",
  localField: "_id",
  foreignField: "patient",
});

export default model<IUser, IUserModel>("User", userSchema);
