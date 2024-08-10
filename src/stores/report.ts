import api from "@/api";
import { ApiResponse, ErrorResponse } from "@/types/api/ApiResponse";
import { IPagination } from "@/types/api/Pagination";
import { QueryParams } from "@/types/api/QueryParams";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import {
  Deposit,
  DepositCashback,
  DepositCashbackPayment,
  DepositInterestPayment,
  DepositWithdrawalPayment,
} from "@/types/deposit";

const url = "/deposits/report";

export type RootState = {
  deposits: Deposit[];
  deposit: Deposit;
  depositGroup: { deposits: Deposit[]; bilyetNumber: string; expanded: true }[];
  pagination: IPagination;
};

export const deposit = {
  _id: "",
  date: new Date().toISOString(),
  bilyetNumber: "",
  bank: {
    _id: "",
    name: "",
    account: {
      number: 0,
      name: "",
    },
  },
  account: {
    number: 0,
    name: "",
  },
  owner: {
    _id: "",
    name: "",
  },
  baseDate: 0,
  tenor: 0,
  isRollOver: false,
  amount: 0,
  sourceBank: {
    _id: "",
    name: "",
  },
  sourceBankAccount: {
    number: 0,
    name: "",
  },
  recipientBank: {
    _id: "",
    name: "",
  },
  recipientBankAccount: {
    number: 0,
    name: "",
  },
  paymentMethod: "advance",
  isCashback: false,
  returns: [],
  cashbacks: [],
  totalInterest: "",
};

export const useReportsStore = defineStore("reports", {
  state: () =>
    ({
      deposits: [],
      deposit: deposit,
      // depositGroup: [{ deposits: [], bilyetNumber: "" }],
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 0,
        totalDocument: 0,
      },
    } as unknown as RootState),
  getters: {
    dataBank(state) {
      return state.deposits;
    },
  },
  actions: {
    async get(params: QueryParams): Promise<ApiResponse> {
      try {
        const deposit = await api.get<RootState>(url, {
          params: { ...params },
        });
        this.deposits = deposit.data.deposits;
        this.pagination = deposit.data.pagination;
        return { data: deposit.data };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async getAll(params: QueryParams): Promise<Deposit[] | ApiResponse> {
      let deposits: Deposit[] = [];
      try {
        for (let i = 1; i <= this.pagination.pageCount; i++) {
          params.page = i;
          const deposit = await api.get<RootState>(url, {
            params: { ...params },
          });

          deposits = deposits.concat(deposit.data.deposits);
        }

        return deposits;
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    setDeposit(deposit: Deposit) {
      this.deposit = deposit;
    },
    resetDeposit() {
      this.deposit = deposit as unknown as Deposit;
    },
  },
});
