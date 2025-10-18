export type Addresses = Address[];

export interface AddressAll {
  id: number
  detail: string
  lat: number
  lng: number
  address_data_id: number
  user_id: number
  city: string
  area: string
  street: string
}

export interface Address {
  id: number;
  detail: string;
  lat: number;
  lng: number;
}

export interface AddressData {
  id: number;
  city: string;
  area: string;
  street: string;
}
