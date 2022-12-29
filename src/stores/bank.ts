import { Bank } from "@/types/Bank";
import { defineStore } from "pinia";

export type RootState = {
  banks: Bank[];
};

export const useBanksStore = defineStore("banks", {
  state: () =>
    ({
      banks: [],
    } as RootState),
  getters: {
    dataBank(state) {
      return state.banks;
    },
  },
  actions: {
    createBank(bank: Bank) {
      if (!bank) return;
      this.banks.push(bank);
    },
    setBanks(banks: Bank[]) {
      this.banks = banks;
    },
    updateBank(id: string, payload: Bank) {
      if (!id || !payload) return;

      const index = this.findIndexById(id);

      if (index !== -1) {
        this.banks[index] = payload;
      }
    },
    deleteItem(id: string) {
      const index = this.findIndexById(id);

      if (index === -1) return;

      this.banks.splice(index, 1);
    },
    findIndexById(id: string) {
      return this.banks.findIndex((item) => item.id === id);
    },
    findById(id: string) {
      return this.banks.filter((item) => item.id === id);
    },
  },
});
