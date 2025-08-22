<template>
  <div class="home-view">
    <HomeImage @registerShop="registerShop" />
    <div class="home-view__body">
      <RwdLayout>
        <template #slotName>
          <div class="home-view__body-in">
            <HomeSearch />
            <div class="home-view__shop">
              <template v-for="c1 in shopStore.shopArr">
                <ShopCard :shop="c1" :isFavoriteShop="false"/>
              </template>
            </div>
            <div v-if="loading" class="loading" v-loading="loading"></div>
          </div>
        </template>
      </RwdLayout>
    </div>
  </div>

  <!-- <ChooseAddressModel ref="chooseAddressRef" /> -->
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessageBox } from "element-plus";

import ShopCard from "@/components/shop/ShopCard.vue";

import HomeImage from "@/components/home/HomeTop.vue";
import RwdLayout from "@/layouts/RwdLayout.vue";
import HomeSearch from "@/components/home/HomeSearch.vue";

let $router = useRouter();
const isExpanded = ref(false);

// 假的 shopStore，避免目前報錯
// interface Shop {
//   id: number;
//   name: string;
//   description: string;
//   logo: string;
// }
interface ShopData {
  id: number
  name: string
  address: string
  description: string
  imgUrl?: string
  orderable: boolean
  isFavoriteShop:boolean
}

const shopStore = reactive({
  shopArr: [
    {
      id: 1,
      name: "咖啡小館",
      address: "台北市中正區信義路1段100號",
      description: "提供各式咖啡與甜點",
      imgUrl: "https://picsum.photos/300/200?random=1",
      orderable: true,
    },
    {
      id: 2,
      name: "輕食餐廳",
      address: "台北市大安區和平東路二段50號",
      description: "健康輕食，沙拉與三明治",
      imgUrl: "https://picsum.photos/300/200?random=2",
      orderable: false,
    },
    {
      id: 3,
      name: "小吃夜市",
      address: "新北市板橋區文化路100號",
      description: "台灣小吃，香氣四溢",
      imgUrl: "https://picsum.photos/300/200?random=3",
      orderable: true,
    },
  ],
});

onMounted(() => {
  // 在元件掛載後新增滾動事件監聽器
  window.addEventListener("scroll", handleScroll), chooseAddress();
});

const chooseAddress = async () => {};
// const chooseAddressRef = ref<typeof ChooseAddressModel>()
const registerShop = () => {};

const loading = ref(false);
let timer: any;
let loadingMore = false;
let aaa = 0;
const handleScroll = async () => {};
// 在組件銷毀時移除滾動事件監聽器，防止記憶體洩漏
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  clearTimeout(timer);
});
</script>

<style lang="scss" scoped>
.home-view {
  flex: 1;
  background-color: rgba(255, 234, 184, 0.769);
  .home-view__body {
    .home-view__body-in {
      .home-view__shop {
        display: grid; /* 使用CSS Grid布局 */
        grid-template-columns: repeat(1, 1fr);
        grid-gap: 10px;
        margin: 30px 0;
        padding: 0 5px;
        @media (min-width: $breakpoint-xs) {
          grid-template-columns: repeat(1, 1fr);
          // margin: 15px 0;
        }

        @media (min-width: $breakpoint-sm) {
          grid-template-columns: repeat(2, 1fr);
        }

        @media (min-width: $breakpoint-md) {
          grid-template-columns: repeat(3, 1fr);
        }

        @media (min-width: $breakpoint-xl) {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (min-width: $breakpoint-xxl) {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      .loading {
        margin: 30px 0;
        height: 0px;
      }
    }
  }
}
</style>
