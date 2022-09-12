import { Response, NextFunction } from "express";
// import { findUser } from "../services";
import { RequestExt } from "../interfaces/req-ext.interface";
import { verifyToken } from "../utils/jwt.handle";

const checkJWT = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop();
    const isUser = (await verifyToken(`${jwt}`)) as { id: string };
    console.log("isUser", isUser);

    if (!isUser) {
      res.status(401).send("INVALID_JWT");
    } else {
      req.user = isUser;
      next();
    }
  } catch (error) {
    res.status(500).send("NOT_VALID_SESSION");
  }
};

export { checkJWT };
