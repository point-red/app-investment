<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page">
      Create Owner
    </h2>
  </div>

  <div class="intro-y box lg:mt-5 flex">
    <div class="w-full items-center">
      <form @submit.prevent="onSubmit">
        <div
          class="p-5 w-full border-b border-slate-200/60 dark:border-darkmode-400"
        >
          <div class="w-full mb-8">
            <h2
              class="font-medium text-base pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
            >
              Owner Details
            </h2>
            <div
              class="pt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5"
            >
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
              @click="router.push({ name: ownerNav.home.name })"
              type="button"
              class="btn btn-outline-secondary mr-1"
            >
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" data-cy="btn-save">
              Add Owner
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
import { toRefs, reactive } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { useNavStore } from "@/stores/nav";
import { masterNav, ownerNav } from "@/router/master";

const router = useRouter();
const ownerStore = useOwnersStore();
const modalStore = useModalStore();
const navStore = useNavStore();

navStore.create([masterNav.master, ownerNav.home, ownerNav.create]);

const formData = reactive<Owner>({ name: "" });

const rulesOwner = {
  name: {
    required,
    minLength: minLength(5),
  },
};

const validate = useVuelidate(rulesOwner, toRefs(formData));

const onSubmit = async () => {
  validate.value.$touch();
  if (!validate.value.$invalid) {
    const { error } = await ownerStore.create(formData);
    if (!error) {
      modalStore.setModalAlertSuccess(
        true,
        "Owner Successfully Added",
        "You have added a new Owner."
      );
      router.push({ name: ownerNav.home.name });
    }
  }
};
</script>
