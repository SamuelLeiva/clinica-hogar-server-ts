import { Response, NextFunction } from "express";
import { RequestExt } from "../interfaces";
import { verifyToken } from "../utils";

const checkJWT = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop();
    const isUser = (await verifyToken(`${jwt}`)) as { id: string };

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
