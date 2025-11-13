<template>
  <div>
    <Router-view :key="$route.fullPath"></Router-view>
    <!-- <Router-view ></Router-view> -->
  </div>
</template>

<!-- <script setup lang="ts"></script> -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

onMounted(async () => {
  if (authStore.hasToken) {
    await authStore.getUser()
  }
})
</script>
<style></style>
