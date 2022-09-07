import { Auth } from "./auth.interface";

export interface RegisterUser extends Auth {
  firstName: string;
  lastNameF: string;
  lastNameM: string;
  birthday: Date;
  documentType: string;
  document: string;
  phoneNumber: string;
  sex: string;
}
