<template>
  <Menu />
  <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
    <h2 class="text-lg font-medium mr-auto" data-cy="title-page"></h2>
    <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
      <button
        v-if="authStore.permissions.includes('deposit.create')"
        data-test="btn-create"
        class="btn btn-primary shadow-md mr-2"
        data-cy="btn-create"
      >
        New Placement
      </button>
    </div>
  </div>
  <div class="intro-y box p-5 mt-5">
    <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
      <div id="tabulator-html-filter-form" class="md:flex xl:flex sm:mr-auto">
        <div class="sm:flex items-center sm:mr-4 mt-2 xl:mt-0">
          <input
            id="tabulator-html-filter-value"
            type="search"
            class="form-control w-full md:w-80 xl:w-80 2xl:w-full mt-2 sm:mt-0"
            placeholder="Search..."
          />
        </div>
        <div class="mt-2 xl:mt-0 sm:mr-4">
          <Dropdown data-cy="btn-sort">
            <DropdownToggle class="btn btn-primary" type="button">
              Sort by
              <ChevronDownIcon class="w-4 h-4 ml-2" />
            </DropdownToggle>
            <DropdownMenu class="w-48">
              <DropdownContent>
                <DropdownItem data-cy="sort-desc">
                  <ArrowUpIcon class="w-4 h-4 mr-2" /> Newest
                </DropdownItem>
                <DropdownItem data-cy="sort-asc">
                  <ArrowDownIcon class="w-4 h-4 mr-2" /> Oldest
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div class="mt-2 xl:mt-0 sm:mr-4">
          <Dropdown data-cy="btn-sort">
            <DropdownToggle class="btn btn-primary" type="button">
              Form Status
              <ChevronDownIcon class="w-4 h-4 ml-2" />
            </DropdownToggle>
            <DropdownMenu class="w-48">
              <DropdownContent>
                <DropdownItem data-cy="sort-desc">
                  <ArrowUpIcon class="w-4 h-4 mr-2" /> Newest
                </DropdownItem>
                <DropdownItem data-cy="sort-asc">
                  <ArrowDownIcon class="w-4 h-4 mr-2" /> Oldest
                </DropdownItem>
              </DropdownContent>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div class="mt-2 xl:mt-0 sm:mr-8">
          <div class="relative w-56 mx-auto">
            <div
              class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400"
            >
              <CalendarIcon class="w-4 h-4" />
            </div>
            <Litepicker
              v-model="date"
              :options="{
                autoApply: false,
                singleMode: false,
                numberOfColumns: 2,
                numberOfMonths: 2,
                showWeekNumbers: true,
                dropdowns: {
                  minYear: 1990,
                  maxYear: null,
                  months: true,
                  years: true,
                },
              }"
              class="pl-12"
            />
          </div>
        </div>
        <div class="mt-2 xl:mt-0 sm:ml-4">
          <div class="relative w-56 mx-auto">
            <div
              class="absolute flex items-center justify-center w-10 h-full border rounded-l bg-slate-100 text-slate-500 dark:bg-darkmode-700 dark:border-darkmode-800 dark:text-slate-400"
            >
              <CalendarIcon class="w-4 h-4" />
            </div>
            <Litepicker
              v-model="dueDate"
              :options="{
                autoApply: false,
                singleMode: false,
                numberOfColumns: 2,
                numberOfMonths: 2,
                showWeekNumbers: true,
                dropdowns: {
                  minYear: 1990,
                  maxYear: null,
                  months: true,
                  years: true,
                },
              }"
              class="pl-12"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="overflow-x-auto scrollbar-hidden">
      <table class="table table-striped mt-4">
        <thead>
          <tr>
            <th class="whitespace-nowrap">Bilyet Number</th>
            <th class="whitespace-nowrap">Deposit Form Number</th>
            <th class="whitespace-nowrap">Placement Date</th>
            <th class="whitespace-nowrap text-center">Bank</th>
            <th class="whitespace-nowrap text-center">Account</th>
            <th class="whitespace-nowrap text-center">Owner</th>
            <th class="whitespace-nowrap text-center">Amount of Placement</th>
            <th class="whitespace-nowrap text-center">Placement Remaining</th>
            <th class="whitespace-nowrap text-center">Base Date</th>
            <th class="whitespace-nowrap text-center">Tenor</th>
            <th class="whitespace-nowrap text-center">Due Date</th>
            <th class="whitespace-nowrap text-center">Interest Rate</th>
            <th class="whitespace-nowrap text-center">Tax Rate</th>
            <th class="whitespace-nowrap text-center">
              Amount of Interest (net)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BILYET001</td>
            <td>DP/04/2024/001</td>
            <td>09/04/2024</td>
            <td>BCA</td>
            <td>Jul Mapuce</td>
            <td>Jul Mapuce</td>
            <td>Rp. 400,000,000</td>
            <td>Rp. 400,000,000</td>
            <td>366 days</td>
            <td>60 days</td>
            <td>09/06/2024</td>
            <td>7%</td>
            <td>20%</td>
            <td>Rp. 3,672,131</td>
          </tr>
        </tbody>
      </table>

      <Pagination :current-page="1" :last-page="1" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Menu from "../Tab.vue";
import { useAuthStore } from "@/stores/auth";
import { roleNav } from "@/router/master";

const authStore = useAuthStore();

const date = ref("placement date");
const dueDate = ref("due date");
</script>
