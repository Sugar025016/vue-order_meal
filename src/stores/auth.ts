import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import {
  loginApi,
  logoutApi,
  registerApi,
  verifyOtpApi,
  resendOtpApi,
} from "@/api/auth";
import { getUserApi } from "@/api/user";
import {
  type LoginRequest,
  RegisterRequest,
  User,
  VerifyOtpRequest,
} from "@/types/auth";
import { changeFavoriteApi } from "@/api/favorite";
import { useAddressStore } from "./address";
// import { type User } from "@/types/user";

export const useAuthStore = defineStore("auth", () => {
  // const token = ref<string | null>(null);
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const email = ref<string | null>(null);
  const token = ref<string | null>(localStorage.getItem("token"));
  const hasToken = computed(() => !!token.value);
  const addressStore = useAddressStore();
  const router = useRouter();
  // let favoriteShopIds = computed(() => user.value?.favoriteShopIds ?? []);
  // ✅ 取得使用者資料
  const getUser = async (): Promise<User | null> => {
    try {
      const res = await getUserApi();

      console.log("取得使用者資料:", res);
      if (res.status && res.data) {
        user.value = res.data;
        router.push("/");
      }
      return null;
    } catch (err: any) {
      console.error("取得使用者資料失敗:", err);
      return null;
    }
  };

  const changeFavorite = async (shopId: number) => {
    try {
      const res = await changeFavoriteApi(shopId);
      if (res.status && res.data) {
        console.log("changeFavoriteApi:", res.data);
        user.value!.favoriteShopIds = res.data;
        return true;
      }
    } catch (err: any) {
      console.error("取得使用者資料失敗:", err);
    }
    return false;
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
      email.value = params.email;
      if (token.value) {
        localStorage.setItem("token", token.value);
        return await getUser();
      }
      return null;
    } catch (err: any) {
      const status = err.response?.status;
      const data = err.response?.data;
      console.log("err.response", err.response);
      if (status === 403 && data?.message === "尚未驗證 Email") {
        email.value = params.email;
        // router.push({ name: "VerifyOtp", query: { email: params.email } });
        router.push("/verifyOtp");
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
    const router = useRouter();
    try {
      const res = await logoutApi();
      if (res.status) {
        // clear local state and storage
        user.value = null;
        token.value = null;
        await addressStore.clearAddress();
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

  const register = async (register: RegisterRequest) => {
    loading.value = true;
    register.phone = generateTaiwanPhone();
    try {
      const res = await registerApi(register);
      if (res.status) {
        console.log("register : ", res);
        email.value = res.data.email;
        console.log("email.value : ", email.value);
        router.push("/verifyOtp");
      }
    } catch (err: any) {
      error.value = err.response?.data?.message || "驗證 OTP 失敗";
      return null;
    } finally {
      loading.value = false;
    }
  };

  function generateTaiwanPhone() {
    const prefixes = ["09"]; // 台灣手機前綴
    const secondDigit = Math.floor(Math.random() * 10); // 0~9
    const rest = Math.floor(Math.random() * 10000000) // 7 位數
      .toString()
      .padStart(7, "0"); // 補零
    return `09${secondDigit}${rest}`;
  }

  const verifyOtp = async (otp: string) => {
    loading.value = true;
    if (!email.value) {
      router.push("/login");
      return;
    }
    try {
      const res = await verifyOtpApi(email.value, otp);

      token.value = res.data?.token ?? null;
      // ✅ 存 token 到 localStorage

      if (token.value) {
        localStorage.setItem("token", token.value);
        return await getUser();
      }

      console.log("驗證 OTP:+++++++", res);
      return res.status;
    } catch (err: any) {
      console.log("error", error);
      error.value = err.response?.data?.message || "驗證 OTP 失敗";
      return false;
    } finally {
      loading.value = false;
    }
  };

  const sendOtp = async () => {
    console.log("------resendOtp---------:", email);
    if (!email.value) {
      router.push("/login");
      return;
    }
    loading.value = true;
    try {
      const res = await resendOtpApi(email.value);
    } catch (err: any) {
      error.value = err.response?.data?.message || "驗證 OTP 寄送失敗";
      return null;
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    token,
    loading,
    error,
    hasToken,
    email,
    login,
    logout,
    getUser,
    changeFavorite,
    verifyOtp,
    register,
    sendOtp,
  };
});
