import { Schema, Document, model, Model } from "mongoose";

import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
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
  findProfile: (email: string) => any;
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

//metodo que oculta la info privada. En todas las rutas
//que devolvamos un user, se ocultará la información
userSchema.methods.toJSON = function (this: IUserDocument) {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;
  //delete userObject.avatar;

  return userObject;
};

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

export default model<IUser, IUserModel>("User", userSchema);
