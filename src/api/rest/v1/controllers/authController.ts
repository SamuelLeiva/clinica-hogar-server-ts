import { Request, Response } from "express";

import logging from "../../../../config/logging";
import { generateAuthToken } from "../helpers";
import User from "../model/User";

const NAMESPACE = "Auth Controller";

//iniciar sesión
const login = async (req: Request, res: Response) => {
  console.log(req.body);

  const { userEmail, password } = req.body;

  if (!userEmail || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  try {
    //encontrar al user por email y password
    const user = await User.findByCredentials(userEmail, password);

    console.log("user", user);

    if (!user) return res.sendStatus(401); //Unauthorized

    //creamos el token
    const token = await generateAuthToken(user);

    res.send({ user, token });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error); //error
  }
};

//registrarse
const signUp = async (req: Request, res: Response) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await generateAuthToken(user);

    res.status(201).send({ user, token });
  } catch (error) {
    //logging.error(NAMESPACE, "Sign Up error");
    res.status(400).send(error);
  }
};

export { login, signUp };
