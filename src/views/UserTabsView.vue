<template>
  <div class="user-tabs">
    <el-tabs
      v-model="activeTab"
      :tab-position="tabPosition"
      style="height: 200px"
      class="demo-tabs"
      @tab-change="onTabChange"
    >
      <el-tab-pane label="會員資料" name="profile" />
      <el-tab-pane label="歷史訂單" name="order" />
      <el-tab-pane label="收藏店家" name="favorite" />
    </el-tabs>

    <keep-alive>
      <component :is="currentComponent" />
    </keep-alive>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import type { TabsInstance } from "element-plus";

import Profile from "@/components/user/Profile.vue";
import Order from "@/components/user/Order.vue";
import Favorite from "@/components/user/Favorite.vue";

const route = useRoute();
const router = useRouter();

const tabPosition = ref<TabsInstance["tabPosition"]>("left");

// 目前網址的 section
const activeTab = ref(route.params.section || "profile");

// 當網址變動 → tabs 跟著變
watch(
  () => route.params.section,
  (val) => {
    if (val) activeTab.value = val;
  }
);

// tabs 切換 → 更新網址
const onTabChange = (tabName) => {
  router.push(`/user/${tabName}`);
};

// 動態決定顯示哪個元件
const currentComponent = computed(() => {
  switch (activeTab.value) {
    case "profile":
      return Profile;
    case "order":
      return Order;
    case "favorite":
      return Favorite;
    default:
      return Profile;
  }
});
</script>
<style lang="scss" scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}

.user-tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
</style>
