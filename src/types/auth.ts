// types/user.ts
import { Address } from "./address";
import { ShopData } from "./shop";

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  captcha_key: string;
  captcha: string;
}

export interface RegisterUserData {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

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

export interface LoginResponseData {
  token: string;
  user: User;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}