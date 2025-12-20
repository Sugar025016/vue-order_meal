import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import {
  loginApi,
  logoutApi,
  registerApi,
  verifyOtpApi,
  resendOtpApi,
  verifyPasswordApi,
  changePasswordApi,
} from "@/api/auth";
import { type LoginRequest, PwdChangeRequest, RegisterRequest } from "@/types/auth";
import { type User } from "@/types/user";
import { useAddressStore } from "./address";
import { useUserStore } from "./user";

export const useAuthStore = defineStore("auth", () => {
  // const token = ref<string | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);
  const email = ref<string | null>(null);
  const token = ref<string | null>(localStorage.getItem("token"));
  const isPasswordVerified = ref(false);
  const hasToken = computed(() => !!token.value);
  const addressStore = useAddressStore();
  const userStore = useUserStore();
  const router = useRouter();

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
        return await userStore.getUser();
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
    try {
      const res = await logoutApi();
      if (res.status) {
        // clear local state and storage
        await userStore.clearProFile();
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
        return await userStore.getUser();
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

  const verifyPassword = async (password: string) => {
    loading.value = true;
    error.value = "";
    try {
      const res = await verifyPasswordApi(password);
      isPasswordVerified.value = res.status;
      console.log("verifyPasswordApi:", res);
      return res;
    } catch (err: any) {
      error.value = err.response?.data?.message || "驗證密碼失敗";
      return null;
    } finally {
      loading.value = false;
    }
  };

  const changePassword = async (
    pwdChangeRequest: PwdChangeRequest
  ) => {
    loading.value = true;
    error.value = "";
    try {
      const res = await changePasswordApi(pwdChangeRequest);
      return res;
    } catch (err: any) {
      error.value = err.response?.data?.message || "更改密碼失敗";
      return null;
    } finally {
      loading.value = false;
    }
  };
  const resetVerification = () => {
    isPasswordVerified.value = false;
  };

  return {
    token,
    loading,
    error,
    hasToken,
    email,
    login,
    logout,
    verifyOtp,
    register,
    sendOtp,
    verifyPassword,
    resetVerification,
    changePassword,
  };
});
