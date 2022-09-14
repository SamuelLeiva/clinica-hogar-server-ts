import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { RequestExt } from "../interfaces";
import { findPatient } from "../services";
import { handleHttpError } from "../utils/error.handle";

const getMyUser = async (req: RequestExt, res: Response) => {
  try {
    const user = req.user as JwtPayload;
    const patientDB = await findPatient({ email: user.id });
    if (!patientDB) handleHttpError(res, 404, "USER_NOT_FOUND");
    res.send(patientDB);
  } catch (error) {
    handleHttpError(res, 500, "SERVER_ERROR");
  }
};

export { getMyUser };
