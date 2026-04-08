import request from "./request";
import type { ApiResponse } from "@/types/response";
import type { Captcha } from "@/types/captcha";

enum API {
  REGISTER_CAPTCHA = "/captcha",
}

export const getCaptchaApi = () =>
  request.get<any, ApiResponse<Captcha>>(API.REGISTER_CAPTCHA);
