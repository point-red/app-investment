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
      owners: [
        {
          _id: "1",
          name: "John",
          createdAt: new Date().toLocaleDateString(),
        },
      ],
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
    async getOwner(params: QueryParams) {
      try {
        const owners = await api.get<RootState>(url, { params: { ...params } });
        this.owners = owners.data.owners;
        this.pagination = owners.data.pagination;
      } catch (error) {
        console.log(error);
      }
    },
    async findOwner(id: string) {
      try {
        const owner = await api.get<Owner>(url + "/" + id);
        this.owner = owner.data;
      } catch (error) {
        console.log(error);
      }
    },
    async createOwner(owner: Owner): Promise<ApiResponse> {
      try {
        const res = await api.post(url, { ...owner });
        return { data: res.data };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    setOwners(owners: Owner[]) {
      this.owners = owners;
    },
    async updateOwner(id: string, payload: Owner): Promise<ApiResponse> {
      try {
        const res = await api.patch(url + "/" + id, { ...payload });
        return { data: res.data };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async deleteOwner(id: string, password: string): Promise<ApiResponse> {
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
      return this.owners.findIndex((item) => item._id === id);
    },
    findById(id: string) {
      return this.owners.filter((item) => item._id === id);
    },
    refresh() {
      this.owner = {
        _id: "",
        name: "",
        createdAt: "",
      };
    },
  },
});
