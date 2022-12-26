<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page">
      Create Owner
    </h2>
    <!-- <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button data-test="btn-create" class="btn btn-primary shadow-md mr-2">
        Create Role
      </button>
    </div> -->
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
                <label for="firstname" class="form-label">First Name</label>
                <input
                  id="firstname"
                  type="text"
                  class="form-control"
                  placeholder="First Name"
                  v-model="formData.firstName"
                />
              </div>
              <div>
                <label for="lastname" class="form-label">Last Name</label>
                <input
                  id="lastname"
                  type="text"
                  class="form-control"
                  placeholder="Last Name"
                  v-model="formData.lastName"
                />
              </div>
              <div>
                <label for="email" class="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  class="form-control"
                  placeholder="Email"
                  v-model="formData.email"
                />
              </div>
              <div>
                <label for="phone" class="form-label">Phone</label>
                <input
                  id="phone"
                  type="text"
                  class="form-control"
                  placeholder="Phone"
                  v-model="formData.phone"
                />
              </div>
            </div>
          </div>
          <div class="w-1/3">
            <h2
              class="font-medium text-base pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
            >
              Profile picture
            </h2>
            <div class="pt-4">
              <Uploader
                v-model="formData.attachments.preview"
                @on-upload="
                  (file) => {
                    onUploadAttachment(file);
                  }
                "
                :auto-upload="true"
                :loading="false"
                text-error=""
                upload-field-name="image-profile"
              />
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
              Add Owner
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Uploader from "@/components/ImageUpload.vue";
import { useOwnersStore } from "@/stores/owner";
import { Owner } from "@/types/Owner";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const ownerStore = useOwnersStore();

const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  attachments: {
    file: null,
    preview: "",
  },
});

const onUploadAttachment = async (fileUpload) => {
  const { file, preview } = fileUpload;
  formData.value.attachments = {
    ...formData.value.attachments,
    file: file,
    preview: preview,
  };
};

const onSubmit = () => {
  const lengthRole = ownerStore.owners.length;
  ownerStore.createOwner({
    id: String(lengthRole + 1),
    firstName: formData.value.firstName,
    lastName: formData.value.lastName,
    email: formData.value.email,
    phone: formData.value.phone,
    createdAt: new Date().toLocaleDateString(),
  });
  router.push({ name: "master-owner" });
};
</script>
