import { Schema, Document, model, Model } from "mongoose";
import { User } from "../interfaces/user.interface";

// import * as bcrypt from "bcryptjs";

// declare interface IUser extends Document {
//   email?: string;
//   password?: string;
//   refreshToken?: string;
//   document?: string;
//   deletedAt?: Date;
//   patients?: Array<any>;
// }

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
        ref: "Patient",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

//esto tambien
// userSchema.methods.toJSON = function (this: User) {
//   const user = this;
//   const userObject = user.toObject();

//   delete userObject.password;
//   delete userObject.refreshToken;

//   return userObject;
// };

// //cambiar esto
// userSchema.pre<IUser>("save", async function (next) {
//   const user = this;
//   if (user.isModified("password")) {
//     user.password = await bcrypt.hash(user.password!, 8);
//   }
// });

const UserModel = model("users", UserSchema);

export default UserModel;
