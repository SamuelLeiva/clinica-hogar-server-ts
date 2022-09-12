import { Auth } from "../interfaces/auth.interface";
import UserModel from "../models/user.schema";
import { verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

const loginUser = async ({ email, password }: Auth) => {
  const checkIs = await UserModel.findOne({ email });
  if (!checkIs) return "NOT_FOUND_USER";

  const passwordHash = checkIs.password;
  const isCorrect = await verified(password, passwordHash);

  if (!isCorrect) return "PASSWORD_INCORRECT";

  const accessToken = await generateToken(checkIs.email, "access");
  const refreshToken = await generateToken(checkIs.email, "refresh");

  checkIs.refreshToken = refreshToken;
  const result = await checkIs.save();

  //mandamos los dos tokens y la info del usuario
  const data = {
    accessToken,
    refreshToken,
    user: result,
  };

  return data;
};

// const registerUser = async ()

export { loginUser };
