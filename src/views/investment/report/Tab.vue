<template>
  <!-- BEGIN: HTML Table Data -->
  <div>
    <div
      class="px-5 py-5 mt-5 intro-y box d-flex flex-nowrap bg-white"
      style="overflow-x: auto"
    >
      <ul class="nav">
        <li
          class="nav-item flex-1"
          role="presentation"
          v-if="authStore.permissions.includes('investment-report.view')"
        >
          <router-link
            v-if="authStore.permissions.includes('investment-report.view')"
            to="/report/deposit/placement"
            class="nav-link text-center"
            :class="{
              'text-blue-500': isMatch('/report/deposit/placement'),
            }"
          >
            <span class="py-4 cursor-pointer">Deposit</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { useRoute } from "vue-router";
const route = useRoute();

const authStore = useAuthStore();

const path = route.path;
const isMatch = (value: string) => {
  return path.substring(0, value.length) == value;
};
</script>
