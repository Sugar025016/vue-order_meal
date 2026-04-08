<template>
  <div class="time-select">
    <el-select v-model="selectedDate" placeholder="選擇日期">
      <el-option
        v-for="(d, index) in dateOptions"
        :key="d.value"
        :label="d.label"
        :value="d.value"
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
import { computed, ref } from "vue";

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
    console.log("ddddddddddddddddd", d);
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

    list.push({
      date: d,
      value: formatDate(d),
      label: `${formatDate(d)} (星期${WEEK_TEXT[week - 1]})`,
      week,
    });
  }

  return list;
}
const dateOptions = ref(buildDateOptions(10));
const selectedDate = ref<string>();
const selectedTime = ref<string>();


function getReserveDayMinutes() {
  const now = new Date();

  // 在當前時間上加 1 小時
  const future = new Date(now.getTime() + 60 * 60 * 1000); // 60*60*1000 毫秒 = 1 小時

  const minutesOfDay = future.getHours() * 60 + future.getMinutes();
  const todayStr = formatDate(future); // 格式化成 "YYYY-MM-DD"
  return { minutesOfDay, todayStr };
}

const timeOptions = computed(() => {
  const dateItem = dateOptions.value.find(
    (d) => d.value === selectedDate.value,
  );
  if (!dateItem) return [];

  const list = weekTimeMap.value[dateItem.week] ?? [];

  // 今天的資訊
  const { minutesOfDay, todayStr } = getReserveDayMinutes();

  return list.map((t) => {
    const label = `${minutesToHHmm(t.start)} ~ ${minutesToHHmm(t.end)}`;

    // 用日期判斷是否禁用
    const disabled =
      dateItem.value < todayStr ||
      (dateItem.value === todayStr && t.start <= minutesOfDay);

    return { label, value: label, disabled };
  });
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
