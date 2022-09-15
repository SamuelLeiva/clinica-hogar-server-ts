import { Schema, Document, model, Model } from "mongoose";
import { User } from "../interfaces";

const UserSchema: Schema = new Schema<User>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: "",
    },
    deletedAt: {
      type: Date,
    },
    patients: [
      {
        type: Schema.Types.ObjectId,
        ref: "patients",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel = model("users", UserSchema);

export default UserModel;
