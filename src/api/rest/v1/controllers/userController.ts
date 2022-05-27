import { Request, Response } from "express";
import Patient from "../model/Patient";

const getMyUser = async (req: Request, res: Response) => {
  const user = req.body.user;

  try {
    //buscar por documento al paciente
    const patientDB = await Patient.findOne({ document: user.document });

    console.log("user", user);

    // const user = await User.findProfile(email);
    // if (!user) return res.sendStatus(401);

    return res.send(patientDB);
  } catch (error) {
    return res.sendStatus(500);
  }
};

export { getMyUser };
