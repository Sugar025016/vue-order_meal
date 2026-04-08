<template>
  <div class="rwd-layout">
    <slot name="slotName" class="slot-content"></slot>
    <!-- 預留插槽放頁面內容 -->
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped>
.rwd-layout {
  margin: 40px 10px;
  @media (min-width: $breakpoint-xs) {
    margin-left: 10px;
    margin-right: 10px;
  }
  @media (min-width: $breakpoint-sm) {
    margin-left: 10px;
    margin-right: 10px;
  }
  @media (min-width: $breakpoint-md) {
    margin-left: 20px;
    margin-right: 20px;
  }
  @media (min-width: $breakpoint-lg) {
    margin-left: 40px;
    margin-right: 40px;
  }
  @media (min-width: $breakpoint-xl) {
    margin-left: 80px;
    margin-right: 80px;
  }
  @media (min-width: $breakpoint-xxl) {
    margin-left: 160px;
    margin-right: 160px;
  }
}
</style>
