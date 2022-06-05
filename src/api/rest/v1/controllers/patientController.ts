import { Request, Response } from "express";

const getPatientsByUser = async (req: Request, res: Response) => {
  const user = await req.body.user.populate("patients");
  console.log("user", user);
  //obtener los patients de un usuario y llamar a cada uno sus citas
  //   let patients: any = await Patient.find({
  //     _id: { $in: user.patients },
  //   });

  return res.send(user.patients);
};

export { getPatientsByUser };
