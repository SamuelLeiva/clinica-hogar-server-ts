export interface IndexPatient {
  _id?: string;
  email?: string;
  document?: string;
  users?: any[];
}

export interface Patient extends IndexPatient {
  firstName?: string;
  lastNameF?: string;
  lastNameM?: string;
  birthday?: Date;
  documentType?: string;
  phoneNumber?: string;
  sex?: string;
  appointments?: any[];
}
