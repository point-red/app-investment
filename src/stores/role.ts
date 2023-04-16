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
        pageCount: 0,
        totalDocument: 0,
      },
    } as RootState),
  getters: {
    dataRole(state) {
      return state.roles;
    },
  },
  actions: {
    async getRoles(params: QueryParams) {
      try {
        const roles = await api.get<{ roles: Role[]; pagination: IPagination }>(
          url,
          { params: { ...params } }
        );
        this.roles = roles.data.roles;
        this.pagination = roles.data.pagination;
      } catch (error) {
        console.log(error);
      }
    },
    async findRole(id: string) {
      try {
        const roles = await api.get<Role>(url + "/" + id);
        this.role = roles.data;
      } catch (error) {
        console.log(error);
      }
    },
    async createRole(role: Role) {
      try {
        await api.post(url, { ...role });
      } catch (error) {
        console.log(error);
      }
    },
    setRoles(roles: Role[]) {
      this.roles = roles;
    },
    async updateRole(id: string, payload: Role): Promise<ApiResponse> {
      try {
        const res = await api.patch(url + "/" + id, { ...payload });
        return { data: res.data };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async deleteRole(id: string, password: string): Promise<ApiResponse> {
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
      return this.roles.findIndex((item) => item._id === id);
    },
  },
});
