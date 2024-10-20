export interface UserState {
  user: User | null;
  error: string | null;
  isAuthenticated: boolean;
}

export interface User {
  _id: string | null;
  fullName: string;
  email: string;
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
