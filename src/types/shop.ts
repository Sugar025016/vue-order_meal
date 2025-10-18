
export type Categories = Category[]

export interface Category {
  id?: number
  name: string
}

export type TimePeriods = TimePeriod[]
export interface TimePeriod {
  startTime: string
  endTime: string
}

export type Schedules = Schedule[]
export interface Schedule {
  id?: number
  week: number
  timePeriods: TimePeriods
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

