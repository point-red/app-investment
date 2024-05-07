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
          v-if="authStore.permissions.includes('deposit.view')"
        >
          <router-link
            v-if="authStore.permissions.includes('deposit.view')"
            to="/deposit/placement"
            class="nav-link text-center w-full"
            :class="{ 'text-blue-500': isMatch('/deposit/placement') }"
          >
            <span class="py-4 cursor-pointer w-full">Deposit Placement</span>
          </router-link>
        </li>
        <li
          class="nav-item flex-1"
          role="presentation"
          v-if="authStore.permissions.includes('deposit.view')"
        >
          <router-link
            v-if="authStore.permissions.includes('deposit.view')"
            to="/deposit/cashback"
            class="nav-link text-center w-full"
            :class="{ 'text-blue-500': isMatch('/deposit/cashback') }"
          >
            <span class="py-4 cursor-pointer w-full">Deposit Cashback</span>
          </router-link>
        </li>
        <li
          class="nav-item flex-1"
          role="presentation"
          v-if="authStore.permissions.includes('deposit.view')"
        >
          <router-link
            v-if="authStore.permissions.includes('deposit.view')"
            to="/deposit/interest"
            class="nav-link text-center w-full"
            :class="{ 'text-blue-500': isMatch('/deposit/interest') }"
          >
            <span class="py-4 cursor-pointer w-full">Realised Interest</span>
          </router-link>
        </li>
        <li
          class="nav-item flex-1"
          role="presentation"
          v-if="authStore.permissions.includes('withdrawal.view')"
        >
          <router-link
            to="/deposit/withdrawal"
            class="nav-link text-center w-full"
            :class="{ 'text-blue-500': isMatch('/deposit/withdrawal') }"
          >
            <span class="py-4 cursor-pointer w-full">Deposit Withdrawal</span>
          </router-link>
        </li>
        <li
          class="nav-item flex-1"
          role="presentation"
          v-if="authStore.permissions.includes('deposit.view')"
        >
          <router-link
            to="/deposit/renewal"
            class="nav-link text-center w-full"
            :class="{ 'text-blue-500': isMatch('/deposit/renewal') }"
          >
            <span class="py-4 cursor-pointer w-full">Deposit Renewal</span>
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
