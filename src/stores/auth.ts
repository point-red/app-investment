import { defineStore } from "pinia";

export type RootState = {
  permissions: string[];
};

export const useAuthStore = defineStore("auth", {
  state: () =>
    ({
      permissions: ["create role", "delete user"],
    } as RootState),
  getters: {
    // permissions(state) {
    //   return state.permissions;
    // },
  },
});
