<template>
  <div class="cart-drawer">
    <el-drawer
      size="360px"
      :modal-append-to-body="false"
      :lock-scroll="false"
      v-model="drawer"
      title="商店-購物車"
    >
      <div>
        <template v-for="cartShop in computedCartShops" :key="cartShop.id">
          <CartCard :cartShop="cartShop" />
        </template>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import CartCard from "./CartCard.vue";
import { useCartShopStore } from "@/stores/cart";
import { checkShopOpenTime } from "@/composables/useShopSchedule";

const cartShopStore = useCartShopStore();
const drawer = ref(false);

const openCart = async () => {
  await cartShopStore.fetchCartShops();
  drawer.value = true;
};

const computedCartShops = computed(() => {
  return cartShopStore.cartShops
    .map((cartShop) => {
      const openBySchedule = checkShopOpenTime(cartShop.shop.schedules);
      return {
        ...cartShop,
        is_open: cartShop.shop.is_open && openBySchedule,
      };
    })
    .sort((a, b) => {
      return (b.is_open ? 1 : 0) - (a.is_open ? 1 : 0);
    });
});

defineExpose({
  openCart,
});

onMounted(async () => {
  await cartShopStore.fetchCartShops();
});
</script>

<style lang="scss" scoped>
.cart-drawer {
  ::v-deep .el-drawer {
    .el-drawer__header {
      margin-bottom: 0;
      .el-drawer__title {
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
}
</style>
