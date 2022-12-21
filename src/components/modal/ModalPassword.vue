<template>
  <Modal :show="showModalPassword">
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">Create Role</h2>
    </ModalHeader>
    <form action="">
      <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
        <div class="col-span-12">
          <label for="password" class="form-label">Password</label>
          <input
            id="password"
            v-model="passwordText"
            type="password"
            class="form-control"
            placeholder="Type password here"
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
          @click="onSubmitForm"
          type="submit"
          class="btn btn-primary w-20"
        >
          Submit
        </button>
      </ModalFooter>
    </form>
  </Modal>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";

const props = defineProps<{
  show: boolean;
}>();

const emit = defineEmits(["onSubmit", "onClose"]);

const showModalPassword = ref(props.show);
const passwordText = ref("");

const onCancelForm = () => {
  emit("onClose", "test on close");
};
const onSubmitForm = () => {
  emit("onSubmit", "test on submit");
};
</script>
