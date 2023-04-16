<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page">Roles</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button
        data-cy="btn-back"
        @click="router.push({ name: 'master-roles' })"
        class="btn btn-primary shadow-md mr-2"
      >
        Back
      </button>
    </div>
  </div>
  <div class="intro-y box lg:mt-5">
    <div
      class="flex items-center p-5 border-b border-slate-200/60 dark:border-darkmode-400"
    >
      <h2 class="font-medium text-base mr-auto" data-cy="subtitle-page">
        Manage Access & Permissions
      </h2>
    </div>
    <AccordionGroup class="accordion-boxed p-5">
      <AccordionItem v-for="feature in dataFeature" :key="feature">
        <Accordion> {{ feature }} </Accordion>
        <AccordionPanel
          class="text-slate-600 dark:text-slate-500 leading-relaxed"
        >
          <div
            class="inbox__item inline-block sm:block text-slate-600 dark:text-slate-500 bg-white dark:bg-darkmode-400/70 border-b border-slate-200/60 dark:border-darkmode-400"
          >
            <label
              :for="`${feature}-All`"
              class="cursor-pointer flex px-5 py-3"
            >
              <div class="flex-1 flex items-center mr-5">
                <span class="inbox__item--sender truncate"> Select All </span>
              </div>
              <div class="inbox__item--time whitespace-nowrap ml-auto pl-10">
                <input
                  :id="`${feature}-All`"
                  class="form-check-input flex-none"
                  type="checkbox"
                  :checked="checkPermissions(feature)"
                  @click="togglePermissionsAll(feature)"
                />
              </div>
            </label>
          </div>
          <div class="intro-y" v-for="data in dataCrud" :key="data">
            <div
              class="inbox__item inline-block sm:block text-slate-600 dark:text-slate-500 bg-white dark:bg-darkmode-400/70 border-b border-slate-200/60 dark:border-darkmode-400"
            >
              <label
                :for="`${feature}-${data}`"
                class="cursor-pointer flex px-5 py-3"
              >
                <div class="flex-1 flex items-center mr-5">
                  <span class="inbox__item--sender truncate">
                    {{ data }}
                  </span>
                </div>
                <div class="inbox__item--time whitespace-nowrap ml-auto pl-10">
                  <input
                    :id="`${feature}-${data}`"
                    class="form-check-input flex-none"
                    type="checkbox"
                    :checked="
                      role.permissions.includes(
                        `${feature.toLowerCase()}.${data.toLowerCase()}`
                      )
                    "
                    @click="togglePermissions(feature, data)"
                  />
                </div>
              </label>
            </div>
          </div>
        </AccordionPanel>
      </AccordionItem>
    </AccordionGroup>

    <div
      class="flex justify-end p-5 border-t border-slate-200/60 dark:border-darkmode-400"
    >
      <div>
        <button type="button" class="btn btn-outline-secondary w-20 mr-1">
          Cancel
        </button>
        <button
          type="button"
          class="btn btn-primary w-20"
          data-cy="btn-save"
          @click="updateRole"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoleStore } from "@/stores/role";
import { useRouter, useRoute } from "vue-router";
import { Role } from "@/types/Role";
import { useModalStore } from "@/stores/modal";

const router = useRouter();
const route = useRoute();
const roleStore = useRoleStore();
const modalStore = useModalStore();

const role = ref<Role>(roleStore.role);

const togglePermissions = (feature: string, data: string) => {
  const key = `${feature.toLowerCase()}.${data.toLowerCase()}`;
  if (role.value.permissions.includes(key)) {
    const index = role.value.permissions.indexOf(key);
    role.value.permissions.splice(index, 1);
  } else {
    role.value.permissions.push(key);
  }
};

const togglePermissionsAll = (feature: string) => {
  const checkPermission = checkPermissions(feature);
  for (const crud of dataCrud.value) {
    const key = `${feature.toLowerCase()}.${crud.toLowerCase()}`;
    if (role.value.permissions.includes(key)) {
      if (checkPermission) {
        const index = role.value.permissions.indexOf(key);
        role.value.permissions.splice(index, 1);
      }
    } else {
      if (!checkPermission) {
        role.value.permissions.push(key);
      }
    }
  }
};

const checkPermissions = (feature: string) => {
  let isTrue = true;

  if (role.value.permissions.length === 0) {
    return false;
  }

  for (const crud of dataCrud.value) {
    if (
      !role.value.permissions.includes(
        `${feature.toLowerCase()}.${crud.toLowerCase()}`
      )
    ) {
      isTrue = false;
      break;
    }
  }

  return isTrue;
};

const getRole = async () => {
  await roleStore.findRole(route.params.id as string);

  // update ref value
  role.value = roleStore.role;
};

const updateRole = async () => {
  const { error } = await roleStore.updateRole(
    role.value._id as string,
    role.value
  );

  if (!error) {
    modalStore.setModalAlertSuccess(
      true,
      "Updated Successfully",
      "You have successfully updated the Roles permission and access for the selected Role."
    );
    router.push({ name: "master-roles" });
  }
};

onMounted(async () => {
  await getRole();
});

const dataFeature = ref(["User", "Role", "Owner", "Bank"]);
const dataCrud = ref(["Create", "View", "Update", "Delete"]);
</script>
