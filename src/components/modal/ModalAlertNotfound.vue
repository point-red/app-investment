<template>
  <Modal
    :show="modalStore.modalAlertNotFound"
    @hidden="modalStore.setModalAlertNotFound(false)"
    data-cy="alert-notfound"
  >
    <ModalBody class="p-0">
      <div class="p-5 text-center">
        <div class="text-3xl mt-5">Data Not Available</div>
        <div class="text-slate-500 mt-2">You haven't saved any data</div>
      </div>
    </ModalBody>
    <ModalFooter>
      <button
        @click="onSubmitForm"
        type="submit"
        class="btn btn-primary w-20"
        data-cy="btn-notfound-ok"
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
  modalStore.setModalAlertNotFound(false);
  emit("onSubmit", "test on submit");
};
</script>
