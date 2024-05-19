<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Investment</h2>
  </div>
  <!-- BEGIN: Page Layout -->
  <div class="grid grid-cols-12 gap-6 mt-5">
    <router-link
      v-if="
        authStore.permissions.includes('deposit.view') ||
        authStore.permissions.includes('withdrawal.view')
      "
      :to="{ name: depositNav.home.name }"
      class="intro-y col-span-12 md:col-span-3 lg:col-span-3 box py-10 hover:shadow-xl transition-all duration-500"
    >
      <NewspaperIcon class="block w-12 h-12 text-primary mx-auto" />
      <div class="font-medium text-center text-base mt-3">Deposit</div>
    </router-link>
  </div>
  <!-- END: Page Layout -->
</template>

<script setup lang="ts">
import { depositNav } from "@/router/investment";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>
