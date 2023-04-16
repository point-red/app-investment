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
      data: [
        {
          _id: "1",
          username: "username",
          name: "first name",
          email: "example@mail.com",
          role_id: "1",
        },
      ],
      user: {
        _id: "",
        username: "",
        name: "",
        email: "",
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
    async getUsers(params: QueryParams) {
      try {
        const users = await api.get<RootState>(url, { params: { ...params } });
        this.data = users.data.data;
        this.pagination = users.data.pagination;
      } catch (error) {
        console.log(error);
      }
    },
    async findUser(id: string) {
      try {
        const user = await api.get<User>(url + "/" + id);
        this.user = user.data;
      } catch (error) {
        console.log(error);
      }
    },
    createUser(user: User) {
      if (!user) return;
      this.data.push(user);
    },
    setUsers(users: User[]) {
      this.data = users;
    },
    async updateUser(id: string, payload: User): Promise<ApiResponse> {
      try {
        const res = await api.patch(url + "/" + id, { ...payload });
        return { data: res.data };
      } catch (error) {
        const err = error as AxiosError;
        return { error: err.response?.data as ErrorResponse };
      }
    },
    async deleteUser(id: string, password: string): Promise<ApiResponse> {
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
      return this.data.findIndex((item) => item._id === id);
    },
    findById(id: string) {
      return this.data.filter((item) => item._id === id);
    },
  },
});
