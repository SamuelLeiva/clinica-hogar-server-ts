import * as jwt from "jsonwebtoken";

const generateAuthToken = async (user: any) => {
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET!);

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

export { generateAuthToken };
