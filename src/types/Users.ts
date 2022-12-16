import { Role } from "./Role";

export interface User {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  mobilePhone: string;
}
