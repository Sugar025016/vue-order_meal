<template>
  <el-breadcrumb separator="/" :separator-icon="ArrowRight">
    <router-link :to="{ path: '/BuyShops' }">
      <!-- <span class="title">{{ title }}</span> -->
      <span class="title">餓餓定便當</span>
    </router-link>
  </el-breadcrumb>
</template>
<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
// import useLayOutSettingStore from '@/store/modules/setting'
// let LayOutSettingStore = useLayOutSettingStore()
// const changeIcon = () => {
//   LayOutSettingStore.isCollapse = !LayOutSettingStore.isCollapse
// }
let title = document.title
</script>

<style lang="scss" scoped>
a {
  text-decoration: none;
}
.title {
  vertical-align: middle;
  font-size: 30px;
  color: $color;
  font-weight: 700;
}
</style>
