import { Response } from "express";
import { StatusCode } from "../types/status.type";

const handleHttpError = (
  res: Response,
  status: StatusCode,
  error: string,
  errorRaw?: any
) => {
  console.log("errorRaw", errorRaw);
  res.status(status);
  res.send({ message: error });
};

export { handleHttpError };
