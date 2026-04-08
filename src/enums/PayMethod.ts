export enum PayMethod {
  CASH = 1,
  CREDIT_CARD = 2,
  LINE_PAY = 3,
}

export const PayMethodText: Record<PayMethod, string> = {
  [PayMethod.CASH]: "現金",
  [PayMethod.CREDIT_CARD]: "信用卡",
  [PayMethod.LINE_PAY]: "LINE Pay",
};