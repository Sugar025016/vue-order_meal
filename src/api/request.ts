// src/api/request.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { useAuthStore } from "@/stores/auth";

import type { ApiResponse } from "@/types/response";

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || "http://localhost:8080/api",
  timeout: 10000,
});

// ✅ 請求攔截器
request.interceptors.request.use(
  (config) => {
    // 假設你有 token
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);
let isLoggingOut = false;
// ✅ 回應攔截器
request.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error: AxiosError<ApiResponse>) => {
    const authStore = useAuthStore();

    if (error.response) {
      const status = error.response.status;

      const data = error.response.data;

      switch (status) {
        case 400:
          showErrorToast(data?.message || "請求參數錯誤");
          break;
        case 401: // 未授權
          if (!isLoggingOut) {
            isLoggingOut = true;
            localStorage.removeItem("token");
            console.log("Unauthorized, redirecting to login...");
            authStore.user = null;
            authStore.token = null;
            showErrorToast(data?.message || "登入已過期，請重新登入");
            window.location.href = "/login";
          }
          break;
        case 403:
          showErrorToast(data?.message || "沒有權限訪問此資源");
          break;
        case 404:
          showErrorToast(data?.message || "找不到資源");
          break;
        case 422:
          showErrorToast(data?.message || "驗證錯誤");
          break;
        case 500:
          showErrorToast(data?.message || "伺服器錯誤，請稍後再試");
          break;
        default:
          showErrorToast(data?.message || "發生錯誤");
      }
    } else if (error.request) {
      showErrorToast(error?.request || "網路錯誤，請檢查網路連線");
      // 網路錯誤
      // showErrorToast("網路錯誤，請檢查網路連線");

      console.log("error request", error.request);
    } else {
      // 其他錯誤
      showErrorToast(error.message);
    }

    return Promise.reject(error);
  }
);
function showErrorToast(msg: string) {
  alert(msg); // 可替換成 Element Plus 的 ElMessage 或 toast
}
export default request;
