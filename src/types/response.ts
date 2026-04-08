export interface ApiResponse<T = any> {
  status: boolean
  message: string
  data: T
}

// export interface Page {
//   totalElements: number
//   size: number
//   number: number
//   totalPages: number
// }

// export interface Paginated<T> {
//   data: T[];
//   page: Page;
// }

export interface Paginated<T> {
  data: T[];            // 實際資料
  current_page: number;  // 當前頁碼
  last_page: number;     // 總頁數
  per_page: number;      // 每頁筆數
  total: number;         // 總筆數
}