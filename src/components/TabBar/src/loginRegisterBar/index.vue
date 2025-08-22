<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

let $router = useRouter()

const router = (to: string) => {
  $router.push(to)
}
</script>
<template>
  <div class="order-text">
    <el-button type="danger" @click="router('/login')" round size="large" link>
      登入
    </el-button>

    <el-button
      type="primary"
      @click="router('/Register')"
      round
      size="large"
      link
    >
      註冊
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.order-text {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  gap: 10px;

  .el-button {
    font-size: 20px;
    font-weight: 600;
    margin-left: 0;
  }

  @media (max-width: $breakpoint-xs) {
    margin: 0;
    .el-button {
      font-size: 16px;
      padding: 0;
    }
  }
}
</style>
