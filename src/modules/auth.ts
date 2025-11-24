import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginApi, logoutApi } from "@/api/auth";
import { getUserApi } from "@/api/user";
import { type LoginRequest, User } from "@/types/auth";
import { Email } from "@vicons/carbon";
// import { type User } from "@/types/user";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const router = useRouter();
  // ✅ 取得使用者資料
  const getUser = async (): Promise<User | null> => {
    try {
      const res = await getUserApi();

      console.log("取得使用者資料:", res);
      if (res.status && res.data) {
        console.log("取得使用者資料:", res);
        user.value = res.data;
        return res.data;
      }
      return null;
    } catch (err: any) {
      console.error("取得使用者資料失敗:", err);
      return null;
    }
  };

  // 登入方法
  const login = async (params: LoginRequest): Promise<User | null> => {
    loading.value = true;
    error.value = null;
    try {
      const res = await loginApi(params);
      token.value = res.data?.token ?? null;
      // ✅ 存 token 到 localStorage

      console.log("token:", token.value);
      if (token.value) {
        localStorage.setItem("token", token.value);
        return await getUser();
      }
      return null;
    } catch (err: any) {
      const status = err.response?.status;
      const data = err.response?.data;
      if (status === 403 && data?.message === "尚未驗證 Email") {
        email.value=params.email ;
        router.push({ name: "VerifyOtp", query: { email: params.email } });
      } else {
        error.value = data?.message || "登入失敗";
      }
      // error.value = err.response?.data?.message || "登入失敗";
      return null;
    } finally {
      loading.value = false;
    }
  };
  // 登出方法
  const logout = async () => {
    try {
      const res = await logoutApi();
      if (res.status) {
        // clear local state and storage
        user.value = null;
        token.value = null;
        localStorage.removeItem("token");
        await window.location.reload();
        // navigate to home
        router.push("/");
        return res;
      } else {
        return Promise.reject(new Error(res.message));
      }
    } catch (err) {
      return Promise.reject(err);
    }
  };

  return { user, token, loading, error, login, logout };
});
