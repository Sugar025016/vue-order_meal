<template>
  <el-link data-bs-toggle="modal" @click="centerDialogVisible = true">
    <el-icon :size="16"><WarningFilled /></el-icon>
    更多資訊
  </el-link>

  <el-dialog
    v-model="centerDialogVisible"
    title="營業時間"
    width="500"
    align-center
  >
    <div class="modal-body">
      <div class="schedule item">
        <div v-for="schedulePeriods in schedules" class="week">
          <span v-if="schedulePeriods.week === 0">星期日：</span>
          <span v-else-if="schedulePeriods.week === 1">星期一：</span>
          <span v-else-if="schedulePeriods.week === 2">星期二：</span>
          <span v-else-if="schedulePeriods.week === 3">星期三：</span>
          <span v-else-if="schedulePeriods.week === 4">星期四：</span>
          <span v-else-if="schedulePeriods.week === 5">星期五：</span>
          <span v-else-if="schedulePeriods.week === 6">星期六：</span>
          <component
            v-if="schedulePeriods.timePeriods.length > 0"
            v-for="(schedulePeriod, index) in schedulePeriods.timePeriods"
          >
            <span v-if="index > 0">,</span>
            <span class="time">
              {{ showTime(schedulePeriod.startTime) }}~{{
                showTime(
                  schedulePeriod.endTime === "00:00:00"
                    ? "24:00:00"
                    : schedulePeriod.endTime
                )
              }}
            </span>
          </component>
          <span v-else>非營業日</span>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { WarningFilled } from "@vicons/carbon";

const centerDialogVisible = ref(false);
</script>
