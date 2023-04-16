<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page">Edit Owner</h2>
  </div>

  <div class="intro-y box lg:mt-5 flex">
    <div class="w-full items-center">
      <form @submit.prevent="onSubmit">
        <div
          class="p-5 flex gap-4 w-full border-b border-slate-200/60 dark:border-darkmode-400"
        >
          <div class="w-2/3">
            <h2
              class="font-medium text-base pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
            >
              Owner Details
            </h2>
            <div class="pt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label for="fullname" class="form-label">Full Name</label>
                <input
                  id="fullname"
                  type="text"
                  class="form-control"
                  placeholder="Full Name"
                  v-model.trim="validate.name.$model"
                  name="fullname"
                />

                <template v-if="validate.name.$error">
                  <div
                    v-for="(error, index) in validate.name.$errors"
                    :key="index"
                    class="text-danger mt-2"
                    data-cy="error-field"
                  >
                    {{ error.$message }}
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>

        <!-- btn -->
        <div
          class="flex justify-end p-5 border-t border-slate-200/60 dark:border-darkmode-400"
        >
          <div>
            <button
              @click="router.push({ name: 'master-owner' })"
              type="button"
              class="btn btn-outline-secondary mr-1"
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" data-cy="btn-save">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from "@/stores/modal";
import { useOwnersStore } from "@/stores/owner";
import { Owner } from "@/types/Owner";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const ownerStore = useOwnersStore();
const modalStore = useModalStore();

const formData = ref<Owner>(ownerStore.owner);

const rulesOwner = {
  name: {
    required,
    minLength: minLength(2),
  },
};

const validate = useVuelidate(rulesOwner, formData);

const onSubmit = async () => {
  validate.value.$touch();
  if (validate.value.$invalid) {
    console.log("invalid");
  } else {
    const { error } = await ownerStore.updateOwner(
      String(formData.value._id),
      formData.value
    );
    if (!error) {
      modalStore.setModalAlertSuccess(
        true,
        "Changes Saved!",
        "Your update to the selected owner has been applied."
      );
      router.push({ name: "master-owner" });
    }
  }
};

const findOwner = async () => {
  await ownerStore.findOwner(String(route.params.id));
  formData.value = ownerStore.owner;
};

onMounted(async () => {
  await findOwner();
});
</script>
