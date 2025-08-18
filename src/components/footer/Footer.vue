<template>
  <div class="footer">
    <div class="footer-top">
      <div class="footer-top_title">
        <FooterTopTitle />
      </div>
      <FooterTopIcon />
    </div>
    <el-divider />
    <Bottom />
  </div>
</template>

<script setup lang="ts">
import FooterTopTitle from "./FooterTopTitle.vue";
import FooterTopIcon from "./FooterTopIcon.vue";
import Bottom from "./FooterBottom.vue";

defineProps(["scene"]);
</script>
<style lang="scss" scoped>
.footer {
  padding: 35px 160px;
  background-color: #000000; /* 背景色可以根據需要調整 */
  color: #fcfcfc;
  @include respond(xxl) {
    padding-left: 160px;
    padding-right: 160px;
  }
  @include respond(xl) {
    padding-left: 80px;
    padding-right: 80px;
  }
  @include respond(lg) {
    padding-left: 40px;
    padding-right: 40px;
  }
  @include respond(md) {
    padding-left: 20px;
    padding-right: 20px;
  }
  @include respond(sm) {
    padding-left: 10px;
    padding-right: 10px;
  }
  @include respond(xs) {
    padding-left: 5px;
    padding-right: 5px;
  }
  
  .footer-top {
    display: flex;
    justify-content: space-between;
    
    .footer-top_title {
      display: flex;
      align-items: center;
    }
  }
}
</style>
