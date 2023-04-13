<template>
  <Modal
    :show="modalStore.modalAlertSuccess"
    @hidden="modalStore.setModalAlertSuccess(false)"
    data-cy="alert-success"
  >
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <CheckCircleIcon class="w-16 h-16 text-success mx-auto mt-3" />
        <div class="text-3xl mt-5">Success</div>
        <div class="text-slate-500 mt-2"></div>
      </div>
    </ModalBody>
    <ModalFooter>
      <button
        @click="onSubmitForm"
        type="submit"
        class="btn btn-primary w-20"
        data-cy="btn-alert-success-ok"
      >
        OK
      </button>
    </ModalFooter>
  </Modal>
</template>

<script lang="ts" setup>
import { useModalStore } from "@/stores/modal";
import { ref } from "vue";

const modalStore = useModalStore();

const emit = defineEmits(["onSubmit", "hidden"]);
const passwordText = ref("");

const onSubmitForm = () => {
  modalStore.setModalAlertSuccess(false);
  emit("onSubmit", "test on submit");
};
</script>
