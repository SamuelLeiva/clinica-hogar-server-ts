import { UserModel } from "../models";

const findAllUsers = async () => {
  const allUsers = await UserModel.find();
  return allUsers;
};

//TODO: cambiar any por una interface luego
const findUser = async (props: any) => {
  const user = await UserModel.findOne({ ...props });
  return user;
};

const saveUser = async (props: any) => {
  const user = UserModel.create({ ...props });
  return user;
};

const updateUser = async (id: string, props: any) => {
  const user = await UserModel.findOneAndUpdate(
    { _id: id },
    {
      ...props,
    },
    {
      new: true,
    }
  );
  return user;
};

const updateUserPatient = async (idUser: string, idPatient: string) => {
  await UserModel.updateOne(
    { _id: idUser },
    { $push: { patients: idPatient } }
  );
};

export { findAllUsers, findUser, saveUser, updateUser, updateUserPatient };
