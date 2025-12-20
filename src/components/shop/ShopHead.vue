<template>
  <div class="shop-head">
    <el-card>
      <div class="shop-head__title">
        <span class="shop-head__title-span"
          >{{ shopStore.shop?.brand }} - {{ shopStore.shop?.branch }}
        </span>
        <!-- <span class="shop-head__title-span">{{ shopStore.shop }}  </span> -->
        <ShopFavorite :shopId="shopStore.shop?.id" />
      </div>
      <div class="shop-head__info">
        <div class="shop-head__list">
          <el-icon :size="20"><LocationOutline /></el-icon>
          <span>地址：</span>
          <span>
            {{
              shopStore.shop?.city +
              shopStore.shop?.area +
              shopStore.shop?.street +
              shopStore.shop?.detail
            }}
          </span>
        </div>
        <div class="shop-head__list">
          <el-icon :size="20"><CallConnecting20Regular /></el-icon>
          <span>電話：</span>
          <span>{{ shopStore.shop?.phone }}</span>
        </div>
        <div class="shop-head__list">
          <el-icon :size="20"><ClockAlarm20Regular /></el-icon>
          <!-- <span>營業時間：</span> -->
          <div
            v-if="
              shopStore.shop?.schedules && shopStore.shop?.schedules.length > 0
            "
            class="shop-head__times"
          >
            <!-- 如果有營業時間 -->
            <template v-if="getNowSchedule() !== null">
              <span class="shop-head__open">營業中：</span>
              <span
                >{{ minutesToTime(getNowSchedule().start_time) }} ~
                {{ minutesToTime(getNowSchedule().end_time) }}</span
              >
            </template>

            <template v-else>
              <!-- <span>非營業日</span> -->
              <span>開始營業時間：</span>
              <span
                v-if="
                  Math.trunc(getNextSchedule().start_time / 1440) + 1 !==
                  getTodayWeek()
                "
              >
                {{ weekNames[Math.trunc(getNextSchedule().start_time / 1440)] }}
              </span>
              <span>
                {{ minutesToTime(getNextSchedule().start_time) }} ~
                {{ minutesToTime(getNextSchedule().end_time) }}
              </span>
            </template>

            <!-- <template v-if="getTimeForNow().length > 0">
              <template v-for="(timePeriod, i) in getTimeForNow()" :key="i">
                <span>
                  {{ timePeriod.start }} ~ {{ timePeriod.end }}
                  {{ i < getTimeForNow().length - 1 ? "," : "" }}
                </span>
              </template>
            </template>
            <template v-else>
              <span>未設定營業時間</span>
            </template> -->
            <div class="shop-head__more">
              <ShopInfoModal
                :schedules="shopStore.shop?.schedules"
                :phone="shopStore.shop?.phone"
                :name="shopStore.shop?.brand + ' - ' + shopStore.shop?.branch"
                :address="
                  shopStore.shop?.city +
                  shopStore.shop?.area +
                  shopStore.shop?.street +
                  shopStore.shop?.detail
                "
              ></ShopInfoModal>
            </div>
          </div>
          <div v-else>
            <!-- 如果沒有營業時間 -->
            <span>未設定營業時間</span>
          </div>
        </div>
      </div>
      <div class="shop-head__share">
        <FbLineShare></FbLineShare>
      </div>
    </el-card>
    <el-image :src="shopStore.shop?.image_path" />
    <!-- <div></div> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

import { LocationOutline } from "@vicons/ionicons5";

import { useShopStore } from "@/stores/shop";

const shopStore = useShopStore();

import ShopInfoModal from "./ShopInfoModal.vue";
import { formatMinutes } from "@/utils/time";

import FbLineShare from "@/components/globalComponents/FbLineShare.vue";
import { CallConnecting20Regular, ClockAlarm20Regular } from "@vicons/fluent";
import { useUserStore } from "@/stores/user";
import ShopFavorite from "./ShopFavorite.vue";

const getTodayWeek = () => {
  const today = new Date();
  const day = today.getDay(); // JS: 0=星期日, 1=星期一...
  return day === 0 ? 7 : day; // 將 0 (星期日) 轉成 7
};

const getOpenWeek = () => {
  const now = new Date();
  const nowMinutes =
    now.getHours() * 60 + now.getMinutes() + (getTodayWeek() - 1) * 1440;
  // 過濾指定 week 的 schedules
  const targetSchedules = shopStore.shop?.schedules.filter(
    (s) => s.start_time < nowMinutes && s.end_time > nowMinutes
  );
  if (!targetSchedules || targetSchedules.length === 0) {
    return getTodayWeek();
  }
  return targetSchedules[0].week;
};

const minutesToTime = (minutes: number) => {
  const minutesInDay = 1440;
  minutes = minutes % minutesInDay; // 取得當天的分鐘數
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
};

// 取得指定 week time
const getTimeForTodayWeek = () => {
  if (!shopStore.shop?.schedules) return [];

  // 過濾指定 week 的 schedules
  const targetSchedules = shopStore.shop?.schedules.filter(
    (s) => s.week === getOpenWeek()
  );

  // 轉換成時間字串或保留分鐘數
  return targetSchedules.map((s) => ({
    start: formatMinutes(s.start_time),
    end: formatMinutes(s.end_time),
    rawStart: s.start_time,
    rawEnd: s.end_time,
  }));
};

// 取得最近的營業時間
// const getTimeForNow = () => {
//   if (!shopStore.shop?.schedules) return [];

//   const now = new Date();
//   const nowMinutes =
//     now.getHours() * 60 + now.getMinutes() + (getTodayWeek() - 1) * 1440;

//   // 過濾指定 week 的 schedules
//   const targetSchedules = shopStore.shop?.schedules.filter(
//     (s) => s.start_time < nowMinutes && s.end_time > nowMinutes
//   );

//   // 轉換成時間字串或保留分鐘數
//   return targetSchedules.map((s) => ({
//     start: formatMinutes(s.start_time),
//     end: formatMinutes(s.end_time),
//     rawStart: s.start_time,
//     rawEnd: s.end_time,
//   }));
// };

const userStore = useUserStore();

const favoriteMap = ref<Record<number, boolean>>({});

const weekNames = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日",
];

const getNowSchedule = () => {
  if (!shopStore.shop?.schedules) return null;
  const now = new Date();
  const nowMinutes =
    now.getHours() * 60 + now.getMinutes() + (getTodayWeek() - 1) * 1440;

  const targetSchedules = shopStore.shop?.schedules.filter(
    (s) => s.start_time < nowMinutes && s.end_time > nowMinutes
  );
  return !targetSchedules || targetSchedules.length === 0
    ? null
    : targetSchedules[0];
};

const getNextSchedule = () => {
  if (!shopStore.shop?.schedules) return null;
  const now = new Date();
  const nowMinutes =
    now.getHours() * 60 + now.getMinutes() + (getTodayWeek() - 1) * 1440;

  // 過濾還沒開始的 schedules
  const upcomingSchedules = shopStore.shop?.schedules
    .filter((s) => s.start_time > nowMinutes)
    .sort((a, b) => a.start_time - b.start_time); // 依開始時間排序

  // 取最早的那個
  return upcomingSchedules?.length > 0
    ? upcomingSchedules[0]
    : shopStore.shop?.schedules.sort((a, b) => a.start_time - b.start_time)[0];
};

// 初始化
onMounted(() => {
  if (userStore.user?.favoriteShopIds) {
    userStore.user.favoriteShopIds.forEach((id) => {
      favoriteMap.value[id] = true;
    });
  }
});
</script>

<style lang="scss" scoped>
$b-color: $color;

.shop-head {
  display: flex;
  align-items: center;
  gap: 20px; /* 左右間距 */

  .el-card {
    flex: 1; /* 左邊佔一半空間 */
    display: flex;
    border-radius: 20px;
    flex-direction: column;
    border: 0px;
    background-color: rgba(255, 230, 193, 0.54);
    .shop-head__title {
      display: flex;
      width: 100%;
      flex-wrap: wrap; /* 允許換行 */
      justify-content: space-between;
      align-items: center; /* 垂直置中 */
      .shop-head__title-span {
        display: flex;
        align-items: center; /* 垂直置中 */
        justify-content: center; /* 水平置中 */
        font-size: 46px;
        color: rgb(0, 0, 0);
      }
      .shop-head__el-link {
        margin: 0 10px;
      }
      .shop-head__icon-heart--active {
        color: red;
      }
      .shop-head__icon-heart {
        color: rgba(0, 0, 0, 0.801);
      }

      // .el-icon {
      //   display: flex;
      //   justify-content: center; /* 水平置中 */
      //   align-items: center; /* 垂直置中 */
      //   color: rgba(0, 0, 0, 0.801);
      // }
      // .shop-head__icon-heart {
      //   color: red;
      // }
      // .el-icon:hover {
      //   cursor: pointer; /* 添加手型光标效果 */
      // }
    }

    .shop-head__info {
      margin: 26px 0;
      display: flex;
      flex-direction: column;
      gap: 6px;
      .shop-head__list {
        display: flex;
        align-items: center;
        flex-wrap: wrap; /* 允許換行 */
        .shop-head__times {
          display: flex;
          align-items: center;
          column-gap: 5px;
          flex-wrap: wrap; /* 允許換行 */

          .shop-head__share {
            display: flex;
            align-items: self-end;
          }
          .shop-head__open {
            color: green;
            font-weight: 600;
          }
        }
        span {
          display: block;
          align-items: center;
          word-wrap: break-word;
          word-break: break-all;
          max-width: 100%;
          color: rgb(0, 0, 0);
          font-size: 24px;
          line-height: 1.2;
        }

        // .shop-head__more {
        // height: 100%;
        // position: relative;
        // top: 0;
        // }
      }
    }

    .shop-head__share {
      display: flex;
      flex-wrap: wrap; /* 允許換行 */
      align-items: center; /* 垂直置中 */
      justify-content: flex-end;
    }
  }
  .el-image {
    flex: 1; /* 左邊佔一半空間 */
    border-radius: 20px;
  }

  @include respond(md) {
    .el-image {
      display: none;
    }
  }
}
</style>
