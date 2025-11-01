<template>
  <div class="shop-time-select">
    <el-select
      v-model="innerValue"
      :placeholder="placeholder"
      filterable
      @change="onChange"
      clearable
    >
      <el-option
        v-for="option in timeOptions"
        :key="option.value"
        :label="option.label"
        :value="option.value"
        :disabled="isDisabled(option)"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "選擇時間" },
  step: { type: String, default: "00:30" },
  start: { type: String, default: "00:00" },
  end: { type: String, default: "48:00" },
  maxTime: { type: String, default: "" },
  minTime: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue"]);

// ✅ 建立本地可修改的值
const innerValue = ref(props.modelValue);

// 當父層改變時，同步更新本地值
watch(
  () => props.modelValue,
  (val) => {
    innerValue.value = val;
  }
);

// 當本地值改變時，通知父層
const onChange = (val: string) => {
  emit("update:modelValue", val);
};

const parseTime = (str: string) => {
  let totalMinutes = 0;

  console.log("isNextDay:", str);
  // 判斷是否包含「(隔日)」
  const isNextDay = str.includes("隔日");

  // 移除非數字和冒號的文字
  const cleaned = str.replace(/[^\d:]/g, ""); // "02:00"

  const [h, m] = cleaned.split(":").map(Number);

  totalMinutes = h * 60 + m;

  // 如果有 (隔日)，加 24 小時（1440 分鐘）
  if (isNextDay) {
    totalMinutes += 24 * 60;
  }

  return totalMinutes;
};

const maxTimeDisabled = computed(() => parseTime(props.maxTime));
const minTimeSetDisabled = computed(() => parseTime(props.minTime));

interface TimeOption {
  label: string;
  value: string;
  minutes: number;
}

const timeOptions = computed<TimeOption[]>(() => {
  const result: TimeOption[] = [];
  const stepMin = parseTime(props.step);
  const startMin = parseTime(props.start);
  const endMin = parseTime(props.end);

  for (let t = startMin; t < endMin; t += stepMin) {
    const h = Math.floor(t / 60);
    const m = t % 60;
    const displayH =
      (h === 24 || h === 48) && m === 0
        ? "24"
        : String(h % 24).padStart(2, "0");
    const displayM = String(m).padStart(2, "0");
    const label =
      h >= 24 ? `隔日 ${displayH}:${displayM}` : `${displayH}:${displayM}`;
    result.push({
      label,
      value: label,
      minutes: t,
    });
  }
  return result;
});

// 判斷某個選項是否 disabled
// 判斷禁用
const isDisabled = (option: TimeOption) => {
  const t = option.minutes;
  console.log(
    "TimeOption.minutes:",
    option.minutes,
    "maxTimeDisabled:",
    maxTimeDisabled.value,
    "minTimeSetDisabled:",
    minTimeSetDisabled.value
  );
  return (
    t >= maxTimeDisabled.value ||
    t <= maxTimeDisabled.value - 1440 ||
    t <= minTimeSetDisabled.value ||
    t >= 1440 + minTimeSetDisabled.value
  );
};
</script>

<style scoped>
.shop-time-select {
  .el-select {
    width: 120px;
  }
}
</style>
