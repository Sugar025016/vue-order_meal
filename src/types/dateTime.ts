import {
  AddMealsListData,
  AddMealsProductsResponseData,
} from '../addMeals/type'
import { TabsData, ProductList } from '../tab/type'
import { Response, Page, Address } from '../type'

// export interface ResponseData {
//   code: number
//   message: string
//   ok: boolean
// }

export interface ShopIDResponseData extends Response {
  data: number
}

export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

export interface CategoryResponseData extends Response {
  data: CategoryObj[]
}

export type ShopList = ShopData[]

export type Schedules = Schedule[]
export interface Schedule {
  id?: number
  week: number
  timePeriods: TimePeriods
}

export interface PutSchedule {
  type: number
  schedules: Schedules
}

export type TimePeriods = TimePeriod[]
export interface TimePeriod {
  startTime: string
  endTime: string
}

export interface ShopsResponseData extends Response {
  data: ShopList
}

export interface ShopPageResponse extends Page {
  content: ShopList
}
export interface GetShopPageResponse extends Response {
  data: ShopPageResponse
}
export interface ShopResponseData extends Response {
  data: ShopDetailData
}

export interface Category {
  id?: number
  name: string
}

export interface ShopSearch {
  userAddressId?: number
  city?: string
  area?: string
  categoryId?: number
  other?: string
}

export interface ShopName {
  id: number
  name: string
}

export type ShopNames = ShopName[]
export interface ShopNamesResponse extends Response {
  data: ShopNames
}

export interface ShopDetailData {
  id: number
  name: string
  description: string
  address: Address
  phone?: string
  imgId: number
  imgUrl: string
  schedules?: Schedules
  tabProducts: TabsData
  products: ProductList
  orderable: boolean
  addMeals: AddMealsListData
  category: number[]
}

export interface ShopData {
  id: number
  name: string
  description: string
  address: string
  phone?: string
  imgUrl: string
  schedules?: Schedules
  orderable?: boolean
}

export interface PutShopData {
  id: number
  name: string
  description: string
  address: Address
  phone?: string
  imgId: number
  imgUrl: string
  orderable: boolean
  open: boolean
  deliveryKm: number
  deliveryPrice: number
  category: number[]
}

export interface ShopDetailsResponse extends Response {
  data: ShopDetailData
}

export interface PutShopResponse extends Response {
  data: boolean
}

export interface ReqShopData {
  name: string
  phone?: string
  description: string
  address: Address
  captcha: string
}

export interface RegisterShop {
  captcha: string
  shopName: string
  phone: string
  description: string
  addressId: number
  addressDetail: string
}
