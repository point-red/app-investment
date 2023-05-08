import { defineStore } from "pinia";

export type RootState = {
  modalPassword: boolean;
  modalPasswordValue: string | null;
  modalDelete: boolean;
  confirmDelete: boolean;
  modalRequestDelete: boolean;
  confirmRequestDelete: boolean;
  permission: string;
  requestDelete: {
    approvalTo: string;
    reasonDelete: string;
  };
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
      modalPasswordValue: null,
      modalDelete: false,
      confirmDelete: false,
      modalRequestDelete: false,
      confirmRequestDelete: false,
      permission: "",
      requestDelete: {
        approvalTo: "",
        reasonDelete: "",
      },
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
      // reset password after modal hide
      if (!payload) {
        this.modalPasswordValue = null;
      }
    },
    setModalPasswordValue(payload: string) {
      this.modalPasswordValue = payload;
    },
    setModalDelete(payload: boolean) {
      this.modalDelete = payload;
    },
    setConfirmDelete(payload: boolean) {
      this.confirmDelete = payload;
    },
    setModalRequestDelete(payload: boolean, permission?: string) {
      this.modalRequestDelete = payload;
      if (permission) {
        this.permission = permission;
      } else {
        this.permission = "";
      }
    },
    setConfirmRequestDelete(payload: boolean) {
      this.confirmRequestDelete = payload;
    },
    setModalAlertNotFound(payload: boolean) {
      this.modalAlertNotFound = payload;
    },
    setRequestDeleteParam(approver: string, note: string) {
      this.requestDelete.approvalTo = approver;
      this.requestDelete.reasonDelete = note;
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
    getRequestDeleteParam() {
      return this.requestDelete;
    },
  },
});
