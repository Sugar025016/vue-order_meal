import request from "./request";
import type { ApiResponse } from "@/types/response";
import type { Categories } from "@/types/category";

enum API {
  CATEGORY_URL = "/category",
}

export const getCategory = () =>
  request.get<any, ApiResponse<Categories>>(API.CATEGORY_URL);
