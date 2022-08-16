import { User } from "../models";

const getAllUsers = async () => {
  const allUsers = await User.find();
  return allUsers;
};

//cambiar any por una interface luego
//las validaciones se haran con express-validator antes
const findUser = async (props: any) => {
  const user = User.findOne({ ...props });
  return user;
};

export { getAllUsers, findUser };
