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
          <span>今日營業時間：</span>
          <!-- {{ shopStore.shop?.schedules }} -->
          <div
            v-if="
              shopStore.shop?.schedules && shopStore.shop?.schedules.length > 0
            "
            class="shop-head__times"
          >
            <!-- 如果有營業時間 -->
            <template v-if="getTimeForTodayWeek().length > 0">
              <template
                v-for="(timePeriod, i) in getTimeForTodayWeek()"
                :key="i"
              >
                <span>
                  {{ timePeriod.start }} ~ {{ timePeriod.end }}
                  {{ i < getTimeForTodayWeek().length - 1 ? "," : "" }}
                </span>
              </template>
            </template>
            <template v-else>
              <span>非營業日</span>
            </template>
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

import {  LocationOutline } from "@vicons/ionicons5";

import { useShopStore } from "@/stores/shop";

const shopStore = useShopStore();

import ShopInfoModal from "./ShopInfoModal.vue";
import { formatMinutes } from "@/utils/time";

import FbLineShare from "@/components/globalComponents/FbLineShare.vue";
import { CallConnecting20Regular, ClockAlarm20Regular } from "@vicons/fluent";
import { useAuthStore } from "@/stores/auth";
import ShopFavorite from "./ShopFavorite.vue";


const getTodayWeek = () => {
  const today = new Date();
  const day = today.getDay(); // JS: 0=星期日, 1=星期一...
  return day === 0 ? 7 : day; // 將 0 (星期日) 轉成 7
};

// 取得指定 week 的排程
const getTimeForTodayWeek = () => {
  if (!shopStore.shop?.schedules) return [];

  // 過濾指定 week 的 schedules
  const targetSchedules = shopStore.shop?.schedules.filter(
    (s) => s.week === getTodayWeek()
  );

  // 轉換成時間字串或保留分鐘數
  return targetSchedules.map((s) => ({
    start: formatMinutes(s.start_time),
    end: formatMinutes(s.end_time),
    rawStart: s.start_time,
    rawEnd: s.end_time,
  }));
};

const authStore = useAuthStore();

const favoriteMap = ref<Record<number, boolean>>({});

// 初始化
onMounted(() => {
  if (authStore.user?.favoriteShopIds) {
    authStore.user.favoriteShopIds.forEach((id) => {
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
