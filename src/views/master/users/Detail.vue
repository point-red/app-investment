<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Detail User</h2>
    <Dropdown>
      <DropdownToggle class="btn btn-secondary" data-cy="btn-setting">
        <SettingsIcon class="w-5 h-5" />
      </DropdownToggle>
      <DropdownMenu class="w-48">
        <DropdownContent>
          <DropdownItem data-cy="btn-edit" @click="onClickEdit(user)">
            <Edit2Icon class="w-4 h-4 mr-2" /> Edit
          </DropdownItem>
        </DropdownContent>
      </DropdownMenu>
    </Dropdown>
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
            User info
          </h2>
          <div class="pt-4 flex gap-5">
            <div class="w-2/3">
              <table class="table table-bordered w-full">
                <tbody>
                  <tr>
                    <td class="font-bold">Username</td>
                    <td>
                      {{ user.username }}
                    </td>
                  </tr>
                  <tr>
                    <td class="font-bold">Name</td>
                    <td>
                      {{
                        user.name + (user.lastname ? " " + user.lastname : "")
                      }}
                    </td>
                  </tr>
                  <tr>
                    <td class="font-bold">Role</td>
                    <td>{{ user.role?.name }}</td>
                  </tr>
                  <tr>
                    <td class="font-bold">Email</td>
                    <td>{{ user.email }}</td>
                  </tr>
                  <tr>
                    <td class="font-bold">Mobile Phone</td>
                    <td>{{ user.mobilephone }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex justify-end p-5 border-t border-slate-200/60 dark:border-darkmode-400"
      >
        <div>
          <button
            type="button"
            @click="router.push({ name: userNav.setting.name })"
            class="btn btn-primary"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUsers } from "@/stores/users";
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { User } from "@/types/Users";
import { useNavStore } from "@/stores/nav";
import { masterNav, userNav } from "@/router/master";

const route = useRoute();
const router = useRouter();
const userStore = useUsers();
const navStore = useNavStore();

navStore.create([
  masterNav.master,
  userNav.home,
  userNav.setting,
  userNav.detail,
]);

const { user } = storeToRefs(userStore);

const onClickEdit = (user: User) => {
  router.push({ name: userNav.edit.name, params: { id: user._id } });
};

const findUser = async () => {
  await userStore.find(String(route.params.id), { includes: "role" });
};

onMounted(async () => {
  await findUser();
});
</script>
