import { defineStore } from "pinia";
import { ref } from "vue";
import { CartShop, AddCartRequest, UpdataCartRequest } from "@/types/cart";
import {
  getCartApi,
  getCartsApi,
  addCartApi,
  deleteCartShopApi,
  updateCartApi,
  deleteCartItemApi,
} from "@/api/cart";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";

export const useCartShopStore = defineStore("cart", () => {
  const cartShops = ref<CartShop[]>([]);
  const cartShop = ref<CartShop | null>();
  const userStore = useUserStore();

  const loading = ref(false);
  const fetchCartShops = async () => {
    loading.value = true;
    try {
      const response = await getCartsApi();
      cartShops.value = response.data;
      if (userStore.user) {
        userStore.user.cartShopCount = cartShops.value.length;
      }
    } catch (error) {
      console.error("---------error:", error);
    } finally {
      loading.value = false;
    }
  };
  // 取得店家
  const fetchCartShop = async ($id: number) => {
    loading.value = true;
    try {
      const response = await getCartApi($id);
      console.log("購物車資料:", response);
      cartShop.value = response.data;
      console.log("購物車資料:", cartShop.value);
    } catch (error) {
      console.error("購物車資料error:", error);
      cartShop.value = null;
    } finally {
      loading.value = false;
    }
  };

  const addToCart = async (payload: AddCartRequest) => {
    try {
      await addCartApi(payload);

      // await fetchCartShops(); // 更新購物車列表
      console.warn("加入購物車成功:");
    } catch (err: any) {
      console.error("加入購物車發生錯誤:", err);
      // 可以視情況顯示提示訊息
      ElMessage.error("加入購物車失敗，請稍後再試！");
    }
  };
  const deleteCartShop = async ($id: number) => {
    try {
      const response = await deleteCartShopApi($id);

      // await fetchCartShops(); // 更新購物車列表
      console.warn("刪除購物車成功:", response);
    } catch (err: any) {
      console.error("加入購物車發生錯誤:", err);
      // 可以視情況顯示提示訊息
      ElMessage.error("加入購物車失敗，請稍後再試！");
    }
  };
  const deleteCartItem = async ($id: number, $cartShopId: number) => {
    try {
      const response = await deleteCartItemApi($id);

      console.warn("刪除購物車成功:", response);
      // await fetchCartShops(); // 更新購物車列表
      await fetchCartShop($cartShopId);
    } catch (err: any) {
      console.error("加入購物車發生錯誤:", err);
      // 可以視情況顯示提示訊息
      ElMessage.error("加入購物車失敗，請稍後再試！");
    }
  };

  const updateCart = async (
    $data: UpdataCartRequest,
    $cartItemId: number,
    cartShopId: number
  ) => {
    try {
      await updateCartApi($data, $cartItemId);

      // await fetchCartShops(); // 更新購物車列表
      await fetchCartShop(cartShopId);
      console.warn("加入購物車成功:");
      ElMessage.success("購物車更新成功");
    } catch (err: any) {
      console.error("加入購物車發生錯誤:", err);
      // 可以視情況顯示提示訊息
      ElMessage.error("加入購物車失敗，請稍後再試！");
    }
  };

  return {
    cartShops,
    cartShop,
    fetchCartShops,
    fetchCartShop,
    addToCart,
    deleteCartShop,
    updateCart,
    deleteCartItem,
  };
});
