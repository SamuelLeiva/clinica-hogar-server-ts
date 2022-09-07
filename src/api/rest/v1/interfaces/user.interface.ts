import { Auth } from "./auth.interface";

export interface User extends Auth {
  refreshToken?: string;
  deletedAt?: Date;
  patients?: any[];
}
