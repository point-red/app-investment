import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import globalComponents from "./global-components";
import utils from "./utils";
import "./assets/css/app.css";
import "vue3-toastify/dist/index.css";
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";

const app = createApp(App).use(router).use(createPinia());

globalComponents(app);
utils(app);
app.use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions);
app.component("VSelect", vSelect);
app.mount("#app");
