import { AddOrderRequest, Order } from "@/types/order";
import { Shop } from "@element-plus/icons-vue";
import { emptyShop } from "./emptyShop";

export const emptyAddOrder: AddOrderRequest = {
  pay_method: 1, // 預設付款方式（可自行改）
  delivery_type: 1, // 1: 自取 / 2: 外送
  order_type: 1, // 預設訂單類型
  is_cutlery: false,
  customer_note: null,
  scheduled_time: null,
  estimated_delivery_time: null,
};

export const emptyOrder: Order = {
  id: 0,
  user_id: 0,
  shop_id: 0,

  shop: emptyShop,

  order_number: "",

  order_type: 1,
  delivery_type: 1,
  status: 1,

  city: "",
  area: "",
  street: "",
  detail: "",
  lat: 0,
  lng: 0,

  pay_method: 1,
  is_cutlery: false,

  customer_note: null,
  staff_note: null,

  subtotal: 0,
  delivery_fee: 0,
  total_price: 0,
  refund_amount: 0,

  scheduled_time: null,
  estimated_delivery_time: null,

  created_at: "",
  updated_at: "",

  items: [],
};
