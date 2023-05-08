<template>
  <div class="intro-y flex items-center mt-8">
    <h2 class="text-lg font-medium mr-auto">Master</h2>
  </div>
  <!-- BEGIN: Page Layout -->
  <div class="grid grid-cols-12 gap-6 mt-5">
    <router-link
      v-if="authStore.permissions.includes('role.view')"
      :to="{ name: roleNav.home.name }"
      class="intro-y col-span-12 md:col-span-3 lg:col-span-3 box py-10 hover:shadow-xl transition-all duration-500"
    >
      <ShieldCheckIcon class="block w-12 h-12 text-primary mx-auto" />
      <div class="font-medium text-center text-base mt-3">Roles</div>
    </router-link>
    <router-link
      v-if="authStore.permissions.includes('user.view')"
      :to="{ name: userNav.home.name }"
      class="intro-y col-span-12 md:col-span-3 lg:col-span-3 box py-10 hover:shadow-xl transition-all duration-500"
    >
      <UsersIcon class="block w-12 h-12 text-primary mx-auto" />
      <div class="font-medium text-center text-base mt-3">Users</div>
    </router-link>
    <router-link
      v-if="authStore.permissions.includes('bank.view')"
      :to="{ name: 'master-bank' }"
      class="intro-y col-span-12 md:col-span-3 lg:col-span-3 box py-10 hover:shadow-xl transition-all duration-500"
    >
      <LandmarkIcon class="block w-12 h-12 text-primary mx-auto" />
      <div class="font-medium text-center text-base mt-3">Bank</div>
    </router-link>
    <router-link
      v-if="authStore.permissions.includes('owner.view')"
      :to="{ name: 'master-owner' }"
      class="intro-y col-span-12 md:col-span-3 lg:col-span-3 box py-10 hover:shadow-xl transition-all duration-500"
    >
      <UserCheckIcon class="block w-12 h-12 text-primary mx-auto" />
      <div class="font-medium text-center text-base mt-3">Owner</div>
    </router-link>
  </div>
  <!-- END: Page Layout -->
</template>

<script setup lang="ts">
import { masterNav, roleNav, userNav } from "@/router/master";
import { useAuthStore } from "@/stores/auth";
import { useNavStore } from "@/stores/nav";

const authStore = useAuthStore();
const navStore = useNavStore();
navStore.create([masterNav.master]);
</script>
