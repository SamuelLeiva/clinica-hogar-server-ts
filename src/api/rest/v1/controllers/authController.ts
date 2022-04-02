import { Request, Response } from "express";

import logging from "../../../../config/logging";
import { generateAuthToken } from "../helpers";
import User from "../model/User";

const NAMESPACE = "Auth Controller";

//iniciar sesión
const signIn = async (req: Request, res: Response) => {
  try {
    //encontrar al user por email y password
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );

    //creamos el token
    const token = await generateAuthToken(user);
    //const token = await user.generateAuthToken();

    res.send({ user, token });
  } catch (error) {
    logging.error(NAMESPACE, "Sign In error");
    res.status(400).send(error);
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
    logging.error(NAMESPACE, "Sign Up error");
    res.status(400).send(error);
  }
};

export { signIn, signUp };
