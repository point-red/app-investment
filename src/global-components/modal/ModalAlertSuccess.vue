<template>
  <Modal
    :show="modalStore.modalAlertSuccess"
    @hidden="modalStore.setModalAlertSuccess(false)"
    data-cy="alert-success"
    backdrop="static"
  >
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <CheckCircleIcon class="w-16 h-16 text-success mx-auto mt-3" />
        <div class="text-3xl mt-5">{{ modalStore.modalMessage.title }}</div>
        <div class="text-slate-500 mt-2">
          {{ modalStore.modalMessage.message }}
        </div>
      </div>
    </ModalBody>
    <ModalFooter>
      <div class="px-5 pb-8 text-center">
        <button
          @click="onSuccess"
          type="submit"
          class="btn btn-primary w-20"
          data-cy="btn-alert-success-ok"
        >
          OK
        </button>
      </div>
    </ModalFooter>
  </Modal>
</template>

<script lang="ts" setup>
import { useModalStore } from "@/stores/modal";

const modalStore = useModalStore();

const emit = defineEmits(["onSuccess", "hidden"]);

const onSuccess = () => {
  modalStore.setModalAlertSuccess(false);
  emit("onSuccess");
};
</script>
