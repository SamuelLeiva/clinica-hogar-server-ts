import { Response, NextFunction } from "express";
import { RequestExt } from "../interfaces";
import { verifyToken } from "../utils";
import { handleHttpError } from "../utils/error.handle";

const checkJWT = async (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop();
    const isUser = (await verifyToken(`${jwt}`)) as { id: string };

    if (!isUser) {
      //res.status(401).send("INVALID_JWT");
      handleHttpError(res, 401, "INVALID_JWT");
    } else {
      req.user = isUser;
      next();
    }
  } catch (error) {
    handleHttpError(res, 500, "NOT_VALID_SESSION");
  }
};

export { checkJWT };
