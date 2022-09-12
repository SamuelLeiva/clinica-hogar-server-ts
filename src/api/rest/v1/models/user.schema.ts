import { Schema, Document, model, Model } from "mongoose";

import * as bcrypt from "bcryptjs";

declare interface IUser extends Document {
  email?: string;
  password?: string;
  refreshToken?: string;
  document?: string;
  deletedAt?: Date;
  patients?: Array<any>;
}

const userSchema: Schema = new Schema(
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

userSchema.methods.toJSON = function (this: IUser) {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.refreshToken;

  return userObject;
};

userSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password!, 8);
  }
});

const User: Model<IUser> = model("User", userSchema);

export default User;
