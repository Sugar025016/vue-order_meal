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

  return {
    user,
    token,
    loading,
    error,
    hasToken,
    email,
    getUser,
    changeFavorite,
  };
});
