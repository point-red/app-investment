import { defineStore } from "pinia";

export type RootState = {
  permissions: string[];
};

export const useAuthStore = defineStore("auth", {
  state: () =>
    ({
      permissions: ["read role", "create role", "read bank"],
    } as RootState),
  getters: {
    // permissions(state) {
    //   return state.permissions;
    // },
  },
  actions: {
    setPermissions(payload: string[]) {
      this.permissions = payload;
    },
  },
});
