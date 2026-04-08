import { CartItem } from "@/types/cart";
import { emptyProduct } from "./emptyProduct";

export const emptyCartItem: CartItem = {
  id: 0,
  cart_shop_id: 0,
  product_id: 0,
  qty: 1,
  remark: "",
  product: emptyProduct,
};
