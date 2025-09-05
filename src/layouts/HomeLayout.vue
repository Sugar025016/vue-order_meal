<template>
  <div class="home-layout">
      <Header />
    <div class="home-layout_router-view">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Footer from "@/components/footer/Footer.vue";
import Header from "@/components/Toolbar/src/index.vue";
</script>
<style lang="scss" scoped>
.home-layout {
  min-height: 100vh; /* 最小高度佔滿整個視窗 */
  display: flex;
  flex-direction: column;
  .home-layout_router-view {
    display: flex;
    flex: 1; /* 主內容填滿剩餘空間 */
  }
}
</style>
