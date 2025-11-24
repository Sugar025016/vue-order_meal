<template>
  <div class="home-view__shop">
    <!-- <template v-for="shop in shopStore.shops" :key="shop.id">
      <ShopCard :shop="shop" />
    </template> -->
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
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
</style>
