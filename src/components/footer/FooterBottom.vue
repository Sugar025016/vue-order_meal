<template>
  <div class="bottom">
    <div class="bottom-left">
      <span class="bottom-span">
        本網站是測試用請勿點擊測試用請勿測試用請勿
      </span>
      <span class="bottom-span"> 本網站是測試用請勿點擊用請勿點擊 </span>
    </div>
    <div class="bottom-right">
      <span class="bottom-span">隱私權政策</span>
      <span class="bottom-span">使用者條款</span>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.bottom {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  
  @include respond(sm) {
    display: flex;
    flex-direction: column; // 每個區塊垂直排列
    flex: 1 1 45%;
  }

  .bottom-left {
    display: flex;
    flex-direction: column;
    .bottom-span {
      display: flex;
      margin: 0 0 8px 0;
    }
  }
  .bottom-right {
    display: flex;
    gap: 10px;
  }
}
</style>
