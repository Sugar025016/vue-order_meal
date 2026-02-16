import { defineStore } from "pinia";
import { ref } from "vue";
import { CartShop, AddCartRequest, UpdataCartRequest } from "@/types/cart";

import { addOrderApi } from "@/api/order";

import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
import { emptyCartShop } from "@/constants/emptyCartShop";
import { AddOrderRequest } from "@/types/order";

export const useOrderStore = defineStore("order", () => {
  const cartShops = ref<CartShop[]>([]);
  const cartShop = ref<CartShop>(emptyCartShop);
  const userStore = useUserStore();

  const loading = ref(false);
  const deliveryType = ref<1 | 2>(1); // 1: 外送, 2: 自取

  //   const setDelivertType  = (type: 1 | 2) => {
  //     delivery_type.value = type;
  //   }

  const createOrder = async (
    $cartShopId: number,
    $addOrderRequest: AddOrderRequest,
  ) => {
    try {
      $addOrderRequest.delivery_type = deliveryType.value;
      const response = await addOrderApi($cartShopId, $addOrderRequest);
      console.warn("addOrderRequest更新成功:", response);

      return response;
    } catch (error: any) {
      // Axios 錯誤（後端有回應）
      if (error.response) {
        const status = error.response.status;

        // 422 驗證錯誤
        if (status === 422) {
          console.error("驗證失敗", error.response.data.errors);
          // TODO: 顯示在表單上 or message
        }
        // 401 未登入 / token 過期
        else if (status === 401) {
          console.error("尚未登入或登入過期");
          // TODO: 轉登入頁
        }
        // 404 / 403 / 500
        else {
          console.error("下單失敗", error.response.data.message);
        }
      } else {
        // 網路錯誤 / 連不到後端
        console.error("網路異常，請稍後再試");
      }
      return null;
    }
  };

  return {
    createOrder,
    deliveryType,
  };
});
