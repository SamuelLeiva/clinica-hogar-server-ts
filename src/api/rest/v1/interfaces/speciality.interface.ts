export interface IndexSpeciality {
  _id?: string;
  name?: string;
}

export interface Speciality extends IndexSpeciality {
  appointmentCost: number;
}
