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
      <form @submit.prevent="onSubmit">
        <div
          class="p-5 flex gap-4 w-full border-b border-slate-200/60 dark:border-darkmode-400"
        >
          <div class="w-2/3">
            <h2
              class="font-medium text-base pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
            >
              New user detail
            </h2>
            <div class="pt-4 flex gap-5">
              <div class="w-1/2">
                <div>
                  <label for="username" class="form-label">Username</label>
                  <input
                    readonly
                    id="username"
                    type="text"
                    class="form-control"
                    placeholder="Username"
                    name="username"
                    v-model.trim="validate.username.$model"
                  />

                  <template v-if="validate.username.$error">
                    <div
                      v-for="(error, index) in validate.username.$errors"
                      :key="index"
                      class="text-danger mt-2"
                      data-cy="error-field"
                    >
                      {{ error.$message }}
                    </div>
                  </template>
                </div>
                <div class="mt-3">
                  <label for="first-name" class="form-label">First Name</label>
                  <input
                    readonly
                    id="first-name"
                    type="text"
                    class="form-control"
                    placeholder="First Name"
                    name="firstName"
                    v-model.trim="validate.firstName.$model"
                  />

                  <template v-if="validate.firstName.$error">
                    <div
                      v-for="(error, index) in validate.firstName.$errors"
                      :key="index"
                      class="text-danger mt-2"
                      data-cy="error-field"
                    >
                      {{ error.$message }}
                    </div>
                  </template>
                </div>
                <div class="mt-3">
                  <label>Role</label>
                  <div class="mt-2">
                    <TomSelect
                      :options="{
                        placeholder: 'Select role',
                      }"
                      name="role"
                      class="w-full"
                      v-model="validate.role.$model"
                    >
                      <option
                        :value="role.id"
                        v-for="role in roles"
                        :key="role.id"
                      >
                        {{ role.roleName }}
                      </option>
                    </TomSelect>

                    <template v-if="validate.role.$error">
                      <div
                        v-for="(error, index) in validate.role.$errors"
                        :key="index"
                        class="text-danger mt-2"
                        data-cy="error-field"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                </div>
                <div class="form-check mt-5">
                  <input
                    readonly
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
                    readonly
                    id="email"
                    type="email"
                    class="form-control"
                    placeholder="Email"
                    name="email"
                    v-model.trim="validate.email.$model"
                  />

                  <template v-if="validate.email.$error">
                    <div
                      v-for="(error, index) in validate.email.$errors"
                      :key="index"
                      class="text-danger mt-2"
                      data-cy="error-field"
                    >
                      {{ error.$message }}
                    </div>
                  </template>
                </div>
                <div class="mt-3">
                  <label for="last-name" class="form-label">Last Name</label>
                  <input
                    readonly
                    id="last-name"
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                    name="lastName"
                    v-model.trim="validate.lastName.$model"
                  />

                  <template v-if="validate.lastName.$error">
                    <div
                      v-for="(error, index) in validate.lastName.$errors"
                      :key="index"
                      class="text-danger mt-2"
                      data-cy="error-field"
                    >
                      {{ error.$message }}
                    </div>
                  </template>
                </div>
                <div class="mt-3">
                  <label for="mobile-phone" class="form-label"
                    >Mobile Phone</label
                  >
                  <input
                    readonly
                    id="mobile-phone"
                    type="text"
                    class="form-control"
                    placeholder="Mobile phone"
                    name="mobilePhone"
                    v-model.trim="validate.mobilePhone.$model"
                  />

                  <template v-if="validate.mobilePhone.$error">
                    <div
                      v-for="(error, index) in validate.mobilePhone.$errors"
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
            <button type="submit" class="btn btn-primary" data-cy="btn-save">
              Update User
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import Uploader from "@/components/ImageUpload.vue";
import { useRoleStore } from "@/stores/role";
import { useUsers } from "@/stores/users";
import { Role } from "@/types/Role";
import { ref, toRefs, reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";
import { useRoute, useRouter } from "vue-router";
import { useModalStore } from "@/stores/modal";

const route = useRoute();
const router = useRouter();
const roleStore = useRoleStore();
const userStore = useUsers();
const modalStore = useModalStore();

const [dataEdit] = userStore.findById(route.params.id);

const formData = reactive({
  id: dataEdit.id,
  username: dataEdit.username,
  firstName: dataEdit.firstName,
  lastName: dataEdit.lastName,
  email: dataEdit.email,
  mobilePhone: dataEdit.mobilePhone,
  role: dataEdit.role,
  attachments: {
    file: null,
    preview: "",
  },
});

const rulesUser = {
  username: {
    required,
    minLength: minLength(4),
  },
  firstName: {
    required,
    minLength: minLength(2),
  },
  lastName: {
    minLength: minLength(2),
  },
  email: {
    required,
    email,
    minLength: minLength(4),
  },
  mobilePhone: {
    required,
    minLength: minLength(10),
  },
  role: {
    required,
  },
};

const validate = useVuelidate(rulesUser, toRefs(formData));

const roles = ref<Role[]>(roleStore.roles);

const onUploadAttachment = async (fileUpload) => {
  const { file, preview } = fileUpload;
  formData.attachments = {
    ...formData.attachments,
    file: file,
    preview: preview,
  };
};

const onSubmit = () => {
  validate.value.$touch();
  if (validate.value.$invalid) {
    console.log("invalid");
  } else {
    userStore.updateUser(dataEdit.id, {
      ...formData,
    });
    modalStore.setModalAlertSuccess(true);
    router.push({ name: "master-users" });
  }
};
</script>
