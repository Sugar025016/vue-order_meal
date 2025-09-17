<template>
  <div class="shop-head">
    <el-card>
      <div class="shop-head__title">
        <span class="shop-head__title-span">水藍色海岸</span>
        <el-link
          class="shop-head__el-link"
          :underline="false"
          @click="toggleHeart"
        >
          <el-icon
            :size="32"
            :class="
              isActive
                ? 'shop-head__icon-heart--active'
                : 'shop-head__icon-heart'
            "
            ><Heart
          /></el-icon>
        </el-link>
        <!-- <el-icon :size="32" :class="{ 'shop-head__icon-heart': false }"
          ><Heart
        /></el-icon> -->
      </div>
      <div class="shop-head__info">
        <div class="shop-head__list">
          <el-icon :size="20"><LocationOutline /></el-icon>
          <span>地址：</span>
          <span>
            {{
              shopData?.address.city +
              shopData?.address.area +
              shopData?.address.street +
              shopData?.address.detail
            }}
          </span>
        </div>
        <div class="shop-head__list">
          <el-icon :size="20"><CallConnecting20Regular /></el-icon>
          <span>電話：</span>
          <span>{{ shopData?.phone }}</span>
        </div>
        <div class="shop-head__list">
          <el-icon :size="20"><ClockAlarm20Regular /></el-icon>
          <span>今日營業時間：</span>
          <div
            v-if="shopData?.schedules && shopData?.schedules[dayOfWeek]"
            class="shop-head__times"
          >
            <!-- 如果有營業時間 -->
            <template
              v-if="shopData.schedules[dayOfWeek].timePeriods?.length > 0"
            >
              <template
                v-for="(timePeriod, i) in shopData.schedules[dayOfWeek]
                  .timePeriods"
                :key="i"
              >
                <span>
                  {{ showTime(timePeriod.startTime) }} ~
                  {{
                    showTime(
                      timePeriod.endTime === "00:00:00"
                        ? "24:00"
                        : timePeriod.endTime
                    )
                  }}
                  {{
                    i < shopData.schedules[dayOfWeek].timePeriods.length - 1
                      ? ","
                      : ""
                  }}
                </span>
              </template>
            </template>
            <template v-else>
              <span>非營業日</span>
            </template>
            <div class="shop-head__more">
              <ShopInfoModal
                :schedules="shopData?.schedules"
                :phone="shopData?.phone"
                :name="shopData?.name"
                :address="
                  shopData?.address.city +
                  shopData?.address.area +
                  shopData?.address.street +
                  shopData?.address.detail
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
    <el-image :src="`https://picsum.photos/300/200?random=1`" />
    <!-- <div></div> -->
  </div>
</template>

<script setup lang="ts">
// import { House, ChatRound, User, Watch } from "@element-plus/icons-vue";

// import { Location, Phone, Watch } from "@element-plus/icons-vue";

import { useRoute } from "vue-router";
import { onMounted, ref, computed } from "vue";

import { Heart, LocationOutline } from "@vicons/ionicons5";

const showShopSchedule = ref(false);

import ShopInfoModal from "./ShopInfoModal.vue";
import { deleteSecond as showTime } from "@/utils/time";

// import { getShop } from '@/api/shop'
// import { ShopData, ShopDetailData, ShopResponseData } from '@/api/shop/type'
// import 'bootstrap/dist/css/bootstrap.css' // Import Bootstrap CSS
// import shopInfoModal from '../shopInfoModal/index.vue'
// import useUserStore from '@/store/modules/user'
// import { deleteSecond as showTime } from '@/utils/time'
// import socialMedia from '../socialMedia/index.vue'
import { ElMessage } from "element-plus";

import FbLineShare from "@/components/globalComponents/FbLineShare.vue";
import { CallConnecting20Regular, ClockAlarm20Regular } from "@vicons/fluent";
import { WarningFilled } from "@vicons/carbon";
// import { Location } from '@vicons/fluent';
// src/components/globalComponents/FbLineIcon.vue

let $route = useRoute();

let id: number = parseInt($route.params.id as string);

// let shopData = ref<any>({
//   id: 0,
//   name: "",
//   description: "",
//   address: {
//     city: "",
//     area: "",
//     street: "",
//     detail: "",
//     lat: undefined,
//     lng: undefined,
//   },
//   imgId: 0,
//   imgUrl: "",
//   tabProducts: [],
//   products: [],
//   orderable: false,
//   schedules: [],
//   addMeals: [],
//   category: [],
// });

// const shopData = ref({
//   name: "水藍色海岸",
//   isFavorite: true, // 用來控制心形顏色
//   phone: "02-1234-5678",
//   address: {
//     city: "台北市",
//     area: "大安區",
//     street: "和平東路三段",
//     detail: "123號"
//   },
//   schedules: {
//     today: "10:00 - 22:00",
//     monday: "10:00 - 22:00",
//     tuesday: "10:00 - 22:00"
//     // 可以加其他天
//   }
// });

let shopData = ref<any>({
  id: 1,
  name: "水藍色海岸",
  phone: "02-1234-5678",
  description: "一家充滿海洋風情的咖啡店，提供精緻甜點與手沖咖啡。",
  address: {
    city: "台北市",
    area: "大安區",
    street: "和平東路三段",
    detail: "123號",
    lat: 25.033,
    lng: 121.5654,
  },
  imgId: 101,
  imgUrl: "https://picsum.photos/300/200?random=1",
  tabProducts: [
    { id: 1, name: "人氣咖啡", productIds: [1, 2, 3] },
    { id: 2, name: "甜點系列", productIds: [4, 5, 6] },
  ],
  products: [
    { id: 1, name: "拿鐵", price: 120 },
    { id: 2, name: "卡布奇諾", price: 130 },
    { id: 3, name: "美式咖啡", price: 100 },
    { id: 4, name: "藍莓起司蛋糕", price: 150 },
  ],
  orderable: true,
  // schedules: {

  //   timePeriods: [{ open: "10:00", close: "22:00" }],
  //   // 可以加其他天
  // },
  schedules: {
    0: {
      // 星期日
      week: 0,
      timePeriods: [], // 公休
    },
    1: {
      // 星期一
      week: 1,
      timePeriods: [
        { startTime: "09:00:00", endTime: "12:00:00" },
        { startTime: "13:30:00", endTime: "18:00:00" },
      ],
    },
    2: {
      // 星期二
      week: 2,
      timePeriods: [{ startTime: "10:00:00", endTime: "22:00:00" }],
    },
    3: {
      // 星期三
      week: 3,
      timePeriods: [],
    },
    4: {
      // 星期四
      week: 4,
      timePeriods: [{ startTime: "09:00:00", endTime: "17:00:00" }],
    },
    5: {
      // 星期五
      week: 5,
      timePeriods: [
        { startTime: "09:00:00", endTime: "12:00:00" },
        { startTime: "14:00:00", endTime: "23:59:59" },
      ],
    },
    6: {
      // 星期六
      week: 6,
      timePeriods: [
        { startTime: "11:00:00", endTime: "00:00:00" }, // 跨到午夜
        { startTime: "11:00:00", endTime: "00:00:00" }, // 跨到午夜
        { startTime: "11:00:00", endTime: "00:00:00" }, // 跨到午夜
      ],
    },
  },
  // schedules: [
  //   // { week: 0, id: 1, timePeriods: [{ startTime: "10:00", endTime: "22:00" }] },
  //   // { week: 1, id: 2, timePeriods: [{ startTime: "10:00", endTime: "22:00" }] },
  //   // { week: 2, id: 3, timePeriods: [{ startTime: "10:00", endTime: "22:00" }] },
  //   // { week: 3, id: 4, timePeriods: [{ startTime: "10:00", endTime: "22:00" }] },
  //   // { week: 4, id: 5, timePeriods: [{ startTime: "10:00", endTime: "22:00" }] },
  //   // { week: 5, id: 6, timePeriods: [{ startTime: "10:00", endTime: "22:00" }] },
  //   // { week: 6, id: 7, timePeriods: [{ startTime: "10:00", endTime: "22:00" }] },
  // ],
  // { day: "Monday",  open: "10:00", close: "22:00" },
  // { day: "Tuesday", open: "10:00", close: "22:00" },
  // { day: "Wednesday", open: "10:00", close: "22:00" },
  // { day: "Thursday", open: "10:00", close: "22:00" },
  // { day: "Friday", open: "10:00", close: "23:00" },
  // { day: "Saturday", open: "09:00", close: "23:00" },
  // { day: "Sunday", open: "09:00", close: "22:00" },
  addMeals: [
    { id: 1, name: "加奶油", price: 10 },
    { id: 2, name: "加珍珠", price: 15 },
  ],
  category: ["咖啡", "甜點", "輕食"],
});

let favorite = ref("");

// let userStore = useUserStore()

const changeFavorite = async () => {
  //   await userStore.changeFavoriteStore(id)
  //   favorite.value = await userStore.isLove(id)
};

onMounted(async () => {
  //   await getShopData(id)
  //   favorite.value = await userStore.isLove(id)
});

const getShopData = async (id: number) => {
  //   let res: ShopResponseData = await getShop(id)
  //   shopData.value = res.data
};

const shopImageStyle = computed(() => {
  if (shopData.value && shopData.value.imgUrl) {
    return {
      backgroundImage: `url(${shopData.value.imgUrl})`,
    };
  }
  return {};
});

const isActive = ref(false);

const toggleHeart = () => {
  isActive.value = !isActive.value;
};
const currentDate = new Date();
const dayOfWeek = currentDate.getDay();
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
        font-size: 56px;
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
          color: rgba(0, 0, 0, 0.801);
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
