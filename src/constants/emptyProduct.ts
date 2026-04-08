import { Product } from "@/types/product";

export const emptyProduct: Product = {
  id: 0,
  name: '',
  description: '',
  price: 0,
  is_orderable: false,
  image_path: null,
  shop_id: 0,
  deleted_at: null,
};