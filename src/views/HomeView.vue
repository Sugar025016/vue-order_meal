<template>
  <div class="home-view">
    <HomeImage @registerShop="registerShop" />
    <div class="home-view__body">
      <!-- <div class="home-view__body-in"> -->
      <ShopSearch />
      <div class="home-view__shop">
        <template v-for="shop in shopStore.shops" :key="shop.id">
          <ShopCard :shop="shop" />
        </template>
      </div>
      <div v-if="loading" class="loading" v-loading="loading"></div>
    </div>
    <!-- </div> -->
  </div>

  <!-- <ChooseAddressModel ref="chooseAddressRef" /> -->
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";

import ShopCard from "@/components/shop/ShopCard.vue";

import HomeImage from "@/components/home/HomeTop.vue";
import ShopSearch from "@/components/shop/ShopSearch.vue";
import { useShopStore } from "@/stores/shop";
import { useAddressStore } from "@/stores/address";

const shopStore = useShopStore();
const addressStore = useAddressStore();

const chooseAddress = async () => {};
const registerShop = () => {};

const loading = ref(false);
let timer: any;
const handleScroll = async () => {};
// 在組件銷毀時移除滾動事件監聽器，防止記憶體洩漏

onMounted(async () => {
  // 在元件掛載後新增滾動事件監聽器
  window.addEventListener("scroll", handleScroll), chooseAddress();
  if (localStorage.getItem("token") && addressStore.addresses) {
    await addressStore.fetchAddresses();
  }
  shopStore.fetchShops();
});

// onBeforeUnmount(() => {
//   window.removeEventListener("scroll", handleScroll);
//   clearTimeout(timer);
// });
</script>

<style lang="scss" scoped>
.home-view {
  flex: 1;
  background-color: rgba(255, 234, 184, 0.769);
  // .home-view__body {
  .home-view__body {
    padding: var(--responsive-padding);

    .home-view__shop {
      display: grid; /* 使用CSS Grid布局 */
      grid-template-columns: repeat(1, 1fr);
      grid-gap: 10px;
      margin: 30px auto;
      padding: 0 5px;
      @media (min-width: $breakpoint-xs) {
        grid-template-columns: repeat(1, 1fr);
        // max-width: 500px;
        // max-width: none;
        // margin: 15px 0;
      }

      @media (min-width: $breakpoint-sm) {
        grid-template-columns: repeat(2, 1fr);
        // max-width: 1200px;
        // max-width: none;
      }

      @media (min-width: $breakpoint-md) {
        grid-template-columns: repeat(3, 1fr);
        // max-width: 1200px;
        // max-width: none;
      }

      @media (min-width: $breakpoint-xl) {
        grid-template-columns: repeat(3, 1fr);
        // max-width: 1300px;
        // max-width: none;
      }
      @media (min-width: $breakpoint-xxl) {
        grid-template-columns: repeat(4, 1fr);
        // max-width: none;
      }
    }

    .loading {
      margin: 30px 0;
      height: 0px;
    }
  }
  // }
}
</style>
