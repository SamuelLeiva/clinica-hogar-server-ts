import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import { generateAuthToken } from "../helpers";
import Patient from "../model/Patient";

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
  const accessToken = await generateAuthToken(foundUser, "access");
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

  //console.log("galleta", galleta);

  console.log("result", result);
  console.log("accessToken", accessToken);

  // Send authorization roles and access token to user
  res.json({ result, accessToken });
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
    sex,
    documentType,
    birthday,
    phoneNumber,
  } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const duplicate = await User.findOne({ email });
  if (duplicate) return res.sendStatus(409); //Conflict

  const duplicatePatient = await Patient.findOne({ document });

  let user;
  let userDB;
  try {
    if (duplicatePatient) {
      //conectamos al paciente y creamos
      user = new User({
        email,
        password,
        document,
        patients: [duplicatePatient._id],
      });
      const userDB = await user.save();

      //actualizamos el paciente
      await Patient.updateOne(
        { _id: duplicatePatient._id },
        { $push: { users: userDB._id } }
      );
    } else {
      //creamos el paciente
      const patient = new Patient({
        firstName,
        lastNameF,
        lastNameM,
        document,
        documentType,
        sex,
        birthday,
        phoneNumber,
      });

      const patientDB = await patient.save();

      user = new User({
        email,
        password,
        document,
        patients: [patientDB._id],
      });
      userDB = await user.save();

      //actualizamos el paciente
      await Patient.updateOne(
        { _id: patientDB._id },
        { $push: { users: userDB._id } }
      );
    }
    return res.status(201).send(userDB);
  } catch (error: any) {
    console.log(error);

    res.status(500).json({ message: error.message });
  }
};

//refresh token
const refresh = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  console.log("cookies", cookies);
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken });
  console.log("foundUser", foundUser);
  if (!foundUser) return res.sendStatus(403); //Forbidden

  // evaluate refresh jwt
  let decoded: any;

  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET!);
    console.log(decoded);
  } catch (error) {
    return res.sendStatus(403);
  }

  if (foundUser._id.toString() !== decoded._id) return res.sendStatus(403); //Unauthorized

  // jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET!, (err: any, decoded: any) => {
  //   if (err || foundUser.username! !== decoded.username)
  //     return res.sendStatus(403);

  const accessToken = await generateAuthToken(foundUser, "access");
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
  console.log("accessToken", accessToken);
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
