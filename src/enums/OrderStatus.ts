// export enum OrderStatus {
//   PENDING = 1, // 待確認
//   ACCEPTED = 2, // 店家已接單
//   PREPARING = 3, // 製作中
//   READY = 4, // 已出餐
//   DELIVERING = 5, // 配送中
//   COMPLETED = 6, // 已完成
//   CANCELLED = 7, // 已取消
//   PROBLEM = 8, // 問題訂單
// }

export enum OrderStatus {
  PENDING = 1,
  ACCEPTED = 2,
  COOKING = 3,
  READY = 4,
  DELIVERING = 5,
  COMPLETED = 6,
  CANCELED = 7,
  PROBLEM = 8,
}

export const OrderStatusText: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "待接單",
  [OrderStatus.ACCEPTED]: "已接單",
  [OrderStatus.COOKING]: "製作中",
  [OrderStatus.READY]: "已備餐",
  [OrderStatus.DELIVERING]: "配送中",
  [OrderStatus.COMPLETED]: "已完成",
  [OrderStatus.CANCELED]: "已取消",
  [OrderStatus.PROBLEM]: "訂單異常",
};

// export const OrderStatusText: Record<OrderStatus, string> = {
//   [OrderStatus.PENDING]: "訂單已建立",
//   [OrderStatus.CONFIRMED]: "訂單已確認",
//   [OrderStatus.PREPARING]: "餐點準備中",
//   [OrderStatus.DELIVERING]: "外送中",
//   [OrderStatus.COMPLETED]: "訂單已完成",
//   [OrderStatus.CANCELED]: "訂單已取消",
//   [OrderStatus.ERROR]: "訂單異常",
// };