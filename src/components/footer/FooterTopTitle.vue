<template>
  <div class="footer-top-title">
    <router-link :to="{ path: '/' }">
      <span class="footer-top-title__title">餓餓定便當</span>
    </router-link>
  </div>
</template>
<script setup lang="ts">

let title = document.title;
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.footer-top-title__title {
  vertical-align: middle;
  font-size: 30px;
  color: $color;
  font-weight: 700;
}
</style>
