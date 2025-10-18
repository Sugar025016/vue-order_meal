import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginApi, logoutApi } from "@/api/auth";
import { type LoginRequest, type User } from "@/types/auth";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(null);
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // 登入方法
  const login = async (params: LoginRequest): Promise<User | null> => {
    loading.value = true;
    error.value = null;
    try {
      const res = await loginApi(params);
      token.value = res.data?.token ?? null;
      user.value = res.data?.user ?? null;
      // ✅ 存 token 到 localStorage
      if (token.value) localStorage.setItem("token", token.value);
      return user.value;
    } catch (err: any) {
      error.value = err.response?.data?.message || "登入失敗";
      return null;
    } finally {
      loading.value = false;
    }
  };
  // 登出方法
  const logout = async () => {
    const router = useRouter();
    try {
      const res = await logoutApi();
      if (res.status) {
        // clear local state and storage
        user.value = null;
        token.value = null;
        localStorage.removeItem("token");
        // navigate to home
        router.push("/");
        // await window.location.reload();
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
