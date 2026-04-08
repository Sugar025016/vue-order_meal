<template>
  <div class="footer-bottom">
    <div class="footer-bottom__left">
      <span class="footer-bottom__span">
        本網站是測試用請勿點擊測試用請勿測試用請勿
      </span>
      <span class="footer-bottom__span">
        本網站是測試用請勿點擊用請勿點擊
      </span>
    </div>
    <div class="footer-bottom__right">
      <span class="footer-bottom__span">隱私權政策</span>
      <span class="footer-bottom__span">使用者條款</span>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.footer-bottom {
  display: flex;
  justify-content: space-between;
  font-size: 18px;

  @include respond(sm) {
    display: flex;
    flex-direction: column; // 每個區塊垂直排列
  }

  .footer-bottom__left {
    display: flex;
    flex-direction: column;
  }
  .footer-bottom__right {
    display: flex;
    gap: 10px;
  }
  span {
    display: flex;
    line-height: 28px;
  }
}
</style>
