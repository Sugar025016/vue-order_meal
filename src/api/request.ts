// src/api/request.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { useUserStore } from "@/stores/user";

import type { ApiResponse } from "@/types/response";
import { ElLoading, ElMessage } from "element-plus";
import { useLoadingStore } from "@/stores/loading";

const request: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API || "http://localhost:8080/api",
  timeout: 10000,
});

// ✅ 請求攔截器
let loadingInstance: any = null;
let requestCount = 0;
request.interceptors.request.use(
  (config) => {
    requestCount++;
    if (requestCount === 1) {
      loadingInstance = ElLoading.service({
        lock: true,
        text: "載入中...",
        background: "rgba(0,0,0,0.3)",
      });
    }
    // if (requestCount === 0) {
    //   loadingInstance?.close();
    // }
    // 假設你有 token
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);
let isLoggingOut = false;
let last429Time = 0;
let lastNetworkErrorTime = 0;
// ✅ 回應攔截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    requestCount--;

    if (requestCount === 0) {
      loadingInstance?.close();
    }
    const loadingStore = useLoadingStore();
    loadingStore.finish(); // ✅ 結束 loading
    return response.data;
  },
  (error: AxiosError<ApiResponse>) => {
    requestCount--;
    if (requestCount === 0) {
      loadingInstance?.close();
    }
    const loadingStore = useLoadingStore();
    loadingStore.finish(); // ❗錯誤也要關
    const userStore = useUserStore();

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
            userStore.user = null;
            userStore.token = null;
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
        case 429:
          const now = Date.now();

          if (now - last429Time > 3000) {
            last429Time = now;

            ElMessage({
              message: "請求過於頻繁，請稍後再試",
              type: "error",
              grouping: true,
            });
          }
          break;
        default:
          showErrorToast(data?.message || "發生錯誤");
      }
    } else if (error.request) {
      const now = Date.now();

      if (now - lastNetworkErrorTime > 3000) {
        lastNetworkErrorTime = now;

        ElMessage({
          message: "網路錯誤，請檢查網路連線",
          type: "error",
          grouping: true,
        });
      }

      console.log("error request", error.request);
    } else {
      // 其他錯誤
      showErrorToast(error.message);
    }

    return Promise.reject(error);
  },
);
function showErrorToast(msg: string) {
  alert(msg); // 可替換成 Element Plus 的 ElMessage 或 toast
}
export default request;
