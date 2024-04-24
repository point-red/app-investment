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
  account: DepositBankAccount;
  owner: DepositOwner;
  baseDate: number;
  tenor: number;
  dueDate?: string;
  isRollOver: boolean | string;
  amount: number;
  remaining?: number;
  sourceBank: DepositBank;
  sourceBankAccount: DepositBankAccount;
  recipientBank: DepositBank;
  recipientBankAccount: DepositBankAccount;
  paymentMethod: string;
  interestRate?: number;
  baseInterest?: number;
  grossInterest?: number;
  taxRate?: number;
  taxAmount?: number;
  netInterest?: number;
  isCashback: boolean | string;
  note?: string;
  formStatus?: string;
  returns?: DepositReturn[];
  cashbacks?: DepositCashback[];
  cashbackPayment?: DepositCashbackPayment;
  cashbackPaymentArchives?: DepositCashbackPayment[];
  interestPayment?: DepositInterestPayment;
  interestPaymentArchives?: DepositInterestPayment[];
  withdrawal?: DepositWithdrawalPayment;
  withdrawalArchives?: DepositWithdrawalPayment[];
  renewal_id?: string;
  createdBy?: UserForm;
  createdAt?: string;
  updatedBy?: UserForm;
  deletedAt?: string;
  deletedBy?: UserForm;
  deleteReason?: string;
}

export interface DepositBank {
  _id?: string;
  name: string;
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
  payments?: Payment[];
}

export interface CashbacksPayment {
  date: string;
  rate: number;
  amount: number;
  received: number;
}

export interface InterestPayment {
  baseDays: number;
  dueDate: string;
  gross: number;
  taxAmount: number;
  net: number;
  bank: DepositBank;
  account: DepositBankAccount;
  date: string;
  received: number;
}

export interface WithdrawalPayment {
  bank: DepositBank;
  account: DepositBankAccount;
  recipientName: string;
  date: string;
  amount: number;
  remaining: number;
}

export interface InterestPaymentDetail {
  bank: DepositBank;
  account: DepositBankAccount;
  date: string;
  amount: number;
  remaining: number;
}

export interface Payment {
  date: string;
  amount: number;
  remaining: number;
}

export interface DepositCashbackPayment {
  _id?: string;
  cashbacks: CashbacksPayment[];
  note?: string;
  status?: string;
  createdAt?: string;
  createdBy?: UserForm;
  updatedAt?: string;
  updatedBy?: UserForm;
  deletedBy?: UserForm;
  deletedAt?: string;
  deleteReason?: string;
}

export interface DepositInterestPayment {
  _id?: string;
  interests: InterestPayment[];
  note?: string;
  status?: string;
  createdAt?: string;
  createdBy?: UserForm;
  updatedAt?: string;
  updatedBy?: UserForm;
  deletedBy?: UserForm;
  deletedAt?: string;
  deleteReason?: string;
}

export interface DepositWithdrawalPayment {
  _id?: string;
  payments: WithdrawalPayment[];
  note?: string;
  status?: string;
  createdAt?: string;
  createdBy?: UserForm;
  updatedAt?: string;
  updatedBy?: UserForm;
  deletedBy?: UserForm;
  deletedAt?: string;
  deleteReason?: string;
}
