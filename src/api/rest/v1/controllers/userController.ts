import { Request, Response } from "express";
import User from "../model/User";

// const postUser = async (req: Request, res: Response) => {
//   const user = new User({
//     ...req.body,
//   });

//   try {
//     await user.save();
//     await res.status(201).send(user);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

const getMyUser = async (req: any, res: Response) => {
  res.send(req.user);
};

export { getMyUser };
