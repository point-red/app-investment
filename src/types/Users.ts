import { Role } from "./Role";

export interface User {
  _id?: string;
  username: string;
  email: string;
  name: string;
  // lastName: string;
  role_id: string;
  // mobilePhone: string;
}
