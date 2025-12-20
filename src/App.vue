<template>
  <div>
    <Router-view :key="$route.fullPath"></Router-view>
    <!-- <Router-view ></Router-view> -->
  </div>
</template>

<!-- <script setup lang="ts"></script> -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

onMounted(async () => {
  if (userStore.hasToken) {
    await userStore.getUser()
  }
})
</script>
<style></style>
