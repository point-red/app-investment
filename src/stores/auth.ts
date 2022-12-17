import { defineStore } from "pinia";

export type RootState = {
  permissions: string[];
};

export const useAuthStore = defineStore("auth", {
  state: () =>
    ({
      permissions: ["create role"],
    } as RootState),
  getters: {
    permissions(state) {
      return state.permissions;
    },
  },
});
