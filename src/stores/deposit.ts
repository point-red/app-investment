import api from "@/api";
import { ApiResponse, ErrorResponse } from "@/types/api/ApiResponse";
import { IPagination } from "@/types/api/Pagination";
import { QueryParams } from "@/types/api/QueryParams";
import { AxiosError } from "axios";
import { defineStore } from "pinia";
import { Deposit } from "@/types/deposit";

const url = "/deposits";

export type RootState = {
  deposits: Deposit[];
  deposit: Deposit;
  pagination: IPagination;
};

export const deposit = {
  _id: "",
  date: "",
  bilyetNumber: "",
  bank: {
    _id: "",
    name: "",
    account: {
      number: 0,
      name: "",
    },
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
    account: {
      number: 0,
      name: "",
    },
  },
  recipientBank: {
    _id: "",
    name: "",
    account: {
      number: 0,
      name: "",
    },
  },
  paymentMethod: "",
  interestRate: 0,
  taxRate: 0,
  isCashback: false,
};

export const depositForm = {
  _id: "",
  date: new Date().toISOString(),
  bilyetNumber: "",
  bank_id: "",
  accountNumber: 0,
  owner_id: "",
  baseDate: 0,
  tenor: 0,
  isRollOver: false,
  amount: 0,
  sourceBank_id: "",
  sourceAccountNumber: 0,
  recipientBank_id: "",
  recipientAccountNumber: 0,
  paymentMethod: "advance",
  interestRate: 0,
  taxRate: 0,
  isCashback: false,
};

export const useDepositsStore = defineStore("deposits", {
  state: () =>
    ({
      deposits: [],
      deposit: deposit,
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 0,
        totalDocument: 0,
      },
    } as RootState),
  getters: {
    dataBank(state) {
      return state.deposits;
    },
  },
  actions: {
    async get(params: QueryParams): Promise<ApiResponse> {
      try {
        const banks = await api.get<RootState>(url, { params: { ...params } });
        this.deposits = banks.data.deposits;
        this.pagination = banks.data.pagination;
        return { data: banks.data };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async find(id: string): Promise<ApiResponse> {
      try {
        const deposit = await api.get<Deposit>(url + "/" + id);
        this.deposit = deposit.data;
        return { data: deposit.data };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async create(deposit: Deposit): Promise<ApiResponse> {
      try {
        await api.post(url, { ...deposit });
        return { error: null };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    // async update(id: string, payload: Bank): Promise<ApiResponse> {
    //   try {
    //     await api.patch(url + "/" + id, { ...payload });
    //     return { error: null };
    //   } catch (error) {
    //     const err = error as AxiosError;
    //     return { error: err.response?.data as ErrorResponse };
    //   }
    // },
    // async delete(id: string, password: string): Promise<ApiResponse> {
    //   try {
    //     await api.delete(url + "/" + id, { data: { password } });
    //     return { error: null };
    //   } catch (error) {
    //     const err = error as AxiosError;
    //     return { error: err.response?.data as ErrorResponse };
    //   }
    // },
    // async requestDelete(id: string, params: any): Promise<ApiResponse> {
    //   try {
    //     await api.post(url + "/" + id + "/request-delete", {
    //       ...params,
    //     });
    //     return { error: null };
    //   } catch (error) {
    //     const err = error as AxiosError;
    //     return { error: err.response?.data as ErrorResponse };
    //   }
    // },
    setDeposit(deposit: Deposit) {
      this.deposit = deposit;
    },
  },
});
