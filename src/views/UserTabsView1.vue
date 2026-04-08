<template>
  <div class="user-tabs">
    <div class="user-tabs__center">
      <el-tabs
        v-model="activeTab"
        :tab-position="tabPosition"
        @tab-change="onTabChange"
      >
        <el-tab-pane label="會員資料" name="profile" />
        <el-tab-pane label="歷史訂單" name="order" />
        <el-tab-pane label="收藏店家" name="favorite" />
      </el-tabs>

      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { TabsInstance } from "element-plus";

const route = useRoute();
const router = useRouter();

const tabPosition = ref<TabsInstance["tabPosition"]>("left");

// 目前 tab
const activeTab = ref("profile");

// 根據網址同步 tab
watch(
  () => route.path,
  () => {
    const section = route.path.split("/")[2] || "profile";
    activeTab.value = section;
  },
  { immediate: true },
);

// tab 切換 → 更新網址
const onTabChange = (tabName: string) => {
  router.push(`/user/${tabName}`);
};

// RWD tab 方向
const updateTabPosition = () => {
  tabPosition.value = window.innerWidth <= 992 ? "top" : "left";
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

      :deep(.el-tabs__content) {
        margin: 10px 0 0 0;
      }
      @media (max-width: $breakpoint-md) {
      }
      @media (max-width: $breakpoint-md) {
        display: flex;
        :deep(.el-tabs__content) {
          margin: 0;
        }
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
