import type { AddOrderRequest } from "@/types/order";
import type { ApiResponse } from "@/types/response";
import request from "./request";

enum API {
  ORDERS_URL = "/orders",
}

/**
 * 建立訂單（結帳）
 */
export const addOrderApi = (cartShopId: number, data: AddOrderRequest) =>
  request.post<any, ApiResponse<any>>(`${API.ORDERS_URL}/${cartShopId}`, data);


