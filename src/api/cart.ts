import request from "./request";
import type { ApiResponse } from "@/types/response";
import type { CartShop, AddCartRequest, UpdataCartRequest } from "@/types/cart";

enum API {
  CARTS_URL = "/carts",
  CART_SHOP_URL = "/cartShop",
}
export const getCartApi = (id: number) =>
  request.get<any, ApiResponse<CartShop>>(`${API.CARTS_URL}/${id}`);

export const getCartsApi = () =>
  request.get<any, ApiResponse<CartShop[]>>(API.CARTS_URL);

export const addCartApi = (data: AddCartRequest) =>
  request.post<any, ApiResponse<any>>(API.CARTS_URL, data);

export const updateCartApi = (data: UpdataCartRequest, id: number) =>
  request.put<any, ApiResponse<any>>(`${API.CARTS_URL}/${id}`, data);

export const deleteCartItemApi = (id: number) =>
  request.delete<any, ApiResponse<any>>(`${API.CARTS_URL}/${id}`);

export const deleteCartShopApi = (id: number) =>
  request.delete<any, ApiResponse<any>>(`${API.CART_SHOP_URL}/${id}`);