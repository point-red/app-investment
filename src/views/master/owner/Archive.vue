<template>
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Archive Owner</h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button
        data-test="btn-create"
        @click="router.push({ name: 'master-owner' })"
        class="btn btn-primary shadow-md mr-2"
      >
        Back
      </button>
    </div>
  </div>
  <!-- BEGIN: HTML Table Data -->
  <div class="intro-y box p-5 mt-5">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <div id="tabulator-html-filter-form" class="md:flex xl:flex sm:mr-auto">
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <input
            id="tabulator-html-filter-value"
            v-model="searchTerm"
            type="search"
            class="form-control w-full md:w-80 xl:w-80 2xl:w-full mt-2 sm:mt-0"
            placeholder="Search Role..."
          />
        </div>
        <div class="mt-2 xl:mt-0">
          <Dropdown data-test="btn-sort">
            <DropdownToggle class="btn btn-primary" type="button">
              Sort by
              <ChevronDownIcon class="w-4 h-4 ml-2" />
            </DropdownToggle>
            <DropdownMenu class="w-48">
              <DropdownContent>
                <DropdownItem>
                  <ArrowUpIcon class="w-4 h-4 mr-2" /> Newest
                </DropdownItem>
                <DropdownItem>
                  <ArrowDownIcon class="w-4 h-4 mr-2" /> Older
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <table class="table table-striped mt-4">
        <thead>
          <tr>
            <th class="whitespace-nowrap">#</th>
            <th class="whitespace-nowrap">ROLE NAME</th>
            <th class="whitespace-nowrap">CREATED AT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(owner, index) in tableData" :key="owner.id">
            <td>{{ index + 1 }}</td>
            <td>{{ `${owner.firstName} ${owner.lastName}` }}</td>
            <td>{{ owner.createdAt }}</td>
          </tr>
        </tbody>
      </table>

      <div
        class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center mt-6"
      >
        <select class="w-20 form-select box mt-3 sm:mt-0 sm:mr-auto">
          <option>10</option>
          <option>25</option>
          <option>35</option>
          <option>50</option>
        </select>
        <nav class="w-full sm:w-auto">
          <ul class="pagination">
            <li class="page-item">
              <a class="page-link" href="#">
                <ChevronsLeftIcon class="w-4 h-4" />
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                <ChevronLeftIcon class="w-4 h-4" />
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">...</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">...</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                <ChevronRightIcon class="w-4 h-4" />
              </a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">
                <ChevronsRightIcon class="w-4 h-4" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
  <!-- END: HTML Table Data -->
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useModalStore } from "@/stores/modal";
import { useOwnersStore } from "@/stores/owner";
import { Owner } from "@/types/Owner";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const modalStore = useModalStore();
const ownerStore = useOwnersStore();

const dialogDelete = ref(false);
const modalDetailOwner = ref(false);
const modalDelete = ref(false);
const modalSuccess = ref(false);

const modalFormRequestDelete = ref(false);

const searchTerm = ref("");
const tableData = ref<Owner[]>(ownerStore.owners);
const form = ref({
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  note_request: "",
  createdAt: "",
});
</script>
