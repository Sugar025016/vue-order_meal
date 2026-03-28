import type { AddOrderRequest, Order, OrderHistory } from "@/types/order";
import type { ApiResponse, Paginated } from "@/types/response";
import request from "./request";
import { OrderStatus } from "@/enums/OrderStatus";

enum API {
  ORDERS_URL = "/orders",
  ORDERS_NUMBER_URL = "/orders/number",
  HISTORY_URL = "/orders/history",
  ACTIVE_URL = "/orders/active",
  COUNT_URL = "/orders/ongoing/count",
}

/**
 * 建立訂單（結帳）
 */
export const addOrderApi = (cartShopId: number, data: AddOrderRequest) =>
  request.post<any, ApiResponse<any>>(`${API.ORDERS_URL}/${cartShopId}`, data);

export const getOrderApi = (orderNumber: string) =>
  request.get<any, ApiResponse<Order>>(
    `${API.ORDERS_URL}/${orderNumber}`,
  );

export const getOrderActiveApi = () =>
  request.get<any, ApiResponse<any>>(API.ACTIVE_URL);

export const getOrderHistoryApi = (params?: {
  page?: number;
  per_page?: number;
}) =>
  request.get<any, ApiResponse<Paginated<Order>>>(API.HISTORY_URL, {
    params,
  });

export const getOrderCountApi = () =>
  request.get<any, ApiResponse<any>>(`${API.COUNT_URL}`);
