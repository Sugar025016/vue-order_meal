import { AddOrderRequest } from "@/types/order";

export const emptyOrder: AddOrderRequest = {
  pay_method: 1, // 預設付款方式（可自行改）
  delivery_type: 1, // 1: 自取 / 2: 外送
  order_type: 1, // 預設訂單類型
  is_cutlery: false,
  customer_note: null,
  estimated_delivery_time: null,
};
