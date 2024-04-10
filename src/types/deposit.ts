import { UserForm } from "@/types/Users";

export interface DepositForm {
  _id?: string;
  date: string;
  bilyetNumber: string;
  bank_id: string;
  accountNumber: number;
  owner_id: string;
  baseDate: number;
  tenor: number;
  dueDate?: string;
  isRollOver: boolean;
  amount: number;
  remaining?: number;
  sourceBank_id: string;
  sourceAccountNumber: number;
  recipientBank_id: string;
  recipientAccountNumber: number;
  paymentMethod: string;
  interestRate: number;
  baseInterest?: number;
  grossInterest?: number;
  taxRate: number;
  taxAmount?: number;
  netInterest?: number;
  isCashback: boolean;
  note?: string;
  interests?: DepositReturn[];
  cashbacks?: DepositCashback[];
}

export interface Deposit {
  _id?: string;
  date: string;
  bilyetNumber: string;
  number?: string;
  bank: DepositBank;
  owner: DepositOwner;
  baseDate: number;
  tenor: number;
  dueDate?: string;
  isRollOver: boolean;
  amount: number;
  remaining?: number;
  sourceBank: DepositBank;
  recipientBank: DepositBank;
  paymentMethod: string;
  interestRate: number;
  baseInterest?: number;
  grossInterest?: number;
  taxRate: number;
  taxAmount?: number;
  netInterest?: number;
  isCashback: boolean;
  note?: string;
  formStatus?: string;
  returns?: DepositReturn[];
  cashbacks?: DepositCashback[];
  createdBy?: UserForm;
  createdAt?: string;
  updatedBy?: UserForm;
  deletedBy?: UserForm;
  deletedReason?: string;
}

export interface DepositBank {
  _id?: string;
  name: string;
  account: DepositBankAccount;
}

export interface DepositBankAccount {
  number: number;
  name: string;
}

export interface DepositOwner {
  _id?: string;
  name: string;
}

export interface DepositReturn {
  _id?: string;
  baseDays: number;
  dueDate?: string;
  gross?: number;
  taxAmount?: number;
  net?: number;
  remaining?: number;
}

export interface DepositCashback {
  _id?: string;
  rate: number;
  amount?: number;
  remaining?: number;
}
