import { defineStore } from "pinia";

export type RootState = {
  modalPassword: boolean;
  modalAlertNotFound: boolean;
  modalAlertSuccess: boolean;
};

export const useModalStore = defineStore("modal", {
  state: () =>
    ({
      modalPassword: false,
      modalAlertNotFound: false,
      modalAlertSuccess: false,
    } as RootState),
  actions: {
    setModalPassword(payload: boolean) {
      this.modalPassword = payload;
    },
    setModalAlertNotFound(payload: boolean) {
      this.modalAlertNotFound = payload;
    },
    setModalAlertSuccess(payload: boolean) {
      this.modalAlertSuccess = payload;
    },
  },
});
