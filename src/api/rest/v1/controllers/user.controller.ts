import { Request, Response } from "express";
import { findPatient } from "../services";

const getMyUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    const patientDB = await findPatient({ document: user.document });
    if (!patientDB) return res.status(404).json({ message: "Not found" });
    return res.send(patientDB);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export { getMyUser };
