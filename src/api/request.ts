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

    // console.log('Request token:', localStorage)
    console.log("Request token:", token);
    console.log("Request Config:", config);
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 回應攔截器
request.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  // (error) => {
  //   console.error('API Error:', error)
  //   return Promise.reject(error)
  // }
  (error: AxiosError<ApiResponse>) => {
    const authStore = useAuthStore();

    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 401: // 未授權
          authStore.logout();
          showErrorToast("登入已過期，請重新登入");
          break;
        case 403:
          showErrorToast("沒有權限訪問此資源");
          break;
        case 500:
          showErrorToast("伺服器錯誤，請稍後再試");
          break;
        default:
          showErrorToast(error.response.data?.message || "發生錯誤");
      }
    } else if (error.request) {
      // 網路錯誤
      showErrorToast("網路錯誤，請檢查網路連線");
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
