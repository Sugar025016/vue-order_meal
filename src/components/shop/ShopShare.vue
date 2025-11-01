<script setup lang="ts">
import { computed } from 'vue'

// 動態獲取當前頁面的 URL
const currentUrl = computed(() => window.location.href)
</script>
<template>
  <a
    class="icon-a"
    :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      currentUrl,
    )}`"
    target="_blank"
  >
    <img
      src="@/assets/icons/facebook.png"
      class="w-8 h-8 rounded-full"
      loading="lazy"
    />
    <span class="icon-span">分享</span>
  </a>

  <a
    class="icon-a"
    :href="`https://line.me/R/msg/text/?${encodeURIComponent(currentUrl)}`"
    target="_blank"
  >
    <img
      src="@/assets/icons/line.png"
      class="w-8 h-8 rounded-full"
      loading="lazy"
    />
    <span class="icon-span">分享</span>
  </a>
</template>
<style lang="scss" scoped>
.icon-a {
  margin: 0 0 0 20px;
  display: flex;
  justify-content: center; /* 水平置中 */
  align-items: center; /* 垂直置中 */
  text-decoration: none; /* 去除底線 */
  z-index: 10;
  img {
    width: 26px;
    height: 26px;
    border-radius: 20px;
    margin: 0 8px;
  }
  .icon-span {
    color: #030303;
    font-size: 18px;
  }
}
</style>
