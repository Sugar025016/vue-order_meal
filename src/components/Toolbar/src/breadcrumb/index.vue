<template>
  <div class="sell-tabBar" v-if="false">
    <div class="sell-tabBar-md" v-if="false">
      <el-button @click="changeIcon" type="primary">
        <!-- <el-icon style="cursor: pointer" size="30px">
          <component
            :is="LayOutSettingStore.isCollapse ? Expand : Fold"
          ></component>
          
        </el-icon> -->
      </el-button>
      <router-link :to="'/'" class="link">
        <HomeFilled class="icon-homeFilled" />
      </router-link>
    </div>
    <div class="sell-tabBar" v-else>
      <!-- <el-icon
        style="margin-right: 10px; cursor: pointer"
        size="20px"
        @click="changeIcon"
      >
        <component
          :is="true ? Expand : Fold"
        ></component>
      </el-icon> -->
      <el-breadcrumb separator="/" :separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="(item, index) in $route.matched"
          :key="index"
          v-show="item.meta.title"
          :to="item.path"
        >
          <el-icon style="vertical-align: middle">
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span style="margin: 0 5px; vertical-align: middle"> </span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>

  <div class="title" v-else>
    <router-link :to="'/'" class="link">
      <h1 class="title">餓餓定便當</h1>
    </router-link>
  </div>
</template>
<script setup lang="ts">
// import useLayOutSettingStore from '@/store/modules/setting'
import { ArrowRight, Fold, Expand } from "@element-plus/icons-vue";
// import { isBreakpointMD } from '@/utils/windowSize'
// let LayOutSettingStore = useLayOutSettingStore()

import { useRoute } from "vue-router";
import { ref } from "vue";

let $route = useRoute();

const paths = $route.path.split("/");

let isSell: boolean = paths.includes("sell");

const changeIcon = () => {
  // LayOutSettingStore.isCollapse = !LayOutSettingStore.isCollapse
};

// LayOutSettingStore.isCollapse = !isBreakpointMD.value
</script>

<style lang="scss" scoped>
.sell-tabBar {
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  height: 100%;

  .sell-tabBar-md {
    height: auto;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .el-button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 60px;
      background-color: rgb(255, 105, 105);
      @media (max-width: $breakpoint-xs) {
        width: 50px;
      }
    }

    .link {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 60px;
      @media (max-width: $breakpoint-xs) {
        width: 50px;
      }
      .icon-homeFilled {
        color: $color;
        width: 30px;
        height: 30px;
      }
    }
  }
}

.link {
  text-decoration: none;
  .title {
    margin: 0 auto;
    vertical-align: middle;
    color: $color;
    font-weight: 700;
    // font-size: 56px;
    font-size: auto;
    white-space: nowrap;
    @media (max-width: $breakpoint-xs) {
      font-size: 26px;
      font-weight: 600;
    }
  }
}
.title {
  vertical-align: middle;
  font-size: 35px;
  font-weight: 700;

  // @media (max-width: $breakpoint-xs) {
  //   // margin: 0 0 0 10px;
  // }
}

.el-button.is-text {
  color: $color;
}
</style>
