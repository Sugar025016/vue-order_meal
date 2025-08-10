<template>
  <div class="register">
    <div class="register-title" >
      <div class="title">
        <def-title></def-title>
      </div>
      <div class="img">
        <img
          v-if="$route.path == '/Register/shop'"
          src="@/assets/images/openShop3.png"
          class="w-8 h-8 rounded-full"
          loading="lazy"
        />
        <img
          v-else
          src="@/assets/images/food.png"
          class="w-8 h-8 rounded-full"
          loading="lazy"
        />
      </div>
    </div>
    <div class="register-content">
      <!-- <member></member> -->
      <Router-view></Router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
// import { isBreakpointMD } from '@/utils/windowSize'
let $route = useRoute()
$route.path
</script>
<style lang="scss" scoped>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  .register-title {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: calc(11vw - 40px);
    .title {
      display: flex;
      justify-content: center;
      margin: 0 0;
      vertical-align: middle;
      // color: $color;
      font-weight: 700;
      font-size: 56px;
      white-space: nowrap;
      width: auto;
    }
    .img {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-top: 20px;
      max-width: 300px;
      // margin: 20px 10%;
      img {
        width: 100%; /* Ensure image does not exceed container width */
        height: 100%; /* Ensure image does not exceed container height */
        max-width: 260px;
        max-height: 260px;

        object-fit: contain;
      }
    }
  }

  .register-content {
    margin: 0 calc(11vw - 40px);
    // @media (max-width: $breakpoint-md) {
    //   margin: 0;
    // }
  }
}
</style>
