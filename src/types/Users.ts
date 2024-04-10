import { Role } from "./Role";

export interface User {
  _id?: string;
  username: string;
  email: string;
  name: string;
  lastname: string;
  role_id: string;
  mobilephone: string;
  role?: Role;
}

export interface UserForm {
  _id?: string;
  username: string;
  name: string;
}
