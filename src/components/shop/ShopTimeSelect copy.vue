<template>
  <div class="time-select-48">
    <el-select
      v-model="innerValue"
      :placeholder="placeholder"
      filterable
      @change="onChange"
    >
      <el-option
        v-for="time in timeOptions"
        :key="time"
        :label="time"
        :value="time"
        :disabled="isDisabled(time)"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { max } from "moment";
import { computed, defineProps, defineEmits, ref, watch } from "vue";

const props = defineProps({
  modelValue: { type: String, default: "" },
  placeholder: { type: String, default: "選擇時間" },
  step: { type: String, default: "00:30" },
  start: { type: String, default: "00:00" },
  end: { type: String, default: "48:00" },
  maxTime: { type: String, default: "48:00" },
  minTime: { type: String, default: "00:00" },
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
  const [h, m] = str.split(":").map(Number);
  return h * 60 + m;
};

const formatTime = (mins: number) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const displayH =
    (h == 24 || h == 48) && m == 0 ? "24" : String(h % 24).padStart(2, "0");
  const displayM = String(m).padStart(2, "0");
  return h >= 24 ? `(隔日) ${displayH}:${displayM}` : `${displayH}:${displayM}`;
};
const maxTimeDisabled = computed(() => parseTime(props.maxTime));
const minTimeSetDisabled = computed(() => parseTime(props.minTime));

const timeOptions = computed(() => {
  const result: string[] = [];
  const stepMin = parseTime(props.step);
  const startMin = parseTime(props.start);
  const endMin = parseTime(props.end);

  for (let t = startMin; t < endMin; t += stepMin) {
    result.push(formatTime(t));
  }
  return result;
});


// 判斷某個選項是否 disabled
const isDisabled = (time: string) => {
    console.log("check disabled for time:", time);
  const t = parseTime(time.replace(/\D/g, "").slice(0, 2) + ":" + time.slice(-2)); 
  
    console.log("check disabled for t:", t);
    console.log("props.maxTime:",  props.maxTime);
    console.log("props.minTime:",  props.minTime);
    console.log("maxTimeDisabled.value:",  maxTimeDisabled.value);
    console.log("minTimeSetDisabled.value:",  minTimeSetDisabled.value);
  return t >= maxTimeDisabled.value || t <= minTimeSetDisabled.value;
};
</script>

<style scoped>
.time-select-48 {
  width: 240px;
}
</style>
