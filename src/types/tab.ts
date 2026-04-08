import { Product } from "./product"

export interface Tab {
  id: number
  name: string
  is_show: boolean
  products: Product[]
}