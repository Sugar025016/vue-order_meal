<template>
  <div class="shop-info-modal">
    <el-link
      data-bs-toggle="modal"
      @click="centerDialogVisible = true"
      :underline="false"
    >
      <el-icon :size="16"><WarningFilled /></el-icon>
      更多資訊
    </el-link>

    <el-dialog
      v-model="centerDialogVisible"
      title="營業資訊"
      width="auto"
      align-center
    >
      <div class="shop-info-modal__body">
        <div class="shop-info-modal__body-title">
          <span>{{ name }}</span>
        </div>

        <div class="shop-info-modal__body-list">
          <div class="shop-info-modal__body-list-phone layout">
            <div>
              <el-icon :size="20"><Phone /></el-icon>
              <span>營業電話：</span>
            </div>

            <div class="shop-info-modal__content">
              <span>{{ phone }}</span>
            </div>
          </div>
          <div class="shop-info-modal__body-list-times layout">
            <div>
              <el-icon :size="20"><Watch /></el-icon><span>營業時間：</span>
            </div>

            <div class="shop-info-modal__content">
              <div class="shop-info-modal__body-list-week">
                <div v-for="i in 7">
                  <span>{{ weekNames[i % 7] }}：</span>
                  <component
                    v-if="getTimeForTodayWeek(i).length > 0"
                    v-for="(schedulePeriod, index) in getTimeForTodayWeek(i)"
                  >
                    <span v-if="index > 0"> , </span>
                    <span class="time">
                      {{ schedulePeriod.start }}~{{ schedulePeriod.end }}
                    </span>
                  </component>
                  <span v-else>非營業日</span>
                </div>
              </div>
            </div>
          </div>
          <div class="shop-info-modal__body-list-address layout">
            <div>
              <el-icon :size="20"><Location /></el-icon>
              <span>營業地址：</span>
            </div>

            <div class="shop-info-modal__content">
              <span>{{ address }}</span>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible = false">
            關閉
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { WarningFilled } from "@vicons/carbon";
import { Location, Phone, Watch } from "@element-plus/icons-vue";
import { formatMinutes } from "@/utils/time";
const props = defineProps<{
  schedules: any[];
  phone: string;
  name: string;
  address: string;
}>();
const weekNames = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
];
const getTimeForTodayWeek = (week: number) => {
  if (!props.schedules) return [];

  // 過濾指定 week 的 schedules
  const targetSchedules = props.schedules.filter((s) => s.week === week);

  // 轉換成時間字串或保留分鐘數
  return targetSchedules.map((s) => ({
    start: formatMinutes(s.start_time-(week-1)*1440),
    end: formatMinutes(s.end_time-(week-1)*1440),
    rawStart: s.start_time,
    rawEnd: s.end_time,
  }));
};

const centerDialogVisible = ref(false);
</script>

<style lang="scss" scoped>
$b-color: $color;

.shop-info-modal {
  ::v-deep .el-dialog {
    border-radius: 20px; // 圓角大小
    .el-dialog__title {
      font-size: 22px;
      margin: 0 10px;
    }
    .shop-info-modal__body {
      .shop-info-modal__body-title {
        margin: 10px 10px 30px 10px;
        span {
          display: flex;
          align-items: center;
          font-size: 20px;
          font-weight: 400;
          font-size: 36px;
          line-height: 1.2;
        }
      }
      .shop-info-modal__body-list {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        white-space: nowrap;
        gap: 10px;
        font-size: 18px;
        margin: 5px 10px;
        line-height: 1.2;
        .layout {
          display: flex;
          // align-items: flex-start;
          flex-direction: column;
          // flex-direction:row-reverse
          .shop-info-modal__content {
            margin: 6px 10px 8px 22px ;
          }
        }
        i {
          margin-right: 3px;
        }

        .shop-info-modal__body-list-times {
          .shop-info-modal__body-list-week {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }
  }
}
</style>
