import * as jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import logging from "../../../../config/logging";
import User from "../model/User";

const NAMESPACE = "Auth middlewares";

//extraer token de localStorage
const authToken = async (req: Request, res: Response, next: NextFunction) => {
  //logging.info(NAMESPACE, "Auth token middlewares");
  console.log("req.headers", req.headers);
  try {
    const token: string = req.header("authorization")!.replace("Bearer ", "");
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

    req.body.token = token;
    req.body.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please log in the app." });
  }
};

export { authToken };
