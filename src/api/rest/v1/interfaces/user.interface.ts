import { Auth } from "./auth.interface";

export interface User extends Auth {
  document: string;
  refreshToken: string;
  deletedAt: Date;
  patients: any[];
}
