import { ErrorResponse } from "@/types/api/ApiResponse";
import cookie from "@point-hub/vue-cookie";
import router from "@/router";
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "vue3-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 600 * 2 * 100,
});

api.defaults.headers.common["Authorization"] = `Bearer ${cookie.get("token")}`;

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { status, config } = (error.response as AxiosResponse) ?? {};
    if (error.response?.data) {
      const data = error.response?.data as ErrorResponse;
      switch (status) {
        case 401: {
          if (config.method != "delete") {
            toast.error(data.message);
            localStorage.removeItem("name");
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            localStorage.removeItem("permissions");
            cookie.remove("token");
            router.push({ name: "sign-in" });
          }
          break;
        }
        case 403: {
          toast.error(data.message);
          break;
        }
        case 422: {
          toast.error(data.message);
          break;
        }
        case 500: {
          toast.error(data.message);
          break;
        }
        default: {
          // "Unknown error occurred"
          break;
        }
      }
    }
  }

  throw error;
};

api.interceptors.response.use(onResponse, onErrorResponse);

export default api;
