import api from "@/api";
import { Bank } from "@/types/Bank";
import { ApiResponse, ErrorResponse } from "@/types/api/ApiResponse";
import { IPagination } from "@/types/api/Pagination";
import { QueryParams } from "@/types/api/QueryParams";
import { AxiosError } from "axios";
import { defineStore } from "pinia";

const url = "/banks";

export type RootState = {
  banks: Bank[];
  bank: Bank;
  pagination: IPagination;
};

export const useBanksStore = defineStore("banks", {
  state: () =>
    ({
      banks: [],
      bank: {
        _id: "",
        name: "",
        branch: "",
        address: "",
        phone: "",
        fax: "",
        code: "",
        notes: "",
        accounts: [],
        createdAt: "",
      },
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 0,
        totalDocument: 0,
      },
    } as RootState),
  getters: {
    dataBank(state) {
      return state.banks;
    },
  },
  actions: {
    async getBank(params: QueryParams) {
      try {
        const roles = await api.get<RootState>(url, { params: { ...params } });
        this.banks = roles.data.banks;
        this.pagination = roles.data.pagination;
      } catch (error) {
        console.log(error);
      }
    },
    async findBank(id: string) {
      try {
        const bank = await api.get<Bank>(url + "/" + id);
        this.bank = bank.data;
      } catch (error) {
        console.log(error);
      }
    },
    async createBank(bank: Bank): Promise<ApiResponse> {
      try {
        const res = await api.post(url, { ...bank });
        return { data: res.data };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    setBanks(banks: Bank[]) {
      this.banks = banks;
    },
    async updateBank(id: string, payload: Bank): Promise<ApiResponse> {
      try {
        const res = await api.patch(url + "/" + id, { ...payload });
        return { data: res.data };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async deleteBank(id: string, password: string): Promise<ApiResponse> {
      try {
        const res = await api.delete(url + "/" + id, { data: { password } });
        console.log(res.data);
        return { data: res.data };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    findIndexById(id: string) {
      return this.banks.findIndex((item) => item._id === id);
    },
    findById(id: string) {
      return this.banks.filter((item) => item._id === id);
    },
    setBank(bank: Bank) {
      this.bank = bank;
    },
  },
});
