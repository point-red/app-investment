<template>
  <!-- BEGIN: HTML Table Data -->
  <div>
    <div
      class="px-5 py-5 mt-5 intro-y box d-flex flex-nowrap bg-white"
      style="overflow-x: auto"
    >
      <ul class="nav">
        <li class="nav-item flex-1" role="presentation">
          <router-link
            to="/deposit/placement"
            class="nav-link text-center w-full"
            :class="{ 'text-blue-500': isMatch('/deposit/placement') }"
          >
            <span class="py-4 cursor-pointer w-full">Deposit Placement</span>
          </router-link>
        </li>
        <Tab :fullWidth="true" :class="'text-center'">
          <span class="py-4 cursor-pointer w-full"> Deposit Cashback </span>
        </Tab>
        <Tab :fullWidth="true" :class="'text-center'">
          <span class="py-4 cursor-pointer w-full"> Realised Interest </span>
        </Tab>
        <Tab :fullWidth="true" :class="'text-center'">
          <span class="py-4 cursor-pointer w-full"> Deposit Withdrawal </span>
        </Tab>
        <Tab :fullWidth="true" :class="'text-center'">
          <span class="py-4 cursor-pointer w-full"> Deposit Renewal </span>
        </Tab>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();

const path = route.path;
const isMatch = (value: string) => {
  return path.substring(0, value.length) == value;
};
</script>
