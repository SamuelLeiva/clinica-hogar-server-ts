import { Request, Response } from "express";

const getMyUser = async (req: Request, res: Response) => {
  const user = req.body.user;

  console.log("user", user);

  // const user = await User.findProfile(email);
  // if (!user) return res.sendStatus(401);

  return res.send(user);
};

export { getMyUser };
