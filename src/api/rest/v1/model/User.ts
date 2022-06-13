import { Schema, Document, model, Model } from "mongoose";

import * as bcrypt from "bcryptjs";
import validator from "validator";
import Patient from "./Patient";
import mongoose from "mongoose";

interface IUser {
  email?: string;
  password?: string;
  refreshToken?: string;
  document?: string;
  deletedAt?: Date;
  patients?: Array<any>;
}

export interface IUserDocument extends IUser, Document {
  //methods
  setPatient: (patientId: string) => Promise<void>;
}

interface IUserModel extends Model<IUserDocument> {
  //statics query methods
  findProfile: (email: string) => any;
  findByCredentials: (email: string, password: string) => any;
}

const userSchema: Schema<IUserDocument> = new Schema(
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
    document: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: "",
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    patients: [
      {
        type: Schema.Types.ObjectId,
        ref: "Patient",
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.static(
  "findByCredentials",
  async function findByCredentials(email: string, password: string) {
    const user = await this.findOne({ email });

    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password!);

    if (!isMatch) {
      return null;
    }

    return user;
  }
);

userSchema.static("findProfile", async function findProfile(email: string) {
  const user = await this.findOne({ email });

  if (!user) {
    return null;
  }

  return user;
});

//hides private info in the responses
userSchema.methods.toJSON = function (this: IUserDocument) {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.refreshToken;

  return userObject;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password!, 8);
  }
});

const User = model<IUserDocument, IUserModel>("User", userSchema);

export default User;
