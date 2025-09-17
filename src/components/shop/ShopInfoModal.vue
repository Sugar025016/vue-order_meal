<template>
  <div class="shop-info-modal">
    <el-link data-bs-toggle="modal" @click="centerDialogVisible = true" :underline="false" >
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
            <el-icon :size="20"><Phone /></el-icon>
            <span>營業電話：</span>
            <span>{{ phone }}</span>
          </div>
          <div class="shop-info-modal__body-list-times layout">
            <el-icon :size="20"><Watch /></el-icon>
            <span>營業時間：</span>
            <div class="shop-info-modal__body-list-week">
              <div v-for="schedulePeriods in schedules">
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
                    {{ schedulePeriod.startTime }}~{{ schedulePeriod.endTime }}
                  </span>
                </component>
                <span v-else>非營業日</span>
              </div>
            </div>
          </div>
          <div class="shop-info-modal__body-list-address layout">
            <el-icon :size="20"><Location /></el-icon>
            <span>營業區域：</span>
            <span>{{ address }}</span>
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
// defineProps(["phone", "name"]);
defineProps(["schedules", "phone", "name", "address"]);

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
          align-items: flex-start;
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
