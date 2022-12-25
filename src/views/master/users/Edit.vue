<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Edit User</h2>
    <!-- <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button data-test="btn-create" class="btn btn-primary shadow-md mr-2">
        Create Role
      </button>
    </div> -->
  </div>

  <div class="intro-y box lg:mt-5 flex">
    <div class="w-full items-center">
      <div
        class="p-5 flex gap-4 w-full border-b border-slate-200/60 dark:border-darkmode-400"
      >
        <div class="w-2/3">
          <h2
            class="font-medium text-base pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
          >
            Edit user detail
          </h2>
          <div class="pt-4 flex gap-5">
            <div class="w-1/2">
              <div>
                <label for="username" class="form-label">Username</label>
                <input
                  id="username"
                  type="text"
                  class="form-control"
                  placeholder="Username"
                />
              </div>
              <div class="mt-3">
                <label for="first-name" class="form-label">First Name</label>
                <input
                  id="first-name"
                  type="text"
                  class="form-control"
                  placeholder="First Name"
                />
              </div>
              <div class="mt-3">
                <label>Role</label>
                <div class="mt-2">
                  <TomSelect
                    :options="{
                      placeholder: 'Select role',
                    }"
                    class="w-full"
                  >
                    <option
                      :value="role.id"
                      v-for="role in roles"
                      :key="role.id"
                    >
                      {{ role.roleName }}
                    </option>
                  </TomSelect>
                </div>
              </div>
              <div class="form-check mt-5">
                <input
                  id="send-mail"
                  class="form-check-input"
                  type="checkbox"
                  value=""
                />
                <label class="form-check-label" for="send-mail"
                  >Send email confirmation</label
                >
              </div>
            </div>
            <div class="w-1/2">
              <div>
                <label for="email" class="form-label">Email</label>
                <input
                  id="email"
                  type="email"
                  class="form-control"
                  placeholder="Email"
                />
              </div>
              <div class="mt-3">
                <label for="last-name" class="form-label">Last Name</label>
                <input
                  id="last-name"
                  type="text"
                  class="form-control"
                  placeholder="Last Name"
                />
              </div>
              <div class="mt-3">
                <label for="mobile-phone" class="form-label"
                  >Mobile Phone</label
                >
                <input
                  id="mobile-phone"
                  type="text"
                  class="form-control"
                  placeholder="Mobile phone"
                />
              </div>
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
          <button type="button" class="btn btn-outline-secondary mr-1">
            Cancel
          </button>
          <button type="button" class="btn btn-primary">Update User</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Uploader from "@/components/ImageUpload.vue";
import { useRoleStore } from "@/stores/role";
import { Role } from "@/types/Role";
import { ref } from "vue";

const roleStore = useRoleStore();

const formData = ref({
  attachments: {
    file: null,
    preview: "",
  },
});

const roles = ref<Role[]>(roleStore.roles);

const onUploadAttachment = async (fileUpload) => {
  const { file, preview } = fileUpload;
  formData.value.attachments = {
    ...formData.value.attachments,
    file: file,
    preview: preview,
  };
};
</script>
