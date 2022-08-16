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

export { findAllUsers, findUser };
