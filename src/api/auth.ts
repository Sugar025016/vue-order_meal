import request from "./request";
import type { ApiResponse } from "@/types/response";
import type {
  User,
  LoginRequest,
  LoginResponseData,
  RegisterRequest,
  RegisterUserData,
} from "@/types/auth";

// Reuse User type from "@/types/user"

export interface LoginResponse {
  token: string;
  user: User;
}

enum API {
  REGISTER_URL = "/register",
  LOGIN_URL = "/login",
  USERINFO_URL = "/user",
  LOGOUT_URL = "/logout",
  USER_PWD_URL = "/user/pwd",
  USER_ADDRESS_URL = "/address",
  USER_FAVORITE_URL = "/user/favorite",
  REGISTER_CAPTCHA = "/register/captcha",
  USER_ADDRESS_DELIVERY_URL = "/user/addressDelivery",
}


export const loginApi = (data: LoginRequest) =>
  request.post<any, ApiResponse<LoginResponseData>>(API.LOGIN_URL, data);

export const registerApi = (data: RegisterRequest) =>
  request.post<any, ApiResponse<RegisterUserData>>(API.REGISTER_URL, data);

export const logoutApi = () =>
  request.post<any, ApiResponse<any>>(API.LOGOUT_URL);

