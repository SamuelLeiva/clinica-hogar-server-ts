import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

import { generateAuthToken } from "../helpers";

import Patient from "../model/Patient";
import User from "../model/User";

//iniciar sesión
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    //trasladarlo a express validator despues
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Username and password are required." });

    const foundUser = await User.findOne({ email });

    if (!foundUser) return res.status(401).json({ message: "Unauthorized" }); //Unauthorized

    const isMatch = await bcrypt.compare(password, foundUser.password!);

    if (!isMatch) return res.status(401).json({ message: "Unauthorized" }); //Unauthorized

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

    // Send authorization roles and access token to user
    return res.json({ result, accessToken });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

//registrarse
const register = async (req: Request, res: Response) => {
  try {
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
    if (duplicate) return res.status(409).json({ message: "Conflict" }); //Conflict

    const duplicatePatient = await Patient.findOne({ document });

    let user;
    let userDB;

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
    return res
      .status(201)
      .send({ message: "Register succesful", user: userDB });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//refresh token
const refresh = async (req: Request, res: Response) => {
  // try {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken: refreshToken });

  if (!foundUser) return res.status(403).json({ message: "Forbidden" }); //Forbidden

  // evaluate refresh jwt
  let decoded: any;

  decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET!);

  if (foundUser._id.toString() !== decoded._id)
    return res.status(403).json({ message: "Unauthorized" }); //Unauthorized

  const accessToken = await generateAuthToken(foundUser, "access");

  res.json({ foundUser, accessToken });
  // } catch (error) {
  //   res.status(500).json({ message: "Server error" });
  // }
};

const logout = async (req: Request, res: Response) => {
  // On client, also delete the accessToken
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(204).json({ message: "No content" }); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken });

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
    return res.status(204).json({ message: "No content" });
  }

  // Delete refreshToken in db
  foundUser.refreshToken = "";
  const result = await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  //res.send({ messge: "Cleaned cookie." }).status(204);
  res.status(204).json({ message: "Logged out" });
};

const logoutAll = async (req: Request, res: Response) => {
  try {
    req.body.user.tokens = [];
    await req.body.user.save();
    res.json({ message: "Success in logging out all." });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { login, register, logout, logoutAll, refresh };
