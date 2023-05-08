<template>
  <Modal
    :show="modalStore.modalRequestDelete"
    @hidden="modalStore.setModalRequestDelete(false)"
    data-cy="alert-request"
  >
    <ModalHeader>
      <h2 class="font-medium text-base mr-auto">Action Denied!</h2>
    </ModalHeader>
    <ModalBody class="px-5 py-10">
      <div class="text-center">
        <div class="">
          You do not have the authority to take this action. You can choose the
          "Request" button below if you wish to proceed with the removal by the
          Authorized User.
        </div>
      </div>
      <!-- BEGIN: Overlapping Modal Content -->
      <Modal
        :show="modalFormRequestDelete"
        @hidden="modalFormRequestDelete = false"
        data-cy="alert-form-request"
      >
        <ModalHeader>
          <h2 class="font-medium text-base mr-auto">Removal Request</h2>
        </ModalHeader>
        <form @submit.prevent="onConfirm" data-cy="form-request">
          <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
            <div class="col-span-12">
              <TomSelect
                :options="{
                  placeholder: 'Select Approver',
                }"
                name="approver"
                class="w-full"
                v-model.trim="validate.approverId.$model"
              >
                <option :value="user._id" v-for="user in data" :key="user._id">
                  {{ user.name }}
                </option>
              </TomSelect>

              <template v-if="validate.approverId.$error">
                <div
                  v-for="(error, index) in validate.approverId.$errors"
                  :key="index"
                  class="text-danger mt-2"
                  data-cy="error-field"
                >
                  {{ error.$message }}
                </div>
              </template>
            </div>
            <div class="col-span-12">
              <label for="note_request" class="form-label">Notes</label>
              <textarea
                id="note_request"
                cols="30"
                rows="5"
                class="form-control resize-none"
                v-model.trim="validate.note.$model"
                name="noteRequest"
              ></textarea>

              <template v-if="validate.note.$error">
                <div
                  v-for="(error, index) in validate.note.$errors"
                  :key="index"
                  class="text-danger mt-2"
                  data-cy="error-field"
                >
                  {{ error.$message }}
                </div>
              </template>
            </div>
          </ModalBody>
          <ModalFooter class="flex justify-between">
            <button
              @click="onCancel"
              type="button"
              class="btn btn-outline-secondary w-20 mr-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary w-20"
              data-cy="btn-send"
            >
              Send
            </button>
          </ModalFooter>
        </form>
      </Modal>
      <!-- END: Overlapping Modal Content -->
    </ModalBody>
    <ModalFooter class="flex justify-between">
      <button
        type="button"
        @click="modalFormRequestDelete = true"
        class="btn btn-outline-secondary w-20 mr-1"
        data-cy="btn-request"
      >
        Request
      </button>
      <button @click="onCancel" type="button" class="btn btn-primary w-20">
        Cancel
      </button>
    </ModalFooter>
  </Modal>
</template>

<script lang="ts" setup>
import { useModalStore } from "@/stores/modal";
import { useUsers } from "@/stores/users";
import { storeToRefs } from "pinia";
import { computed, ref, watch } from "vue";
import { required, minLength } from "@vuelidate/validators";
import useVuelidate from "@vuelidate/core";

const modalStore = useModalStore();
const userStore = useUsers();

const modalFormRequestDelete = ref<boolean>(false);
const { data } = storeToRefs(userStore);
const form = ref({
  approverId: "",
  note: "",
});

const modalState = computed(() => modalStore.modalRequestDelete);
watch(modalState, async (state) => {
  if (state) {
    await getApprover();
  } else {
    modalFormRequestDelete.value = false;
    form.value = {
      approverId: "",
      note: "",
    };
  }
});

const rules = {
  approverId: {
    required,
  },
  note: {
    required,
    minLength: minLength(10),
  },
};

const validate = useVuelidate(rules, form);

const onCancel = () => {
  modalFormRequestDelete.value = false;
  modalStore.setModalRequestDelete(false);
};
const onConfirm = () => {
  validate.value.$touch();
  if (!validate.value.$invalid) {
    modalStore.setConfirmRequestDelete(true);
    modalStore.setRequestDeleteParam(form.value.approverId, form.value.note);
    validate.value.$reset();
  }
};

const getApprover = async () => {
  await userStore.get({
    filter: { "role.permissions": modalStore.permission },
    includes: "role",
    page: 1,
    pageSize: 100,
  });
  form.value.approverId = data.value[0]._id ? data.value[0]._id : "";
};
</script>
