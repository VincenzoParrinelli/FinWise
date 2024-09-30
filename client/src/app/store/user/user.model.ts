export interface User {
  _id: string | null;
  fullName: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
}

export interface NewUserFormData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  dateOfBirth: string;
}
