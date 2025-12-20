import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { getUserApi, updateNameApi } from "@/api/user";
import { type User } from "@/types/user";
import { changeFavoriteApi } from "@/api/favorite";
import { useAddressStore } from "./address";
// import { type User } from "@/types/user";

export const useUserStore = defineStore("user", () => {
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

  const clearProFile = async () => {
    user.value = null;
  };

  const updateName = async (newName: string) => {
    const res = await updateNameApi(newName);
    if (res.status && user.value?.name) user.value.name = newName;
    return res;
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
    clearProFile,
    updateName
  };
});
