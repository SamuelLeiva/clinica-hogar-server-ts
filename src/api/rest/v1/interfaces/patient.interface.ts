export interface Patient {
  firstName: string;
  lastNameF: string;
  lastNameM: string;
  birthday: Date;
  documentType: string;
  document: string;
  phoneNumber: string;
  sex: string;
  deletedAt: Date;
  users: any[];
  appointments: any[];
}
