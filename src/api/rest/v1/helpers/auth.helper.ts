import * as jwt from "jsonwebtoken";

const generateAuthToken = async (user: any, tokenType: string) => {
  let token = "";
  if (tokenType === "access") {
    token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET!, {
      expiresIn: "12h",
    });
  } else if (tokenType === "refresh") {
    token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_REFRESH_TOKEN_SECRET!,
      { expiresIn: "1d" }
    );
  }

  return token;
};

export { generateAuthToken };
