import request from "./request";
import type { ApiResponse } from "@/types/response";
import type { Address, AddressRequest } from "@/types/address";

enum API {
  ADDRESSES_URL = "/addresses",
  CURRENT_URL = "current",
}
export const getAddressApi = (id: number) =>
  request.get<any, ApiResponse<Address>>(`${API.ADDRESSES_URL}/${id}`);

export const getAddressesApi = () =>
  request.get<
    any,
    ApiResponse<{ addresses: Address[]; currentAddress: Address }>
  >(API.ADDRESSES_URL);

export const addAddressApi = (data: AddressRequest) =>
  request.post<any, ApiResponse<any>>(API.ADDRESSES_URL, data);

export const updateAddressApi = (data: AddressRequest, id: number) =>
  request.put<any, ApiResponse<any>>(`${API.ADDRESSES_URL}/${id}`, data);

export const deleteAddressApi = (id: number) =>
  request.delete<any, ApiResponse<any>>(`${API.ADDRESSES_URL}/${id}`);

export const createOrUpdateAddressApi = (
  data: AddressRequest,
  id: number | null
) => {
  if (!id) {
    return request.post<any, ApiResponse<any>>(API.ADDRESSES_URL, data);
  } else {
    return request.put<any, ApiResponse<any>>(
      `${API.ADDRESSES_URL}/${id}`,
      data
    );
  }
};

export const setCurrentAddressApi = (id: number) =>
  request.patch<any, ApiResponse<any>>(
    `${API.ADDRESSES_URL}/${id}/${API.CURRENT_URL}`
  );
