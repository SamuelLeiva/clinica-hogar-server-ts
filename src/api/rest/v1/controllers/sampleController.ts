import { Request, Response } from "express";

const NAMESPACE = "Sample Controller";

const sample = async (req: Request, res: Response) => {
  console.log("Sample route");
};

export { sample };
