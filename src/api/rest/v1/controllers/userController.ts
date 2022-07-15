import { Request, Response } from "express";
import Patient from "../model/Patient";

const getMyUser = async (req: Request, res: Response) => {
  try {
    const user = req.body.user;
    const patientDB = await Patient.findOne({ document: user.document });
    if (!patientDB) return res.status(404).json({ message: "Not found" });
    return res.send(patientDB);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export { getMyUser };
