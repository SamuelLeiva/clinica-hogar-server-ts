import { User } from "../models";

const findAllUsers = async () => {
  const allUsers = await User.find();
  return allUsers;
};

//cambiar any por una interface luego
//las validaciones se haran con express-validator antes
const findUser = async (props: any) => {
  const user = User.findOne({ ...props });
  return user;
};

const saveUser = async (props: any) => {
  const user = new User({ ...props });
  const userDB = await user.save();
  return userDB;
};

const updateUser = async (id: string, props: any) => {
  const user = await User.findOneAndUpdate(
    { _id: id },
    {
      ...props,
    }
  );
  return user;
};

const updateUserPatient = async (idUser: string, idPatient: string) => {
  await User.updateOne({ _id: idUser }, { $push: { patients: idPatient } });
};

export { findAllUsers, findUser, saveUser, updateUser, updateUserPatient };
