import { AccountBank } from "./AccountBank";

export interface Bank {
  id?: string;
  bankName: string;
  branch: string;
  address: string;
  phone: string;
  fax: string;
  code: string;
  notes?: string;
  account?: AccountBank[];
  createdAt?: string;
}
