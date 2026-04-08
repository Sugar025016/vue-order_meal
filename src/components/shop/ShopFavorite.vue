<template>
  <el-link
    class="shop-favorite__el-link"
    :underline="false"
    @click.stop="toggleHeart(props.shopId)"
  >
    <el-icon
      :size="40"
      :class="
        isFavorite(props.shopId)
          ? 'shop-head__icon-heart--favorite'
          : 'shop-head__icon-heart'
      "
      ><Heart
    /></el-icon>
  </el-link>
</template>

<script setup lang="ts">
import { Heart } from "@vicons/ionicons5";

import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const props = defineProps<{
  shopId: number;
}>();

let isFavorite = (shopId: number) => {
  return userStore.user?.favoriteShopIds?.includes(shopId) ?? false;
};

const toggleHeart = async (shopId: number) => {
  await userStore.changeFavorite(shopId);
};
</script>
<style lang="scss" scoped>
.shop-favorite__el-link {
  .shop-head__icon-heart--favorite {
    // color: var(--el-color-primary);
    color: #ff6969;
    // color: red;
  }
  .shop-head__icon-heart {
    color: rgba(147, 147, 147, 0.801);
  }
}
</style>
