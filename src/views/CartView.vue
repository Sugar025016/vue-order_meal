<template>
  <div class="cart-view">
    <div class="cart-view__cart">
      <Cart></Cart>
    </div>
  </div>
</template>
<script setup lang="ts">
import Cart from "@/components/cart/Cart.vue";

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
.cart-view {
  flex: 1; /* 主內容填滿剩餘空間 */
  .cart-view__cart {
    background-image: url("@/assets/images/background.jpeg");
    // background-color: bisque;
    height: 100%;
    position: relative;
    background-repeat: no-repeat;
    background-size: cover; /* 控制背景图片如何适应元素 */
    background-position: center; /* 控制背景图片的位置 */
    background-clip: border-box; /* 預設就是 border-box */
    padding: var(--responsive-padding);
    padding-top: 20px;
    padding-bottom: 10px;
    &::before {
      content: "";
      position: absolute;
      inset: 0;
      background: rgba(255, 255, 255, 0.068); // 白色變淡
      z-index: 0;
    }

    > * {
      position: relative;
      z-index: 1;
    }
  }

  .buy-product-footer {
    padding: var(--responsive-padding);
    padding-top: 20px;
  }
}
</style>
