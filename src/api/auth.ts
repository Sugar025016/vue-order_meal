import request from "./request";
import type { ApiResponse } from "@/types/response";
import type {
  LoginRequest,
  LoginResponseData,
  RegisterRequest,
  RegisterUserData,
  PwdChangeRequest,
} from "@/types/auth";
import type { User } from "@/types/user";


export interface LoginResponse {
  token: string;
  user: User;
}

enum API {
  REGISTER_URL = "/register",
  LOGIN_URL = "/login",
  LOGOUT_URL = "/logout",
  VERIFY_OTP_URL = "/verifyOtp",
  SEND_OTP_URL = "/sendOtp",
  VERIFY_PASSWORD_URL = "/verifyPassword",
  CHANGE_PASSWORD_URL = "/password/change",
}

export const loginApi = (data: LoginRequest) =>
  request.post<any, ApiResponse<LoginResponseData>>(API.LOGIN_URL, data);

export const registerApi = (data: RegisterRequest) =>
  request.post<any, ApiResponse<RegisterUserData>>(API.REGISTER_URL, data);

export const logoutApi = () =>
  request.post<any, ApiResponse<any>>(API.LOGOUT_URL);

export const verifyOtpApi = (email: string, otp: string) =>
  request.post<any, ApiResponse<any>>(API.VERIFY_OTP_URL, {
    email,
    otp,
  });

export const resendOtpApi = (email: string) =>
  request.post<any, ApiResponse<any>>(API.SEND_OTP_URL, { email });

export const verifyPasswordApi = (password: string) =>
  request.post<any, ApiResponse<any>>(API.VERIFY_PASSWORD_URL, { password });

export const changePasswordApi = (pwdChangeRequest: PwdChangeRequest) =>
  request.put<any, ApiResponse<any>>(API.CHANGE_PASSWORD_URL, {
    current_password: pwdChangeRequest.currentPassword,
    new_password: pwdChangeRequest.newPassword,
    new_password_confirmation: pwdChangeRequest.confirmPassword,
  });
