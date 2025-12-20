<template>
  <div class="user-tabs">
    <div class="user-tabs__center">
      {{activeTab}}
      <el-tabs
        v-model="activeTab"
        :tab-position="tabPosition"
        @tab-change="onTabChange"
        scrollToActiveTab
      >
        <el-tab-pane label="會員資料" name="profile"
          >1111111
          <div>
            {{ profile11 }}
          </div>
          <keep-alive>
            <component v-if="activeTab === 'profile'" :is="Profile" />
          </keep-alive>
        </el-tab-pane>

        <el-tab-pane label="歷史訂單" name="order">
          <keep-alive>
            <component v-show="activeTab === 'order'" :is="Order" />
          </keep-alive>
        </el-tab-pane>

        <el-tab-pane label="收藏店家" name="favorite">
          <keep-alive>
            <component v-show="activeTab === 'favorite'" :is="Favorite" />
          </keep-alive>
        </el-tab-pane>
      </el-tabs>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, onBeforeUnmount } from "vue";
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
const updateTabPosition = () => {
  if (window.innerWidth <= 992) {
    tabPosition.value = "top";
  } else {
    tabPosition.value = "left";
  }
};

onMounted(() => {
  updateTabPosition();
  window.addEventListener("resize", updateTabPosition);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateTabPosition);
});
</script>
<style lang="scss" scoped>
.user-tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #feefdb;
  flex: 1;

  .user-tabs__center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 0 calc(5% - 30px);
    height: 100%;
    flex: 1;
    width: 100%;

    .el-tabs {
      display: grid; /* 使用CSS Grid布局 */
      grid-template-columns: 1fr 8fr;
      height: 100%;
      width: 100%;
      :deep(.el-tabs__header) {
        .el-tabs__item {
          font-size: 18px !important;
        }
      }

      @media (max-width: $breakpoint-md) {
        display: flex;
      }
    }

    :deep(.el-tabs--top > .is-top) {
      margin: 10px 0px 0 0;
      padding: 0 calc(10% - 22px);
      width: 100%;
    }
    :deep(.el-tabs--left > .is-left) {
      padding: 100px 0;
    }
  }
}
</style>
