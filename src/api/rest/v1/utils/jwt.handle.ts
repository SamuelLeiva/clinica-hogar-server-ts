import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = <string>process.env.JWT_SECRET || "token.secret.0102";
const JWT_REFRESH_SECRET =
  <string>process.env.JWT_REFRESH_SECRET || "token.refresh.secret.119815";

const generateToken = async (id: string, tokenType: "access" | "refresh") => {
  let jwt = "";
  if (tokenType === "access") {
    jwt = sign({ id }, JWT_SECRET, {
      expiresIn: "12h",
    });
  } else if (tokenType === "refresh") {
    jwt = sign({ id }, JWT_REFRESH_SECRET, {
      expiresIn: "1d",
    });
  }

  return jwt;
};

const verifyToken = async (jwt: string) => {
  const isOk = await verify(jwt, JWT_SECRET);
  return isOk;
};

const verifyRefreshToken = async (jwt: string) => {
  const isOk = await verify(jwt, JWT_REFRESH_SECRET);
  return isOk;
};

export { generateToken, verifyToken, verifyRefreshToken };
