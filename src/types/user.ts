import { Address } from "./address";
import { ShopData } from "./shop";
export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  shops?: ShopData[];
  email_verified_at: string | null;
  phone_verified_at: string | null;
  current_address?: Address;
  favoriteShopIds: number[];
  cartShopCount: number;
}