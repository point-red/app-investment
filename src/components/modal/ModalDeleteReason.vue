<template>
    <Modal :show="modalStore.modalDeleteReason" @hidden="modalStore.setModalDeleteReason(false)"
        data-cy="form-fill-password" backdrop="static">
        <ModalHeader>
            <h2 class="font-medium text-base mr-auto">Password Confirm</h2>
        </ModalHeader>
        <form @submit.prevent="onSubmitForm">
            <ModalBody class="grid grid-cols-12 gap-4 gap-y-3">
                <div class="col-span-12">
                    <label for="password" class="form-label">Password</label>
                    <input id="password" v-model.trim="validate.passwordText.$model" type="password" class="form-control"
                        placeholder="Type password here" data-cy="fill-password" />
                    <template v-if="validate.passwordText.$error">
                        <div v-for="(error, index) in validate.passwordText.$errors" :key="index" class="text-danger mt-2"
                            data-cy="error-field">
                            {{ error.$message }}
                        </div>
                    </template>
                </div>
                <div class="col-span-12">
                    <label for="reason" class="form-label">Reason</label>
                    <input id="reason" v-model.trim="validate.reason.$model" type="text" class="form-control"
                        placeholder="Type reason here" data-cy="fill-reason" />
                    <template v-if="validate.reason.$error">
                        <div v-for="(error, index) in validate.reason.$errors" :key="index" class="text-danger mt-2"
                            data-cy="error-field">
                            {{ error.$message }}
                        </div>
                    </template>
                </div>
            </ModalBody>
            <ModalFooter>
                <button type="button" @click="onCancelForm" class="btn btn-outline-secondary w-20 mr-1">
                    Cancel
                </button>
                <button type="submit" class="btn btn-primary w-20" data-cy="btn-confirm-password">
                    Submit
                </button>
            </ModalFooter>
        </form>
    </Modal>
</template>
  
<script lang="ts" setup>
import { useModalStore } from "@/stores/modal";
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { ref } from "vue";

const modalStore = useModalStore();

const form = ref({
    passwordText: "",
    reason: "",
});

const rules = {
    passwordText: {
        required,
    },
    reason: {
        required,
        minLength: minLength(10),
    },
};

const validate = useVuelidate(rules, form);

const onCancelForm = () => {
    modalStore.setModalDeleteReason(false);
};
const onSubmitForm = () => {
    validate.value.$touch();
    if (!validate.value.$invalid) {
        console.log('masuk')
        modalStore.setConfirmDeleteReason(true);
        console.log('aaaa')
        modalStore.setDeleteReason(form.value.passwordText, form.value.reason);
        validate.value.$reset();
    }
};
</script>
  