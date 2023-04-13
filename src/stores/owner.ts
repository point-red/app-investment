import { Owner } from "@/types/Owner";
import { defineStore } from "pinia";

export type RootState = {
  owners: Owner[];
};

export const useOwnersStore = defineStore("owners", {
  state: () =>
    ({
      owners: [
        {
          id: "1",
          firstName: "John",
          lastName: "Doe",
          email: "example@mail.com",
          phone: "628454342432",
          createdAt: new Date().toLocaleDateString(),
        },
      ],
    } as RootState),
  getters: {
    dataOwner(state) {
      return state.owners;
    },
  },
  actions: {
    createOwner(owner: Owner) {
      if (!owner) return;
      this.owners.push(owner);
    },
    setOwners(owners: Owner[]) {
      this.owners = owners;
    },
    updateOwner(id: string, payload: Owner) {
      if (!id || !payload) return;

      const index = this.findIndexById(id);

      if (index !== -1) {
        this.owners[index] = payload;
      }
    },
    deleteItem(id: string) {
      const index = this.findIndexById(id);

      if (index === -1) return;

      this.owners.splice(index, 1);
    },
    findIndexById(id: string) {
      return this.owners.findIndex((item) => item.id === id);
    },
    findById(id: string) {
      return this.owners.filter((item) => item.id === id);
    },
  },
});
