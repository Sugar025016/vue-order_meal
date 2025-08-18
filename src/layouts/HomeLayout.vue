<template>
  <div class="auth-layout">
        <div class="auth-layout_router-view">
      <Header />
    </div>
    <div class="auth-layout_router-view">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Footer from "@/components/footer/Footer.vue";
import Header from "@/components/footer/Footer.vue";
</script>
<style lang="scss" scoped>
.auth-layout {
  min-height: 100vh; /* 最小高度佔滿整個視窗 */
  display: flex;
  flex-direction: column;

  .auth-layout_router-view {
    display: flex;
    flex: 1; /* 主內容填滿剩餘空間 */
  }
}
</style>
