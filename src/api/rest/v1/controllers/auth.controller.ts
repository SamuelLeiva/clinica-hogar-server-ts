import { Request, Response } from "express";
import { generateToken, verifyRefreshToken } from "../utils";

import {
  findPatient,
  findUser,
  loginUser,
  registerUser,
  savePatient,
  updatePatientUser,
  updateUserPatient,
} from "../services";
import { RequestExt } from "../interfaces";
import { JwtPayload } from "jsonwebtoken";

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
      // res.cookie("jwt", refreshToken, {
      //   httpOnly: true,
      //   secure: true,
      //   sameSite: "none",
      //   maxAge: 24 * 60 * 60 * 1000,
      // });

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

    if (duplicatePatient) {
      //actualizamos el paciente
      await updatePatientUser(duplicatePatient._id, registeredUser._id);

      //actualizamos el usuario
      await updateUserPatient(registeredUser._id, duplicatePatient._id);
    } else {
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

const logoutController = (req: RequestExt, res: Response) => {
  try {
    delete req.user;
    return res.send({ message: "Logged out" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const refreshController = async ({ user }: RequestExt, res: Response) => {
  try {
    const foundUser = await findUser({ email: user?.id });
    if (!foundUser) return res.status(403).json({ message: "FORBIDDEN" }); //Forbidden

    const decoded = (await verifyRefreshToken(
      foundUser.refreshToken
    )) as JwtPayload;

    if (foundUser.email !== decoded.id)
      return res.status(403).json({ message: "Unauthorized" }); //Unauthorized
    const accessToken = await generateToken(foundUser, "access");

    return res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export {
  loginController,
  registerController,
  logoutController,
  refreshController,
};
