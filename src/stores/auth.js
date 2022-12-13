import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    permissions: ["create role"],
  }),
  getters: {
    permissions(state) {
      return state.permissions;
    },
  },
});
