<template>
  <div class="fooder-top-icon">
    <a
      class="fooder-top-icon__a"
      :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        'https://22blb.com/BuyShops'
      )}`"
      target="_blank"
    >
      <img
        src="@/assets/icons/facebook.png"
        class="w-8 h-8 rounded-full"
        loading="lazy"
      />
      <span class="fooder-top-icon__span">分享</span>
    </a>

    <a
      class="fooder-top-icon__a"
      :href="`https://line.me/R/msg/text/?${encodeURIComponent(
        'https://22blb.com/BuyShops'
      )}`"
      target="_blank"
    >
      <img
        src="@/assets/icons/line.png"
        class="w-8 h-8 rounded-full"
        loading="lazy"
      />
      <span class="fooder-top-icon__span">分享</span>
    </a>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.fooder-top-icon {
  display: flex;
  align-items: center;
  gap: 30px;
  @include respond(xs) {
    display: flex;
    flex-direction: column; // 每個區塊垂直排列
    margin-right: 10px;
  }
  .fooder-top-icon__a {
    display: flex;
    justify-content: center; /* 水平置中 */
    align-items: center; /* 垂直置中 */
    text-decoration: none; /* 去除底線 */
    gap: 10px;
    img {
      width: 30px;
      height: 30px;
    }
    .fooder-top-icon__span {
      color: #fcfcfc;
      font-size: 18px;
    }
  }
}
</style>
