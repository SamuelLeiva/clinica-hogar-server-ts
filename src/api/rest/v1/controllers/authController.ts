import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import { generateAuthToken } from "../helpers";

import User from "../model/User";

const NAMESPACE = "Auth Controller";

//iniciar sesión
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findByCredentials(email, password);
  if (!foundUser) return res.sendStatus(401); //Unauthorized

  // create JWTs
  const accessToken = await generateAuthToken(foundUser);
  const refreshToken = await generateAuthToken(foundUser, "refresh");

  foundUser.refreshToken = refreshToken;
  const result = await foundUser.save();

  // Creates Secure Cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 24 * 60 * 60 * 1000,
  });

  console.log('result', result);
  console.log('accessToken', accessToken);
  

  // Send authorization roles and access token to user
  res.json({ result, accessToken });

  // if (!userEmail || !password)
  //   return res
  //     .status(400)
  //     .json({ message: "Username and password are required." });

  // // try {
  // //encontrar al user por email y password
  // const user = await User.findByCredentials(userEmail, password);

  // console.log("user", user);

  // if (!user) return res.sendStatus(401); //Unauthorized

  // //creamos el token
  // const token = await generateAuthToken(user);

  // //creamos refresh token
  // const refreshToken = res.send({ user, token });
  // // } catch (error) {
  // //   console.log(error);
  // //   return res.status(400).send(error); //error
  // // }
};

//registrarse
const register = async (req: Request, res: Response) => {
  //destructurar
  const {
    email,
    password,
    firstName,
    lastNameF,
    lastNameM,
    document,
    birthday,
    phoneNumber,
  } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const duplicate = await User.findOne({ email });
  if (duplicate) return res.sendStatus(409); //Conflict

  try {
    const user = new User({
      email,
      password,
      firstName,
      lastNameF,
      lastNameM,
      document,
      birthday,
      phoneNumber,
      refreshToken: ""
    });
    await user.save();

    res.status(201).json({ success: `New user ${user} created!` });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }

  // const user = new User(req.body);

  // console.log("user", user);

  // try {
  //   await user.save();
  //   const token = await generateAuthToken(user);

  //   res.status(201).send({ user, token });
  // } catch (error) {
  //   res.status(400).send(error);
  // }
};

//refresh token
const refresh = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  console.log('cookies', cookies)
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken });
  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  // jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET!, (err, decoded) => {
  //   if (err || foundUser.username! !== decoded.username)
  //     return res.sendStatus(403);

    const accessToken = generateAuthToken(foundUser);
    // const accessToken = jwt.sign(
    //   {
    //     UserInfo: {
    //       username: decoded.username,
    //       roles: roles,
    //     },
    //   },
    //   process.env.ACCESS_TOKEN_SECRET,
    //   { expiresIn: "10s" }
    // );
    res.json({ foundUser, accessToken });
};

const logout = async (req: Request, res: Response) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser: any = await User.findOne({ refreshToken });

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.sendStatus(204);

  // try {
  //   console.log("req.headers", req.headers);
  //   console.log("req.body", req.body);

  //   req.body.user.tokens = req.body.user.tokens.filter((token: any) => {
  //     return token.token !== req.body.token;
  //   });
  //   await req.body.user.save();

  //   res.send({ msg: "Success in logout" });
  // } catch (error) {
  //   res.status(500).send(error);
  // }
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

export { login, register, logout, logoutAll, refresh };
