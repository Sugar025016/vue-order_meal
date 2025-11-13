// src/api/user.ts

import type { User } from "@/types/auth";
import type { ApiResponse } from "@/types/response";
import request from "./request";

enum API {
  USER_URL = '/user',
}

export const getUserApi = () =>
  request.get<any,ApiResponse<User> >(API.USER_URL)