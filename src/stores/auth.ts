import api from "@/api";
import { defineStore } from "pinia";
import cookie from "@point-hub/vue-cookie";
import router from "@/router";
import { useRoleStore } from "@/stores/role";
import { useUsers } from "@/stores/users";

const url = "/auth";

export interface User {
  _id?: string;
  name: string;
  username: string;
  email: string;
}

export type RootState = {
  permissions: string[];
  user: User;
  returnUrl: string | null;
};

export const useAuthStore = defineStore("auth", {
  state: () =>
    ({
      permissions: localStorage.getItem("permissions")
        ? JSON.parse(localStorage.getItem("permissions") as string)
        : [],
      user: {
        name: localStorage.getItem("name"),
        username: localStorage.getItem("username"),
        email: localStorage.getItem("email"),
      },
      returnUrl: null,
    } as RootState),
  getters: {
    // permissions(state) {
    //   return state.permissions;
    // },
  },
  actions: {
    setPermissions(payload: string[]) {
      this.permissions = payload;
    },
    async login(username: string, password: string) {
      try {
        const user = await api.post(url + "/signin", {
          username,
          password,
        });

        this.user = user.data;

        localStorage.setItem("name", user.data.name);
        localStorage.setItem("username", user.data.username);
        localStorage.setItem("email", user.data.email);
        localStorage.setItem(
          "permissions",
          JSON.stringify(user.data.role.permissions)
        );
        this.permissions = JSON.parse(
          localStorage.getItem("permissions") as string
        );

        cookie.set("token", user.data.accessToken);

        // set instance after receive token
        api.defaults.headers.common["Authorization"] = `Bearer ${cookie.get(
          "token"
        )}`;

        // await this.getPermissions();
        if (this.returnUrl) {
          router.push(this.returnUrl);
        } else {
          router.push("/");
        }
        return { success: true };
      } catch (error) {
        return { success: false, error };
      }
    },
    async getPermissions(): Promise<boolean> {
      try {
        const verify = await api.post<User>(url + "/verify-token");
        if (verify.data._id) {
          const roleStore = useRoleStore();
          const userStore = useUsers();
          await userStore.findUser(verify.data._id);
          await roleStore.find(String(userStore.user.role_id));
          localStorage.setItem(
            "permissions",
            JSON.stringify(roleStore.role.permissions)
          );
        }

        return false;
      } catch (error) {
        return false;
      }
    },
    logout() {
      localStorage.removeItem("name");
      localStorage.removeItem("username");
      localStorage.removeItem("email");
      localStorage.removeItem("permissions");
      cookie.remove("token");
      router.push({ name: "sign-in" });
    },
  },
});
