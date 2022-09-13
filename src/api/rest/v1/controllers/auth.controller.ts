import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import { generateToken } from "../utils/jwt.handle";

import {
  findPatient,
  findUser,
  loginUser,
  registerUser,
  savePatient,
  updatePatientUser,
  updateUser,
  updateUserPatient,
} from "../services";
import { RequestExt } from "../interfaces/req-ext.interface";

//iniciar sesión
const loginController = async ({ body }: Request, res: Response) => {
  try {
    const { email, password } = body;

    const responseUser = await loginUser({ email, password });

    if (responseUser === "PASSWORD_INCORRECT") {
      res.status(403).json({ message: responseUser });
    } else {
      //TODO: hacer una interfaz de la respuesta pa que no de error
      const { accessToken, refreshToken, user } = responseUser as {
        accessToken: string;
        refreshToken: string;
        user: any;
      };
      // Creates Secure Cookie with refresh token
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000,
      });

      // TODO: Send authorization roles (medico y user normal)
      // Send access token and user
      // TODO: check if is necessary sending the entire user
      return res.json({ user, accessToken });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

//registrarse
const registerController = async ({ body }: Request, res: Response) => {
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
    } = body;

    const registeredUser = await registerUser({ email, password });

    if (registeredUser === "ALREADY_USER") {
      return res.status(409).json({ message: registeredUser });
    }

    const duplicatePatient = await findPatient({ email });

    console.log("duplicatePatient", duplicatePatient);

    if (duplicatePatient) {
      //actualizamos el paciente
      await updatePatientUser(duplicatePatient._id, registeredUser._id);

      //actualizamos el usuario
      await updateUserPatient(registeredUser._id, duplicatePatient._id);
    } else {
      console.log("Entramos a crear el paciente");

      //creamos el paciente y lo conectamos
      const patientDB = await savePatient({
        firstName,
        lastNameF,
        lastNameM,
        email,
        document,
        documentType,
        sex,
        birthday,
        phoneNumber,
      });

      console.log("Conectamos el paciente");

      //actualizamos el paciente
      await updatePatientUser(patientDB._id, registeredUser._id);

      //actualizamos el usuario
      await updateUserPatient(registeredUser._id, patientDB._id);
    }

    return res
      .status(201)
      .send({ message: "Register succesful", user: registeredUser });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const logoutController = (req: RequestExt, res: Response) => {};

const refreshController = (req: RequestExt, res: Response) => {};

//usando cookies
//refresh token
// const refresh = async (req: Request, res: Response) => {
//   const cookies = req.cookies;

//   if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });
//   const refreshToken = cookies.jwt;

//   const foundUser = await findUser({ refreshToken });

//   if (!foundUser) return res.status(403).json({ message: "Forbidden" }); //Forbidden

//   // evaluate refresh jwt
//   let decoded: any;

//   decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET!);

//   if (foundUser._id.toString() !== decoded._id)
//     return res.status(403).json({ message: "Unauthorized" }); //Unauthorized

//   const accessToken = await generateToken(foundUser, "access");

//   res.json({ foundUser, accessToken });
// };

// //TODO: verificar que funcione el logout desde postman. Configurar cookies en postman
// const logoutController = async (req: Request, res: Response) => {
//   // On client, also delete the accessToken
//   const cookies = req.cookies;

//   console.log("cookies", cookies);

//   if (!cookies?.jwt) return res.status(204).json({ message: "No content" }); //No content
//   const refreshToken = cookies.jwt;

//   // Is refreshToken in db?
//   const foundUser = await findUser({ refreshToken });

//   if (!foundUser) {
//     res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
//     return res.status(204).json({ message: "No content" });
//   }

//   // Delete refreshToken in db
//   await updateUser(foundUser._id, { refreshToken: "" });
//   res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
//   res.status(204).json({ message: "Logged out" });
// };

export {
  loginController,
  registerController,
  logoutController,
  refreshController,
};
