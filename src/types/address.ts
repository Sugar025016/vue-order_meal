// export type Addresses = Address[];



export interface Address {
  id: number;
  // address_data_id: number;
  lat: number;
  lng: number;
  city: string;
  area: string;
  street: string;
  detail: string;
  user_id: number;
}

export interface AddressRequest {
  city: string;
  area: string;
  street: string;
  detail: string;
}

export interface AddressData {
  id: number;
  city: string;
  area: string;
  street: string;
}

export interface AddressOptions {
  cityName: string;
  areas: {
    areaName: string;
    streets: {
      streetName: string;
    }[];
  }[];
}