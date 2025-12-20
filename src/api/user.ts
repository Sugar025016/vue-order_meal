// src/api/user.ts

import type { User } from "@/types/auth";
import type { ApiResponse } from "@/types/response";
import request from "./request";

enum API {
  USER_URL = "/user",
  UPDATE_NAME_URL = "/user/name",
}

export const getUserApi = () =>
  request.get<any, ApiResponse<User>>(API.USER_URL);

export const updateNameApi = (newName: string) =>
  request.put<any, ApiResponse<any>>(API.UPDATE_NAME_URL, {
    new_name: newName,
  });
