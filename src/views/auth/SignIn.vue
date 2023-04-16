<template>
  <div
    :class="[
      '-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary dark:bg-darkmode-800',
      'before:hidden before:content-[\'\'] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400',
      'after:hidden after:content-[\'\'] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700',
    ]"
  >
    <div class="container sm:px-10">
      <div class="block">
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <div class="h-screen flex py-5 my-10">
          <div
            class="my-auto mx-auto bg-white dark:bg-darkmode-600 px-5 sm:px-8 py-8 rounded-md shadow-md w-full sm:w-3/4 lg:w-2/4"
          >
            <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
            >
              Sign In
            </h2>
            <form @submit.prevent="onSubmit">
              <div class="intro-x mt-8">
                <input
                  type="text"
                  class="intro-x login__input form-control py-3 px-4 block"
                  name="username"
                  v-model="formData.username"
                  placeholder="Email"
                />
                <input
                  type="password"
                  class="intro-x login__input form-control py-3 px-4 block mt-4"
                  name="password"
                  v-model="formData.password"
                  placeholder="Password"
                />
              </div>
              <div
                class="intro-x flex text-slate-600 dark:text-slate-500 text-xs sm:text-sm mt-4"
              >
                <div class="flex items-center mr-auto">
                  <input
                    id="remember-me"
                    type="checkbox"
                    class="form-check-input border mr-2"
                  />
                  <label class="cursor-pointer select-none" for="remember-me"
                    >Remember me</label
                  >
                </div>
              </div>
              <div class="intro-x mt-5 xl:mt-8 text-center">
                <button
                  type="submit"
                  class="btn btn-primary py-3 px-4 w-full xl:w-32 xl:mr-3 align-top"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { reactive } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const formData = reactive({
  username: "",
  password: "",
});

const onSubmit = async () => {
  const res = await authStore.login(formData.username, formData.password);
  if (res.success) {
    if (authStore.returnUrl) {
      router.push(authStore.returnUrl);
    } else {
      router.push("/");
    }
  }
};
</script>
