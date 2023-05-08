import { AccountBank } from "@/types/AccountBank";
import { defineStore } from "pinia";

export type RootState = {
  accountBank: AccountBank[];
};

export const useAccountBankStore = defineStore("accountBank", {
  state: () =>
    ({
      accountBank: [
        {
          name: "John Doe",
          number: 834734873482,
          notes: "notes",
          createdAt: new Date().toLocaleDateString(),
        },
        {
          name: "Jane Doe",
          number: 834734873,
          notes: "notes",
          createdAt: new Date().toLocaleDateString(),
        },
      ],
    } as RootState),
  actions: {
    createAccountBank(accountBank: AccountBank) {
      if (!accountBank) return;
      this.accountBank.push(accountBank);
    },
    setAccountBank(accountBank: AccountBank[]) {
      this.accountBank = accountBank;
    },
    // updateAccountBank(id: string, payload: AccountBank) {
    //   if (!id || !payload) return;

    //   const index = this.findIndexById(id);

    //   if (index !== -1) {
    //     this.accountBank[index] = payload;
    //   }
    // },
    // deleteItem(id: string) {
    //   const index = this.findIndexById(id);

    //   if (index === -1) return;

    //   this.accountBank.splice(index, 1);
    // },
    // findIndexById(id: string) {
    //   return this.accountBank.findIndex((item) => item.id === id);
    // },
  },
});
