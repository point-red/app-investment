import { User } from "@/types/Users";
import { defineStore } from "pinia";

export type RootState = {
  users: User[];
};

export const useUsers = defineStore("users", {
  state: () =>
    ({
      users: [],
    } as RootState),
  getters: {
    dataUser(state) {
      return state.users;
    },
  },
  actions: {
    createUser(user: User) {
      if (!user) return;
      this.users.push(user);
    },
    setUsers(users: User[]) {
      this.users = users;
    },
    updateUser(id: string, payload: User) {
      if (!id || !payload) return;

      const index = this.findIndexById(id);

      if (index !== -1) {
        this.users[index] = payload;
      }
    },
    deleteItem(id: string) {
      const index = this.findIndexById(id);

      if (index === -1) return;

      this.users.splice(index, 1);
    },
    findIndexById(id: string) {
      return this.users.findIndex((item) => item.id === id);
    },
  },
});
