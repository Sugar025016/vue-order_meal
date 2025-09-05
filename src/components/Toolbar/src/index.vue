<template>
  <!-- <el-header style="text-align: right; font-size: 12px"> -->
  <el-header class="el-header">
    <div class="toolbar">
      <div class="toolbar_left">
        <BreadCrumb />
      </div>
      <div class="toolbar_middle" v-if="true && true">
        <!-- <OrderBar /> -->
      </div>
      <div class="toolbar_right" >
        <LoginRegisterBar v-if="false"/>
        <UserBar v-else/>
      </div>
      <div class="" v-if="!true">
        <OrderSetting />
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import BreadCrumb from "./breadcrumb/index.vue";
// import Setting from './setting/index.vue'
import LoginRegisterBar from "./loginRegisterBar/index.vue";

import UserBar from  "@/components/Toolbar/src/userBar/index.vue";
// import OrderBar from  "@/components/Toolbar/src/OrderBar/index.vue";
// import OrderSetting from './orderSetting/index.vue'
// import Order from './order/index.vue'
// import { onMounted } from 'vue'

defineProps(["scene"]);
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #ffffff;
  height: 80px;
  box-shadow: 3px 3px 5px #dbdbdb, -3px -3px 5px #e2e2e2;
  // box-shadow: 0px 8px 15px #dbdbdb;
  z-index: 10
  ;
  .toolbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    .toolbar_left {
      display: flex;
      align-items: center;
      // margin-left: 10px;
      height: 100%;
    }
    .toolbar_right {
      display: flex;
      align-items: center;
      height: 100%;
    }

    @media (max-width: $breakpoint-md) {
      padding: 0;

      display: flex;
      justify-content: space-between;
      .toolbar_left {
        margin-right: auto;
      }
      .toolbar_right {
        margin-right: 10px;
      }
    }

    @media (max-width: $breakpoint-xs) {
      padding: 0;
    }
  }
}
</style>
