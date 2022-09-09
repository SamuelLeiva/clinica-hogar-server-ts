import { Request, Response } from "express";
import {
  findAllMedics,
  findMedic,
  findMedicsBySpeciality,
  saveMedic,
  updateMedic,
} from "../services";

const getAllMedics = async (req: Request, res: Response) => {
  try {
    let medics = (await findAllMedics()).map((medic) => {
      medic.schedule = [];
      return medic;
    }); //depende de los casos de uso si queremos mostrar el schedule
    // medics = medics.map((medic) => {
    //   //TODO: averiguar si este sanitizer se puede separar y reusar
    //   medic.schedule = [];
    //   return medic;
    // });
    res.send(medics);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//TODO: ver si se puede hacer validaciones a los params y si es seguro pasar por ahi data
const getMedic = async (req: Request, res: Response) => {
  try {
    const medic = await findMedic({ _id: req.params.id });

    if (!medic) {
      return res.status(404).json({ message: "Not found" });
    }

    res.send(medic);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const postMedic = async (req: Request, res: Response) => {
  try {
    const { firstName, lastNameF, lastNameM, speciality } = req.body;
    console.log("firstName", firstName);
    const medic = await saveMedic({
      firstName,
      lastNameF,
      lastNameM,
      speciality,
    });
    res.status(201).send(medic);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const putMedic = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const { firstName, lastNameF, lastNameM, schedule } = req.body;

    const medic = await updateMedic(id, {
      firstName,
      lastNameF,
      lastNameM,
      schedule,
    });

    if (!medic) return res.status(404).json({ message: "Not found" });

    res.status(201).send({ medic, message: "Medico actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

//TODO: aca ver para devolver medics sin schedule
const getMedicsBySpeciality = async (req: Request, res: Response) => {
  try {
    const medics = (await findMedicsBySpeciality(req.params.idSpe)).map(
      (medic) => {
        medic.schedule = [];
        return medic;
      }
    );

    res.send(medics);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export { getAllMedics, getMedic, postMedic, getMedicsBySpeciality, putMedic };
