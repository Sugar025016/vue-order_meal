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
import { useAuthStore } from "@/stores/auth";
import { Heart } from "@vicons/ionicons5";

const props = defineProps<{
  shopId: number;
}>();

const authStore = useAuthStore();

let isFavorite = (shopId: number) => {
  return authStore.user?.favoriteShopIds?.includes(shopId) ?? false;
};

const toggleHeart = async (shopId: number) => {
  await authStore.changeFavorite(shopId);
};
</script>
<style lang="scss" scoped>
.shop-favorite__el-link {
  .shop-head__icon-heart--favorite {
    color: var(--el-color-primary);
    // color: red;
  }
  .shop-head__icon-heart {
    color: rgba(172, 172, 172, 0.801);
  }
}
</style>
