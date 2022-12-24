<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Roles</h2>
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
      <h2 class="font-medium text-base mr-auto">Manage Access & Permissions</h2>
    </div>
    <AccordionGroup class="accordion-boxed p-5">
      <AccordionItem v-for="feature in dataFeature" :key="feature">
        <Accordion> {{ feature }} </Accordion>
        <AccordionPanel
          class="text-slate-600 dark:text-slate-500 leading-relaxed"
        >
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
                    :checked="false"
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
        <button type="button" class="btn btn-primary w-20">Send</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const dataFeature = ref(["Report", "Invesment", "Master", "Setting"]);
const dataCrud = ref(["Select All", "Create", "Read", "Update", "Delete"]);
</script>
