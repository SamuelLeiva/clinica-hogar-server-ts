import { Request, Response } from "express";
import Patient from "../model/Patient";

const getMyUser = async (req: Request, res: Response) => {
  const user = req.body.user;

  try {
    const patientDB = await Patient.findOne({ document: user.document });

    return res.send(patientDB);
  } catch (error) {
    return res.sendStatus(500);
  }
};

export { getMyUser };
