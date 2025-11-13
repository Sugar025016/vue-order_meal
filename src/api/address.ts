import request from "./request";
import type { ApiResponse } from "@/types/response";
import type { Address, AddAddressRequest } from "@/types/address";

enum API {
  ADDRESSES_URL = "/addresses",
  CART_SHOP_URL = "/cartShop",
}
export const getAddressApi = (id: number) =>
  request.get<any, ApiResponse<Address>>(`${API.ADDRESSES_URL}/${id}`);

export const getAddressesApi = () =>
  request.get<any, ApiResponse< { data: Address[]; currentAddressId: number }>>(API.ADDRESSES_URL);

export const addAddressApi = (data: AddAddressRequest) =>
  request.post<any, ApiResponse<any>>(API.ADDRESSES_URL, data);

export const updateAddressApi = (data: AddAddressRequest, id: number) =>
  request.put<any, ApiResponse<any>>(`${API.ADDRESSES_URL}/${id}`, data);

export const deleteAddressApi = (id: number) =>
  request.delete<any, ApiResponse<any>>(`${API.ADDRESSES_URL}/${id}`);
