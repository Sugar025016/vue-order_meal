// types/user.ts
export interface Address {
  id: number;
  user_id: number;
  street: string;
  city: string;
  country: string;
}

export interface Shop {
  id: number;
  user_id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  addrs?: Address[];
  shops?: Shop[];
  current_address_id?: number;
  address_data_id?: number;
}
