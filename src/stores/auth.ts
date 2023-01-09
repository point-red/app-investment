import { defineStore } from "pinia";

export type RootState = {
  permissions: string[];
};

export const useAuthStore = defineStore("auth", {
  state: () =>
    ({
      permissions: [
        "create bank",
        "read bank",
        "update bank",
        "delete bank",
        "create owner",
        "read owner",
        "update owner",
        "delete owner",
        "create role",
        "read role",
        "update role",
        "delete role",
        "manage role",
        "create users",
        "read users",
        "update users",
        "delete users",
      ],
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
