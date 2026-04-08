<template>
  <div class="cart-check_view">
    <div class="cart-check-view__body">
      <Checkout></Checkout>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useShopStore } from "@/stores/shop";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import Checkout from "@/components/checkout/checkout.vue";
import { useCartShopStore } from "@/stores/cart";

const shopStore = useShopStore();
const $route = useRoute();
const cartShopStore = useCartShopStore();

onMounted(async () => {
  console.log("路由參數:", useRoute().params.id);
  await shopStore.fetchShop(parseInt(useRoute().params.id as string));

  // console.log("/////////////////////// 重新加載購物車商店資料1 ///////////////////////");
  // console.log("cartShopStore?.cartShop", cartShopStore?.cartShop);
  // console.log("$route.params?.id", $route.params?.id);
  // console.log("cartShopStore?.cartShop?.id", cartShopStore?.cartShop?.id);
  // console.log("parseInt($route.params.id as string)", parseInt($route.params.id as string));
  // if(!$route.params?.id || !cartShopStore?.cartShop?.id || parseInt($route.params.id as string) !== cartShopStore?.cartShop?.id){
  if (parseInt($route.params.id as string) !== cartShopStore?.cartShop?.id) {
    // console.log("/////////////////////// 重新加載購物車商店資料 ///////////////////////");
    await cartShopStore.fetchCartShop(parseInt($route.params.id as string));
  }
});
</script>
<style lang="scss" scoped>
.cart-check_view {
  flex: 1; /* 主內容填滿剩餘空間 */
  .cart-check-view__body {
    // background-image: url("@/assets/images/background.jpeg");

    background-color: bisque;
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
      background: rgba(255, 255, 255, 0.212); // 白色變淡
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
