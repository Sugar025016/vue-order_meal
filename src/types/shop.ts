// import { product } from './product';
import { Tab } from "./tab";
import { Schedule } from "./schedule";

export interface Category {
  id?: number;
  name: string;
}
export interface TimePeriod {
  startTime: string;
  endTime: string;
}

export interface ShopData {
  id: number;
  name: string;
  description: string;
  address: string;
  phone?: string;
  imgUrl: string;
  schedules?: Schedule[];
  orderable?: boolean;
}
export interface Shop {
  id: number;
  brand: string;
  branch: string;
  phone: string;
  description: string | null;
  is_orderable: boolean;
  is_open: boolean;
  image_path: string | null;
  address_data_id: number;
  delivery_price: number;
  city: string;
  area: string;
  street: string;
  detail: string;
  lat: number;
  lng: number;
  delivery_km: number;
  // products?: product[];
  tabs: Tab[];
  schedules: Schedule[];
}

export interface ShopSearchRequest {
  city?: string | null;
  area?: string | null;
  category?: number | null;
  keyword?: string | null;
  lat?: number | null;
  lng?: number | null;
}
