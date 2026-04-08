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
import { useAddressStore } from "@/stores/address";
import {
  checkShopOpenTime,
  calcDistanceKm,
} from "@/composables/useShopSchedule";
import { useOrderStore } from "@/stores/order";
import { storeToRefs } from "pinia";

const cartShopStore = useCartShopStore();
const addressStore = useAddressStore();
const drawer = ref(false);
const orderStore = useOrderStore();
const { deliveryType } = storeToRefs(orderStore);

const openCart = async () => {
  await cartShopStore.fetchCartShops();
  drawer.value = true;
};

const computedCartShops = computed(() => {
  return cartShopStore.cartShops
    .map((cartShop) => {
      const openBySchedule = checkShopOpenTime(cartShop.shop.schedules);
      if (addressStore.currentAddress.id === 0) {
        return {
          ...cartShop,
          is_open: cartShop.shop.is_open && openBySchedule,
        };
      }
      const isDeliveryAvailable =
        deliveryType.value === 2 ||
        calcDistanceKm(
          addressStore.currentAddress?.lat || 0,
          addressStore.currentAddress?.lng || 0,
          cartShop.shop.lat,
          cartShop.shop.lng,
        ) < cartShop.shop.delivery_km;
      return {
        ...cartShop,
        is_open: cartShop.shop.is_open && openBySchedule,
        isDeliveryAvailable,
      };
    })
    .sort((a, b) => {
      if ((a as any).isDeliveryAvailable !== (b as any).isDeliveryAvailable) {
        return (b as any).isDeliveryAvailable ? 1 : -1; // 可配送排前面
      }
      if (a.is_open !== b.is_open) {
        return b.is_open ? 1 : -1; // 開店的排前面
      }
      return 0;
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
