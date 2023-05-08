import api from "@/api";
import { User } from "@/types/Users";
import { ApiResponse, ErrorResponse } from "@/types/api/ApiResponse";
import { IPagination } from "@/types/api/Pagination";
import { QueryParams } from "@/types/api/QueryParams";
import { AxiosError } from "axios";
import { defineStore } from "pinia";

const url = "/users";

export type RootState = {
  data: User[];
  user: User;
  pagination: IPagination;
};

export const useUsers = defineStore("users", {
  state: () =>
    ({
      data: [],
      user: {
        _id: "",
        username: "",
        name: "",
        lastname: "",
        email: "",
        mobilephone: "",
        role_id: "1",
      },
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 0,
        totalDocument: 0,
      },
    } as RootState),
  getters: {
    dataUser(state) {
      return state.data;
    },
  },
  actions: {
    async get(params: QueryParams): Promise<ApiResponse> {
      try {
        const users = await api.get<RootState>(url, { params });
        this.data = users.data.data;
        this.pagination = users.data.pagination;
        return { data: users.data };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async find(id: string, params?: QueryParams): Promise<ApiResponse> {
      try {
        const user = await api.get<User>(url + "/" + id, { params });
        this.user = user.data;
        return { data: user.data };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async create(user: User): Promise<ApiResponse> {
      try {
        await api.post(url, { ...user });
        return { error: null };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async update(id: string, payload: User): Promise<ApiResponse> {
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
  },
});
