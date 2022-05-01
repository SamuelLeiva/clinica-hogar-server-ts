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

const getMyUser = async (req: Request, res: Response) => {
  //console.log("req.headers", req.headers);
  //console.log(req.body);

  const { email } = req.body.user;

  try {
    const user = await User.findProfile(email);

    console.log(user);

    return res.send(user);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export { getMyUser };
