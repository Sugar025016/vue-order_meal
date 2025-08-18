<template>
  <div class="auth-image">
    <div class="title">
      <!-- <def-title></def-title> -->
      <span>餓餓定便當</span>
    </div>
    <div class="img">
      <img
        v-if="$route.path == '/Register/shop'"
        src="@/assets/images/openShop3.png"
        class="w-8 h-8 rounded-full"
        loading="lazy"
      />
      <img
        v-else
        src="@/assets/images/food.png"
        class="w-8 h-8 rounded-full"
        loading="lazy"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
let $route = useRoute();
$route.path;
</script>
<style lang="scss" scoped>
.auth-image {
  display: flex;
  justify-content: center;
  flex-direction: column;
  // 子元件各佔一半左右
    @include respond(md) {
      
      display: none; // 隱藏圖片
      flex: none;
    }
  .title {
    display: flex;
    justify-content: center;
    margin: 0 0;
    vertical-align: middle;
    color: $color;
    font-weight: 700;
    font-size: 56px;
    white-space: nowrap;
    width: auto;
  }
  .img {
    display: flex;
    justify-content: center;
    vertical-align: middle;
    margin-top: 20px;
    @include respond(md) {
      // 當螢幕小於 md
      display: none; // 隱藏圖片
      flex: none;
    }
    img {
      width: 100%; 
      height: 100%; 
      max-width: 260px;
      max-height: 260px;

      object-fit: contain;
    }
  }
}
</style>
