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
import { RequestExt, User } from "../interfaces";
import { JwtPayload } from "jsonwebtoken";
import { handleHttpError } from "../utils";

//iniciar sesión
const loginController = async ({ body }: Request, res: Response) => {
  try {
    const { email, password } = body;

    const responseUser = await loginUser({ email, password });

    if (responseUser === "PASSWORD_INCORRECT") {
      handleHttpError(res, 403, responseUser);
    } else {
      const { accessToken, /*refreshToken,*/ user } = responseUser as {
        accessToken: string;
        refreshToken: string;
        user: User;
      };

      return res.json({ user: { email: user.email }, accessToken });
    }
  } catch (error) {
    handleHttpError(res, 500, "SERVER_ERROR");
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
      handleHttpError(res, 409, registeredUser);
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
    handleHttpError(res, 500, "SERVER_ERROR");
  }
};

const logoutController = (req: RequestExt, res: Response) => {
  try {
    delete req.user;
    return res.send({ message: "Logged out" });
  } catch (error) {
    handleHttpError(res, 500, "SERVER_ERROR");
  }
};

const refreshController = async ({ user }: RequestExt, res: Response) => {
  try {
    const foundUser = await findUser({ email: user?.id });
    if (!foundUser) handleHttpError(res, 403, "FORBIDDEN"); //Forbidden

    console.log("foundUser.email", foundUser.email);

    const decoded = (await verifyRefreshToken(
      foundUser.refreshToken
    )) as JwtPayload;

    console.log("decoded.id", decoded.id);

    if (foundUser.email !== decoded.id)
      handleHttpError(res, 403, "UNAUTHORIZED"); //Unauthorized
    const accessToken = await generateToken(foundUser.email, "access");

    return res.json({ accessToken });
  } catch (error) {
    handleHttpError(res, 500, "SERVER_ERROR");
  }
};

export {
  loginController,
  registerController,
  logoutController,
  refreshController,
};
