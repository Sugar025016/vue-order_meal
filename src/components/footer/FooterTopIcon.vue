<template>
  <div class="socialMedia">
    <a
      class="icon-a"
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
      <span class="icon-span">分享</span>
    </a>

    <a
      class="icon-a"
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
      <span class="icon-span">分享</span>
    </a>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.socialMedia {
  display: flex;
  align-items: center;
  gap: 20px;
  @include respond(xs) {
    display: flex;
    flex-direction: column; // 每個區塊垂直排列
    // background-color: aqua;
    margin:0 10px 0 0;
  }
  .icon-a {
    display: flex;
    justify-content: center; /* 水平置中 */
    align-items: center; /* 垂直置中 */
    text-decoration: none; /* 去除底線 */
    img {
      width: 30px;
      height: 30px;
      border-radius: 20px;
      margin: 0 10px;
    }
    .icon-span {
      color: #fcfcfc;
      font-size: 18px;
    }
  }
}
</style>
