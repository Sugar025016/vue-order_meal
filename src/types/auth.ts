import { User } from "./user";

export interface RegisterRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  captcha_key: string;
  captcha: string;
}

export interface PwdChangeRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
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

export interface LoginResponseData {
  token: string;
  user: User;
}

export interface VerifyOtpRequest {
  email: string;
  otp: string;
}
