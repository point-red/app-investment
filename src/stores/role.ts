import { Role } from "@/types/Role";
import { defineStore } from "pinia";

export type RootState = {
  roles: Role[];
};

export const useRoleStore = defineStore("roles", {
  state: () =>
    ({
      roles: [],
    } as RootState),
  getters: {
    dataRole(state) {
      return state.roles;
    },
  },
  actions: {
    createRole(role: Role) {
      if (!role) return;
      this.roles.push(role);
    },
    setRoles(roles: Role[]) {
      this.roles = roles;
    },
    updateRole(id: string, payload: Role) {
      if (!id || !payload) return;

      const index = this.findIndexById(id);

      if (index !== -1) {
        this.roles[index] = payload;
      }
    },
    deleteItem(id: string) {
      const index = this.findIndexById(id);

      if (index === -1) return;

      this.roles.splice(index, 1);
    },
    findIndexById(id: string) {
      return this.roles.findIndex((item) => item.id === id);
    },
  },
});
