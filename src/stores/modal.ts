import { defineStore } from "pinia";

export type RootState = {
  modalPassword: boolean;
};

export const useModalStore = defineStore("modal", {
  state: () =>
    ({
      modalPassword: false,
    } as RootState),
  actions: {
    setModalPassword(payload: boolean) {
      this.modalPassword = payload;
    },
  },
});
