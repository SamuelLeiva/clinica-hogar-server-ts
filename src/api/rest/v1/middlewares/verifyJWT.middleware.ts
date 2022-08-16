import * as jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.schema";
import { findUser } from "../services";

const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader =
      req.header("authorization") || req.header("Authorization");

    if (!authHeader?.startsWith("Bearer "))
      return res.status(401).json({ message: "Unauthorized" });

    const token: string = authHeader.replace("Bearer ", "");

    let decoded: any;

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
      return res.sendStatus(403);
    }

    const user = await findUser({
      _id: decoded._id,
    });

    // const user = await User.findOne({
    //   _id: decoded._id,
    //   //aca buscar por roles cuando se agregue roles al app (ver auth con dave)
    // });

    if (!user) return res.status(401).json({ message: "Unauthorized" });

    req.body.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error server" });
  }
};

export { verifyJWT };
