import { Product } from './product';
import { Shop } from './shop';

export interface Cart {
  id: number;
  user_id: number;
  shop_id: number;
  product_id: number;
  qty: number;
  remark: string | null;
  product: Product;
}

export interface CartResponse {
  status: boolean;
  data: CartShop;
}

export interface CartShop {
  id: number;
  user_id: number;
  shop_id: number;
  shop: Shop;
  cart_items: CartItem[];
}

export interface CartItem {
  id: number;
  cart_shop_id: number;
  product_id: number;
  qty: number;
  remark: string;
  product: Product;
}

export interface AddCartRequest {
  product_id: number
  shop_id: number
  qty: number
  remark?: string
}

export interface UpdataCartRequest {
  qty: number;
  remark: string;
}