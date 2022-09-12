export interface Patient {
  firstName: string;
  lastNameF: string;
  lastNameM: string;
  email: string;
  birthday: Date;
  documentType: string;
  document: string;
  phoneNumber: string;
  sex: string;
  users: any[];
  appointments: any[];
}
