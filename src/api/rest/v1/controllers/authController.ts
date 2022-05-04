import { Request, Response } from "express";

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
const register = async (req: Request, res: Response) => {
  const user = new User(req.body);

  console.log("user", user);

  try {
    await user.save();
    const token = await generateAuthToken(user);

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    console.log("req.headers", req.headers);
    console.log("req.body", req.body);

    req.body.user.tokens = req.body.user.tokens.filter((token: any) => {
      return token.token !== req.body.token;
    });
    await req.body.user.save();

    res.send({ msg: "Success in logout" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const logoutAll = async (req: Request, res: Response) => {
  try {
    req.body.user.tokens = [];
    await req.body.user.save();
    res.send({ msg: "Success in logging out all." });
  } catch (error) {
    res.status(500).send(error);
  }
};

export { login, register, logout, logoutAll };
