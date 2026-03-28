import { Product } from "./product";
import { Shop } from "./shop";
import { Schedule } from "./schedule";

export interface OrderRequest {
  cart_id: number;
  payMethod: number;
  is_cutlery: boolean;
  note?: string | null; // 備註（可選）
}

export interface AddOrderRequest {
  pay_method: 1 | 2 | 3; // 付款方式 enum
  delivery_type: 1 | 2; // 配送方式
  order_type: 1 | 2; // 訂單類型
  is_cutlery: boolean; // 需要餐具
  customer_note?: string | null; // 顧客備註
  estimated_delivery_time: string | null; // YYYY-MM-DD HH:mm:ss
  scheduled_time: string | null; // YYYY-MM-DD HH:mm:ss
}
export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  missing_qty: number;
  damaged_qty: number;
  subtotal: number;
  refund_amount: number;
  customer_note?: string | null;
  staff_note?: string | null;
  created_at: string; // ISO 字串
  updated_at: string; // ISO 字串
}

export interface Order {
  id: number;
  user_id: number;
  shop_id: number;
  shop: Shop; // 關聯的店家資料

  order_number: string; // Laravel 型別 string
  order_type: 1 | 2; // 1: 一般訂單, 2: 預約訂單
  delivery_type: 1 | 2; // 1: 外送, 2: 自取
  status: 1 | 2 | 3 | 4 | 5 | 6 | 7;

  city: string;
  area: string;
  street: string;
  detail: string;
  lat: number;
  lng: number;

  pay_method: 1 | 2 | 3;
  is_cutlery: boolean;

  customer_note?: string | null;
  staff_note?: string | null;

  subtotal: number;
  delivery_fee: number;
  total_price: number;
  refund_amount: number;

  scheduled_time?: string | null; // ISO 字串
  estimated_delivery_time?: string | null; // ISO 字串

  created_at: string;
  updated_at: string;

  items?: OrderItem[]; // 關聯的 order items
}


