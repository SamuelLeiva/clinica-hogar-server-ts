import * as jwt from "jsonwebtoken";

const generateAuthToken = async (user: any, tokenType: string = "access") => {
  const token =
    tokenType === "access"
      ? jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET!, {
          expiresIn: "60s",
        })
      : jwt.sign(
          { _id: user._id.toString() },
          process.env.JWT_REFRESH_TOKEN_SECRET!,
          { expiresIn: "1d" }
        );

  // user.tokens = user.tokens.concat({ token });

  // await user.save();

  return token;
};

export { generateAuthToken };
