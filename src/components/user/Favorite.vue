<template>
  <div class="home-view__shop">
    <template v-for="shop in shops" :key="shop.id">
      <ShopCard :shop="shop" />
    </template>
  </div>

</template>

<script setup lang="ts">
import { getFavoritesApi } from "@/api/favorite.ts";
import ShopCard from "@/components/shop/ShopCard.vue";
import { Shop } from "@/types/shop";
import { useUserStore } from "@/stores/user";
import { onMounted, ref, watch } from "vue";

const shops = ref<Shop[]>([]);
const userStore = useUserStore();

const getFavorites = async () => {
  try {
    const res = await getFavoritesApi();
    shops.value = res.data;
    console.log("取得 Favorite 成功:", res);
  } catch (err) {
    console.error("取得 Favorite 失敗:", err);
  }
};
watch(
  () => userStore.user?.favoriteShopIds,
  async (newIds) => {
    if (!newIds) return;

    // 例如呼叫 API 取得店家資料
    await getFavorites();
  },
  { immediate: true } // 畫面載入時就執行一次
);

onMounted(() => {
  getFavorites();
  // userStore.getFavorites();
});
</script>

<style lang="scss" scoped>
.home-view__shop {
  display: grid; /* 使用CSS Grid布局 */
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  margin: 20px auto 20px auto;
  padding: 0 15px;
  width: 100%;
  @media (min-width: $breakpoint-xs) {
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    // max-width: 500px;
    // max-width: none;
    // margin: 15px 0;
    
  }

  @media (min-width: $breakpoint-sm) {
    grid-template-columns: repeat(2, 1fr);
    // max-width: 1200px;
    // max-width: none;
  }

  @media (min-width: $breakpoint-lg) {
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
</style>
