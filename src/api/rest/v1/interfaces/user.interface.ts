import { Auth } from "./auth.interface";

export interface User extends Auth {
  _id?: string;
  refreshToken?: string;
  deletedAt?: Date;
  patients?: any[];
  createdAt?: string;
  updatedAt?: string;
}
