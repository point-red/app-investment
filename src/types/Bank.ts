import { AccountBank } from "./AccountBank";

export interface Bank {
  _id?: string;
  name: string;
  branch: string;
  address: string;
  phone: string;
  fax: string;
  code: string;
  notes: string;
  accounts: AccountBank[];
  createdAt?: string;
}

export interface BankValidationErrors {
  name: string[];
  accounts: string[];
}
