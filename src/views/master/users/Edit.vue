<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Edit User</h2>
  </div>

  <div class="intro-y box lg:mt-5 flex">
    <div class="w-full items-center">
      <form @submit.prevent="onSubmit">
        <div
          class="p-5 flex gap-4 w-full border-b border-slate-200/60 dark:border-darkmode-400"
        >
          <div class="w-full mb-8">
            <h2
              class="font-medium text-base pb-2 border-b border-slate-200/60 dark:border-darkmode-400"
            >
              User Details
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
                  />
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
                  />
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
import { useRoleStore } from "@/stores/role";
import { useUsers } from "@/stores/users";
import { Role } from "@/types/Role";
import { ref, toRefs, onMounted } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength, email } from "@vuelidate/validators";
import { useRoute, useRouter } from "vue-router";
import { useModalStore } from "@/stores/modal";
import { QueryParams } from "@/types/api/QueryParams";
import { User } from "@/types/Users";

const route = useRoute();
const router = useRouter();
const roleStore = useRoleStore();
const userStore = useUsers();
const modalStore = useModalStore();

const query = ref<QueryParams>({
  page: userStore.pagination.page,
  pageSize: userStore.pagination.pageSize,
});

const formData = ref<User>(userStore.user);

const rulesUser = {
  username: {
    required,
    minLength: minLength(4),
  },
  name: {
    required,
    minLength: minLength(2),
  },
  email: {
    required,
    email,
    minLength: minLength(4),
  },
  role_id: {
    required,
  },
};

const validate = useVuelidate(rulesUser, formData);

const roles = ref<Role[]>(roleStore.roles);

const onSubmit = async () => {
  validate.value.$touch();
  if (validate.value.$invalid) {
    console.log("invalid");
  } else {
    const { error } = await userStore.updateUser(
      String(formData.value._id),
      formData.value
    );
    if (!error) {
      modalStore.setModalAlertSuccess(
        true,
        "Changes Saved!",
        "Your update to the selected User has been applied."
      );
      router.push({ name: "settings-users" });
    }
  }
};

const findUser = async () => {
  await userStore.findUser(String(route.params.id));
  formData.value = userStore.user;
};

const getRoles = async () => {
  await roleStore.getRoles({ ...query.value });
  if (userStore.data.length === 0) {
    modalStore.setModalAlertNotFound(true);
  }

  // update ref value
  roles.value = roleStore.roles;
  query.value.page = userStore.pagination.page;
  query.value.pageSize = userStore.pagination.pageSize;
};

onMounted(async () => {
  await findUser();
  await getRoles();
});
</script>
