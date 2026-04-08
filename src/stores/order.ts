import { defineStore } from "pinia";
import { ref } from "vue";

import {
  addOrderApi,
  getOrderActiveApi,
  getOrderApi,
  getOrderCountApi,
  getOrderHistoryApi,
} from "@/api/order";

import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
import { AddOrderRequest, Order } from "@/types/order";
import { emptyOrder } from "@/constants/emptyOrder";
import { Paginated } from "@/types/response";

export const useOrderStore = defineStore("order", () => {
  const orders = ref<Order[]>([]);
  const OrderHistory = ref<Paginated<Order>>({
    data: [],
    current_page: 0,
    last_page: 0,
    per_page: 0,
    total: 0,
  });
  const OrderActive = ref<Order[]>([]);

  const order = ref<Order>(emptyOrder);
  const userStore = useUserStore();
  const ordersCount = ref<number>(0);

  const loading = ref(false);
  const deliveryType = ref<1 | 2>(1); // 1: 外送, 2: 自取

  const ProcessingOrdersCount = ref(0);

  //   const setDelivertType  = (type: 1 | 2) => {
  //     delivery_type.value = type;
  //   }

  const getProcessingOrdersCount = async () => {
    try {
      const response = await getOrderCountApi();
      console.log("店家資料-order count:", response);
      ordersCount.value = response.data;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const fetchOrder = async ($orderNumber: string) => {
    loading.value = true;
    try {
      const response = await getOrderApi($orderNumber);
      console.log("店家資料:", response);
      order.value = response.data;
      console.log("店家資料:", order.value);
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const getOrderActive = async () => {
    loading.value = true;
    try {
      const response = await getOrderActiveApi();
      console.log("店家資料:", response);
      OrderActive.value = response.data;
      console.log("店家資料:", OrderActive.value);
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const getOrderHistory = async (page = 1, per_page = 20) => {
    loading.value = true;
    try {
      const response = await getOrderHistoryApi({ page, per_page });
      console.log("店家資料:", response);
      OrderHistory.value = response.data;
      console.log("店家資料:", OrderHistory.value);
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

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
    fetchOrder,
    order,
    getProcessingOrdersCount,
    ordersCount,
    getOrderHistory,
    OrderHistory,
    getOrderActive,
    OrderActive,
  };
});
