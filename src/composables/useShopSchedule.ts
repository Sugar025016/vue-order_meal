import type { Schedule } from "@/types/schedule";

/**
 * 判斷目前時間是否在營業時段
 */
export function checkShopOpenTime(schedules?: Schedule[]): boolean {
  console.log("schedules-------------------:", schedules);
  if (!schedules || schedules.length === 0) return false;
  const now = new Date();

  const week = now.getDay(); // JS: 0 = Sunday
  const weekMap = [7, 1, 2, 3, 4, 5, 6]; // 轉成系統 week
  const today = weekMap[week];

  const minutes = now.getHours() * 60 + now.getMinutes() + (today - 1) * 1440;

  return schedules.some((s) => {
    return s.start_time <= minutes && minutes < s.end_time;
  });
}

export function calcDistanceKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // 地球半徑 km
  const toRad = (v: number) => (v * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
