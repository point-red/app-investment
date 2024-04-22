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
import { depositNav } from "@/router/investment";

const url = "/deposits";

export type RootState = {
  deposits: Deposit[];
  deposit: Deposit;
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
};

export const depositForm = {
  _id: "",
  date: new Date().toISOString(),
  bilyetNumber: "",
  bank: {
    _id: "",
    name: "",
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
    async update(id: string, payload: Deposit): Promise<ApiResponse> {
      try {
        await api.patch(url + "/" + id, { ...payload });
        return { error: null };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async cashbackPayment(
      id: string,
      payload: DepositCashbackPayment
    ): Promise<ApiResponse> {
      try {
        await api.patch(url + "/" + id + "/cashbacks", {
          ...payload,
        });
        return { error: null };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async interestPayment(
      id: string,
      payload: DepositInterestPayment
    ): Promise<ApiResponse> {
      try {
        await api.patch(url + "/" + id + "/interests", {
          ...payload,
        });
        return { error: null };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async withdrawalPayment(
      id: string,
      payload: DepositWithdrawalPayment
    ): Promise<ApiResponse> {
      try {
        await api.patch(url + "/" + id + "/withdrawals", {
          ...payload,
        });
        return { error: null };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async renewal(id: string, payload: Deposit): Promise<ApiResponse> {
      try {
        await api.patch(url + "/" + id + "/renewals", {
          ...payload,
        });
        return { error: null };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async delete(id: string, password: string): Promise<ApiResponse> {
      try {
        await api.delete(url + "/" + id, { data: { password } });
        return { error: null };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async deleteCashback(
      id: string,
      cashbackId: string,
      password: string
    ): Promise<ApiResponse> {
      try {
        await api.delete(url + "/" + id + "/cashbacks/" + cashbackId, {
          data: { password },
        });
        return { error: null };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async deleteInterest(
      id: string,
      interestId: string,
      password: string
    ): Promise<ApiResponse> {
      try {
        await api.delete(url + "/" + id + "/interests/" + interestId, {
          data: { password },
        });
        return { error: null };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async deleteWithdrawal(
      id: string,
      withdrawalId: string,
      password: string
    ): Promise<ApiResponse> {
      try {
        await api.delete(url + "/" + id + "/withdrawals/" + withdrawalId, {
          data: { password },
        });
        return { error: null };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    setDeposit(deposit: Deposit) {
      this.deposit = deposit;
    },
    resetDeposit() {
      this.deposit = deposit;
    },
  },
});
