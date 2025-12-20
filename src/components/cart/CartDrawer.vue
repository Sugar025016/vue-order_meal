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
        <template
          v-for="cartShop in cartShopStore.cartShops"
          :key="cartShop.id"
        >
          <CartCard :cartShop="cartShop" />
        </template>
      </div>
    </el-drawer>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import CartCard from "./CartCard.vue";
import { useCartShopStore } from "@/stores/cart";

const cartShopStore = useCartShopStore();
const drawer = ref(false);


const openProduct = () => {
  drawer.value = true;
};

defineExpose({
  openProduct,
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
