import api from "@/api";
import { Bank } from "@/types/Bank";
import { ApiResponse, ErrorResponse } from "@/types/api/ApiResponse";
import { IPagination } from "@/types/api/Pagination";
import { QueryParams } from "@/types/api/QueryParams";
import { AxiosError } from "axios";
import { create, update } from "cypress/types/lodash";
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
    async get(params: QueryParams): Promise<ApiResponse> {
      try {
        const banks = await api.get<RootState>(url, { params: { ...params } });
        this.banks = banks.data.banks;
        this.pagination = banks.data.pagination;
        return { data: banks.data };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async find(id: string): Promise<ApiResponse> {
      try {
        const bank = await api.get<Bank>(url + "/" + id);
        this.bank = bank.data;
        return { data: bank.data };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async create(bank: Bank): Promise<ApiResponse> {
      try {
        await api.post(url, { ...bank });
        return { error: null };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async update(id: string, payload: Bank): Promise<ApiResponse> {
      try {
        await api.patch(url + "/" + id, { ...payload });
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
    async requestDelete(id: string, params: any): Promise<ApiResponse> {
      try {
        await api.post(url + "/" + id + "/request-delete", {
          ...params,
        });
        return { error: null };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    setBank(bank: Bank) {
      this.bank = bank;
    },
  },
});
