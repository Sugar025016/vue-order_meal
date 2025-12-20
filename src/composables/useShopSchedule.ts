// 

import { ref, onMounted, onUnmounted } from "vue";
import type { Schedule } from "@/types/schedule";

export function useShopSchedule(schedules: Schedule[]) {
  const isOpenTime = ref(false);

  const check = () => {
    if (!schedules || schedules.length === 0) return false;
    const now = new Date();
    const minutes = now.getHours() * 60 + now.getMinutes();
    const week = now.getDay(); // JS 0 = Sunday

    const weekMap = [7, 1, 2, 3, 4, 5, 6]; // JS → 系統
    const today = weekMap[week];
    const yesterday = weekMap[(week + 6) % 7]; // 昨天

    const checkPeriod = (s: Schedule, offset = 0) => {
      // offset = 0: 今天, offset = -1440: 昨天跨夜
      const start = s.start_time + offset;
      const end = s.end_time + offset;
      return start <= minutes && minutes < end;
    };

    // 判斷今天時段
    let open = schedules.some(s => s.week === today && checkPeriod(s));

    // 判斷昨天跨夜時段
    if (!open) {
      open = schedules.some(
        s => s.week === yesterday && s.end_time > 1440 && checkPeriod(s, -1440)
      );
    }

    isOpenTime.value = open;
  };

  let timer: ReturnType<typeof setInterval> | undefined;

  onMounted(() => {
    check();
    timer = setInterval(check, 60 * 1000);
  });

  onUnmounted(() => {
    if (timer) clearInterval(timer);
  });

  return { isOpenTime, check };
}
