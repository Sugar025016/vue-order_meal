import request from "./request";
import type { ApiResponse } from "@/types/response";
import type { Shop, ShopSearchRequest } from "@/types/shop";

enum API {
  SHOP_URL = "/shop",
}

// export const getShopApi = (data: number) =>
//   request.get<any, ApiResponse<Shop>>(API.SHOP_URL + "/" + data);
export const getShopApi = (id: number) =>
  request.get<any, ApiResponse<Shop>>(`${API.SHOP_URL}/${id}`)

// export const getShopsApi = (searchParams?: ShopSearchRequest) =>
//   request.get<any, ApiResponse<Shop[]>>(API.SHOP_URL, searchParams);

export const getShopsApi = (searchParams?: ShopSearchRequest) =>
  request.get<any, ApiResponse<Shop[]>>(API.SHOP_URL, {
    params: searchParams,
  });

// export const reqShopInfo = (page: number, limit: number, data: ShopSearch) =>
//   request.get<any, ApiResponse>(
//     API.SHOP + `?name=${data.other}&page=${page - 1}&size=${limit}`,
//   )

// export const reqBackstageAddOrUpdateShop = (data: ShopData) => {
//   if (data.id) {
//     return request.put<any, any>(API.SHOP, data)
//   } else {
//     return request.post<any, any>(API.SHOP, data)
//   }
// }

// export const reqRemoveShop = (data: number) =>
//   request.delete<any, ShopData>(API.SHOP + '/' + data)
