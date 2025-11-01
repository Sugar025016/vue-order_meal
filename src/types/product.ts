// export interface Product {
//   id: number;
//   name: string;
//   description: string;
//   imgUrl: string;
//   isOrderable: boolean;
//   price: number;
//   shopId: number;
// }
export interface Product {
  id: number
  name: string
  description: string
  price: number
  is_orderable: boolean
  image_path: string | null
  shop_id: number
  deleted_at: string | null
}