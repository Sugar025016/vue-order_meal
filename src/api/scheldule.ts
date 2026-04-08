// src/api/user.ts

import type { User } from "@/types/user";
import type { ApiResponse } from "@/types/response";
import request from "./request";

enum API {
  SCHELDULE_URL = '/scheldule',
}

export const getUserApi = () =>
  request.get<any,ApiResponse<User> >(API.SCHELDULE_URL)