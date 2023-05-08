<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page">
      Create User
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
              New User Details
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
                    id="first-name"
                    type="text"
                    class="form-control"
                    placeholder="First Name"
                    name="firstName"
                    v-model.trim="validate.name.$model"
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
                <div class="mt-3">
                  <label>Role</label>
                  <div class="mt-2">
                    <TomSelect
                      :options="{
                        placeholder: 'Select role',
                      }"
                      name="role"
                      class="w-full"
                      v-model="validate.role_id.$model"
                    >
                      <option
                        :value="role._id"
                        v-for="role in roles"
                        :key="role._id"
                      >
                        {{ role.name }}
                      </option>
                    </TomSelect>

                    <template v-if="validate.role_id.$error">
                      <div
                        v-for="(error, index) in validate.role_id.$errors"
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
                    id="last-name"
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                    name="lastName"
                    v-model.trim="validate.lastname.$model"
                  />

                  <template v-if="validate.lastname.$error">
                    <div
                      v-for="(error, index) in validate.lastname.$errors"
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
                    id="mobile-phone"
                    type="text"
                    class="form-control"
                    placeholder="Mobile phone"
                    name="mobilePhone"
                    v-model.trim="validate.mobilephone.$model"
                  />

                  <template v-if="validate.mobilephone.$error">
                    <div
                      v-for="(error, index) in validate.mobilephone.$errors"
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
        </div>

        <!-- btn -->
        <div
          class="flex justify-end p-5 border-t border-slate-200/60 dark:border-darkmode-400"
        >
          <div>
            <button
              type="button"
              class="btn btn-outline-secondary mr-1"
              @click="router.push({ name: userNav.home.name })"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-primary"
              data-cy="btn-save"
              :disabled="isSaving"
            >
              Add User
              <LoadingIcon
                icon="three-dots"
                class="w-4 h-4 ml-2"
                v-show="isSaving"
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoleStore } from "@/stores/role";
import { useUsers } from "@/stores/users";
import { onMounted, ref } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";
import { useRouter } from "vue-router";
import { useModalStore } from "@/stores/modal";
import { User } from "@/types/Users";
import { storeToRefs } from "pinia";
import { useNavStore } from "@/stores/nav";
import { masterNav, userNav } from "@/router/master";

const router = useRouter();
const roleStore = useRoleStore();
const userStore = useUsers();
const modalStore = useModalStore();
const navStore = useNavStore();

navStore.create([masterNav.master, userNav.home, userNav.create]);

const formData = ref<User>({
  username: "",
  name: "",
  lastname: "",
  email: "",
  mobilephone: "",
  role_id: "",
});
const isSaving = ref<boolean>(false);

const rulesUser = {
  username: {
    required,
    minLength: minLength(4),
  },
  name: {
    required,
    minLength: minLength(2),
  },
  lastname: {
    minLength: minLength(2),
  },
  email: {
    required,
    email,
    minLength: minLength(4),
  },
  mobilephone: {
    required,
    minLength: minLength(10),
  },
  role_id: {
    required,
  },
};

const validate = useVuelidate(rulesUser, formData);

const { roles } = storeToRefs(roleStore);

const onSubmit = async () => {
  isSaving.value = true;
  validate.value.$touch();
  if (!validate.value.$invalid) {
    const { error } = await userStore.create(formData.value);
    if (!error) {
      modalStore.setModalAlertSuccess(
        true,
        "User Successfully Added!",
        "You have added a new User."
      );
      router.push({ name: userNav.home.name });
    }
  }
  isSaving.value = false;
};

const getRoles = async () => {
  await roleStore.get({
    page: 1,
    pageSize: 100,
  });
};

onMounted(async () => {
  await getRoles();
});
</script>
