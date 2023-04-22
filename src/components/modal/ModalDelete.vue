<template>
  <Modal
    :show="modalStore.modalDelete"
    @hidden="modalStore.setModalDelete(false)"
    data-cy="confirm-remove"
  >
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <XCircleIcon class="w-16 h-16 text-danger mx-auto mt-3" />
        <div class="text-3xl mt-5">Are you sure?</div>
        <div class="text-slate-500 mt-2">
          Do you really want to delete these records? <br />This process cannot
          be undone.
        </div>
      </div>
      <div class="px-5 pb-8 text-center">
        <button
          type="button"
          @click="onCancel"
          class="btn btn-outline-secondary w-24 mr-1"
        >
          Cancel
        </button>
        <button
          type="button"
          @click="onConfirm"
          class="btn btn-danger w-24"
          data-cy="btn-yes"
        >
          Delete
        </button>
      </div>
    </ModalBody>
  </Modal>
</template>

<script lang="ts" setup>
import { useModalStore } from "@/stores/modal";

const modalStore = useModalStore();

const onCancel = () => {
  modalStore.setModalDelete(false);
};
const onConfirm = () => {
  modalStore.setConfirmDelete(true);
};
</script>
