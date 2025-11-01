// src/api/user.ts

import type { Shop } from "@/types/shop";
import type { ApiResponse } from "@/types/response";
import request from "./request";

enum API {
  FAVORITE_URL = '/favorite',
}


export const changeFavoriteApi = (shopId:number) =>
  request.post<any,ApiResponse<any>>(`${API.FAVORITE_URL}/${shopId}`)

export const getFavoritesApi = () =>
    request.get<any,ApiResponse<Shop[]>>(API.FAVORITE_URL)

