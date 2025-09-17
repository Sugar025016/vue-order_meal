<template>
  <el-dialog
    class="ShopSchedule fade"
    id="ShopSchedule"
    tabindex="-1"
    v-model="showShopSchedule"
  >
    11111111111111
    <!-- <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-3" id="exampleModalLabel">營業時間</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
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
                      schedulePeriod.endTime === '00:00:00'
                        ? '24:00:00'
                        : schedulePeriod.endTime,
                    )
                  }}
                </span>
              </component>
              <span v-else>非營業日</span>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </el-dialog>
</template>

<script setup lang="ts">
import { Watch, Phone } from "@element-plus/icons-vue";
defineProps(["schedules", "phone", "name"]);

// import { deleteSecond as showTime } from '@/utils/time'
</script>

<style lang="scss" scoped>
// @import '@/styles/bootstrap.scss';
// @import '../node_modules/bootstrap/scss/_modal.scss';
// @import '../../../../../../node_modules/bootstrap/scss/close';

.ShopSchedule {
  background-color: rgba(0, 0, 0, 0.5);

  .modal-header {
    border-bottom: 2px;
    border-style: solid;
    border-color: rgb(155, 155, 155);
  }
  .modal-body {
    .item {
      margin: 10px 10px 30px 10px;
      .title {
        display: flex;
        align-items: center;
        margin: 10px 0;
        font-size: 20px;
        font-weight: 900;
        .el-icon {
          margin-right: 2px;
        }
      }
      .week {
        font-size: 18px;
        margin: 5px 20px;
        span {
          margin: 0 2px;
        }
      }
    }
    .shop-name {
      .title {
        font-size: 36px;
        font-weight: 100;
      }
    }
  }
}
</style>
