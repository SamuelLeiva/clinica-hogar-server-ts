import { Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { RequestExt } from "../interfaces/req-ext.interface";
import { findPatient } from "../services";

const getMyUser = async (req: RequestExt, res: Response) => {
  try {
    const user = req.user as JwtPayload;
    console.log("user", user.id);
    const patientDB = await findPatient({ email: user.id });
    console.log("patientDB", patientDB);
    if (!patientDB) return res.status(404).json({ message: "Not found" });
    return res.send(patientDB);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export { getMyUser };
