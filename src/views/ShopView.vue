<template>
  <div class="shop-view">
    <div class="header background">
      <ShopHead></ShopHead>
    </div>
    <div class="buy-product-footer">
      <Products></Products>
    </div>
  </div>
</template>
<script setup lang="ts">
import Products from "@/components/product/ProductTabs.vue";
import ShopHead from "@/components/shop/ShopHead.vue";

import { useShopStore } from "@/stores/shop";
import { onMounted } from "vue";
import { useRoute } from "vue-router";

const shopStore = useShopStore();



onMounted(async () => {
  console.log("路由參數:", useRoute().params.id);
  await shopStore.fetchShop(parseInt(useRoute().params.id as string));
});


</script>
<style lang="scss" scoped>
.shop-view {
  flex: 1; /* 主內容填滿剩餘空間 */
  .background {
    background-image: url("@/assets/images/background.jpeg");
    position: relative;
    background-repeat: no-repeat;
    background-size: cover; /* 控制背景图片如何适应元素 */
    background-position: center; /* 控制背景图片的位置 */
    background-clip: border-box; /* 預設就是 border-box */
    padding: var(--responsive-padding);
  }

  .buy-product-footer {
    padding: var(--responsive-padding);
    padding-top: 20px;
  }
}
</style>
