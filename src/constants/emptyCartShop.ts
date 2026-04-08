import { CartShop } from '@/types/cart';
import { emptyShop } from './emptyShop';


export const emptyCartShop: CartShop = {
  id: 0,
  user_id: 0,
  shop_id: 0,
  shop: emptyShop,        // 使用已經初始化的 emptyShop
  cart_items: [],         // 沒有商品，預設空陣列
  is_orderable: false,
  is_open: false,
  schedules: [],          // 預設空陣列
  isDeliveryAvailable: true,
};