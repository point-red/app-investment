import { defineStore } from "pinia";

export type RootState = {
  modalPassword: boolean;
  modalAlertNotFound: boolean;
  modalAlertSuccess: boolean;
  modalMessage: {
    title: string;
    message: string;
  };
};

export const useModalStore = defineStore("modal", {
  state: () =>
    ({
      modalPassword: false,
      modalAlertNotFound: false,
      modalAlertSuccess: false,
      modalMessage: {
        title: "",
        message: "",
      },
    } as RootState),
  actions: {
    setModalPassword(payload: boolean) {
      this.modalPassword = payload;
    },
    setModalAlertNotFound(payload: boolean) {
      this.modalAlertNotFound = payload;
    },
    setModalAlertSuccess(payload: boolean, title?: string, message?: string) {
      this.modalAlertSuccess = payload;
      if (!payload) {
        this.modalMessage.title = "";
        this.modalMessage.message = "";
      } else {
        this.modalMessage.title = title ? title : "";
        this.modalMessage.message = message ? message : "";
      }
    },
  },
});
