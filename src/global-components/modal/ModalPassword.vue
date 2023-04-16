<template>
  <Modal
    :show="modalStore.modalPassword"
    @hidden="modalStore.setModalPassword(false)"
    data-cy="form-fill-password"
    backdrop="static"
  >
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">Password Confirm</h2>
    </ModalHeader>
    <form @submit.prevent="onSubmitForm">
      <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
        <div class="col-span-12">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            v-model="passwordText"
            type="password"
            class="form-control"
            placeholder="Type password here"
            data-cy="fill-password"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          type="button"
          @click="onCancelForm"
          class="btn btn-outline-secondary w-20 mr-1"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="btn btn-primary w-20"
          data-cy="btn-confirm-password"
        >
          Submit
        </button>
      </ModalFooter>
    </form>
  </Modal>
</template>

<script lang="ts" setup>
import { useModalStore } from "@/stores/modal";
import { ref } from "vue";

const modalStore = useModalStore();

const emit = defineEmits(["onSubmit", "hidden"]);
const passwordText = ref("");

const onCancelForm = () => {
  modalStore.setModalPassword(false);
  emit("hidden", false);
};
const onSubmitForm = () => {
  emit("onSubmit", passwordText.value);
};
</script>
