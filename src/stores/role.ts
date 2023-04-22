import api from "@/api";
import { ApiResponse, ErrorResponse } from "@/types/api/ApiResponse";
import { IPagination } from "@/types/api/Pagination";
import { QueryParams } from "@/types/api/QueryParams";
import { Role } from "@/types/Role";
import { AxiosError } from "axios";
import { defineStore } from "pinia";

const url = "/roles";

export type RootState = {
  roles: Role[];
  role: Role;
  pagination: IPagination;
};

export const useRoleStore = defineStore("roles", {
  state: () =>
    ({
      roles: [],
      role: {
        name: "",
        permissions: [],
      },
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 1,
        totalDocument: 0,
      },
    } as RootState),
  getters: {
    dataRole(state) {
      return state.roles;
    },
  },
  actions: {
    async get(params: QueryParams): Promise<ApiResponse> {
      try {
        const roles = await api.get<RootState>(url, { params: { ...params } });
        this.roles = roles.data.roles;
        this.pagination = roles.data.pagination;
        return { data: roles.data };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async find(id: string): Promise<ApiResponse> {
      try {
        const role = await api.get<Role>(url + "/" + id);
        this.role = role.data;
        return { data: role.data };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async create(role: Role): Promise<ApiResponse> {
      try {
        await api.post(url, { ...role });
        return { error: null };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async update(id: string, payload: Role): Promise<ApiResponse> {
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
        console.log(error);
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
  },
});
