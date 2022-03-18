import * as jwt from "jsonwebtoken";

import { Response, NextFunction } from "express";
import logging from "../../../../config/logging";
import User from "../model/User";

const NAMESPACE = "Auth middlewares";

const authToken = async (req: any, res: Response, next: NextFunction) => {
  logging.info(NAMESPACE, "Auth token middlewares");
  try {
    const token: string = req.header("Authorization").replace("Bearer ", "");
    console.log(token);

    const decoded: any = jwt.verify(token!, process.env.JWT_SECRET!);

    console.log(decoded);

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    console.log(user);

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export { authToken };
