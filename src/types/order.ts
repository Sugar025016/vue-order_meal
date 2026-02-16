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
  is_cutlery: boolean ; // 需要餐具
  customer_note?: string | null; // 顧客備註
  estimated_delivery_time: string | null; // YYYY-MM-DD HH:mm:ss
}
