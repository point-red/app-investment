import api from "@/api";
import { Owner } from "@/types/Owner";
import { ApiResponse, ErrorResponse } from "@/types/api/ApiResponse";
import { IPagination } from "@/types/api/Pagination";
import { QueryParams } from "@/types/api/QueryParams";
import { AxiosError } from "axios";
import { defineStore } from "pinia";

const url = "/owners";

export type RootState = {
  owners: Owner[];
  owner: Owner;
  pagination: IPagination;
};

export const useOwnersStore = defineStore("owners", {
  state: () =>
    ({
      owners: [],
      owner: {
        _id: "",
        name: "",
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
    dataOwner(state) {
      return state.owners;
    },
  },
  actions: {
    async get(params: QueryParams): Promise<ApiResponse> {
      try {
        const owners = await api.get<RootState>(url, { params: { ...params } });
        this.owners = owners.data.owners;
        this.pagination = owners.data.pagination;
        return { data: owners.data };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async find(id: string): Promise<ApiResponse> {
      try {
        const owner = await api.get<Owner>(url + "/" + id);
        this.owner = owner.data;
        return { data: owner.data };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async create(owner: Owner): Promise<ApiResponse> {
      try {
        await api.post(url, { ...owner });
        return { error: null };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async update(id: string, payload: Owner): Promise<ApiResponse> {
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
  },
});
