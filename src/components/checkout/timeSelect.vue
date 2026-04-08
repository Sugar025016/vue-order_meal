<template>
  <div class="time-select">
    <el-select v-model="selectedDate" placeholder="選擇日期">
      <el-option
        v-for="(d, index) in dateOptions"
        :key="d.value"
        :label="d.label"
        :value="d.value.getTime()"
        :disabled="disabledDates[index]"
      />
    </el-select>

    <el-select
      v-model="selectedTime"
      placeholder="選擇時間"
      :disabled="!timeOptions.length"
    >
      <el-option
        v-for="t in timeOptions"
        :key="t.value"
        :label="t.label"
        :value="t.value"
        :disabled="t.disabled"
      />
    </el-select>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { useCartShopStore } from "@/stores/cart";

const cartShopStore = useCartShopStore();
const raw = computed(() => {
  return cartShopStore.cartShop?.shop?.schedules ?? [];
});
const MINUTES_PER_DAY = 1440;
const WEEK_TEXT = ["一", "二", "三", "四", "五", "六", "日"];

const disabledDates = computed(() => {
  return dateOptions.value.map((d) => {
    const times = weekTimeMap.value[d.week] ?? [];
    return times.length === 0; // 沒有時間就禁用
  });
});

function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function getDateWeek(date: Date) {
  const w = date.getDay();
  return w === 0 ? 7 : w; // 1~7
}

function minutesToHHmm(min: number) {
  const h = String(Math.floor(min / 60)).padStart(2, "0");
  const m = String(min % 60).padStart(2, "0");
  return `${h}:${m}`;
}

const weekTimeMap = computed(() => {
  const map: Record<number, { start: number; end: number }[]> = {};

  raw.value.forEach((item) => {
    for (let t = item.start_time; t + 15 <= item.end_time; t += 15) {
      const week = (Math.floor(t / MINUTES_PER_DAY) + 1) % 7 || 7;
      const minutesInDay = t % MINUTES_PER_DAY;

      if (!map[week]) map[week] = [];

      map[week].push({
        start: minutesInDay,
        end: minutesInDay + 15,
      });
    }
  });

  // ⬇️ 每個星期排序
  Object.keys(map).forEach((w) => {
    map[Number(w)].sort((a, b) => a.start - b.start);
  });

  return map;
});

function buildDateOptions(days = 10) {
  const today = new Date();
  const list = [];

  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    const week = getDateWeek(d);
    console.log("Building date option:", d.getTime, d.getDate);
    list.push({
      date: d,
      value: d,
      label: `${formatDate(d)} (星期${WEEK_TEXT[week - 1]})`,
      week,
    });
  }

  return list;
}

const emit = defineEmits<{
  (e: "update:selectedDate", value: Date): void;
  (e: "update:selectedTime", value: number): void;
  (e: "update:datetime", value: Date | null): void;
}>();
const dateOptions = ref(buildDateOptions(10));
const selectedDate = ref<number | null>(null);
const selectedTime = ref<number | null>(null);

function getReserveDayMinutes() {
  const now = new Date();

  // 在當前時間上加 1 小時
  const future = new Date(now.getTime() + 60 * 60 * 1000); // 60*60*1000 毫秒 = 1 小時

  const minutesOfDay = future.getHours() * 60 + future.getMinutes();
  // const todayStr = formatDate(future); // 格式化成 "YYYY-MM-DD"
  const todayStr = future;
  return { minutesOfDay, todayStr };
}

const timeOptions = computed(() => {
  const dateItem = dateOptions.value.find(
    (d) => d.value.getTime() === selectedDate.value,
  );
  if (!dateItem) return [];

  const list = weekTimeMap.value[dateItem.week] ?? [];

  // 今天的資訊
  const { minutesOfDay, todayStr } = getReserveDayMinutes();

  return list.map((t) => {
    const label = `${minutesToHHmm(t.start)} ~ ${minutesToHHmm(t.end)}`;
    // 用日期判斷是否禁用
    // console.log("t.start",t.start,minutesOfDay);
    const disabled =
      dateItem.value.getDate() < todayStr.getDate() ||
      (dateItem.value.getDate() === todayStr.getDate() &&
        t.start <= minutesOfDay);

    return { label, value: t.start, disabled };
  });
});

function mergeDateTime(
  dateTs: number | null,
  minutes: number | null,
): Date | null {
  if (dateTs == null || minutes == null) return null;

  const d = new Date(dateTs);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  d.setHours(h, m, 0, 0);
  return d;
}

const selectedDateTime = computed<Date | null>(() =>
  mergeDateTime(selectedDate.value, selectedTime.value),
);
watch(selectedDate, () => {
  selectedTime.value = null;
});
watch(selectedDateTime, (val) => {
  emit("update:datetime", val);
  console.log("selectedDateTime changed:", val);
});
</script>

<style lang="scss" scoped>
.time-select {
  display: flex;
  // flex-direction: column;
  gap: 10px;
  // width: 400px;
  @media (max-width: $breakpoint-xs) {
    flex-direction: column;
  }
  .el-select {
    max-width: 200px;
  }
}
</style>
