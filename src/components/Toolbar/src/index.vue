<template>
  <!-- <el-header style="text-align: right; font-size: 12px"> -->

  <el-header class="el-header">
    <div class="toolbar">
      <div class="toolbar_left">
        <BreadCrumb />
      </div>
      <div class="toolbar_middle" v-if="authStore.hasToken && true">
        <OrderBar />
      </div>
      <div class="toolbar_right">
        <!-- {{authStore.token}} -->
        <LoginRegisterBar v-if="!authStore.hasToken" />
        <UserBar v-else />
      </div>
      <div class="" v-if="!true">
        <OrderSetting />
      </div>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import BreadCrumb from "./breadcrumb/index.vue";
import LoginRegisterBar from "./loginRegisterBar/index.vue";
import UserBar from "@/components/Toolbar/src/userBar/index.vue";
import OrderBar from "@/components/Toolbar/src/order/index.vue";

import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";

defineProps(["scene"]);
const authStore = useAuthStore();

onMounted(async () => {
  // if (authStore.hasToken) {
  //   await authStore.getUser()
  // }
});
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #ffffff;
  height: 72px;
  box-shadow: 3px 3px 5px #ffffff94, -3px -3px 5px #ffffffaf;
  padding: var(--responsive-padding);
  padding-top: 3px;
  padding-bottom: 0;
  .toolbar {
    display: flex;
    justify-content: space-between;
    height: 100%;
    .toolbar_left {
      display: flex;
      align-items: center;
      height: 100%;
    }
    .toolbar_right {
      display: flex;
      align-items: center;
      height: 100%;
    }
  }
}
</style>
