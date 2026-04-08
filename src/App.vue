<template>
  <!-- <div>
    <Router-view :key="$route.fullPath"></Router-view>
  </div> -->

  <div class="app-loading" v-loading="loadingStore.loading">
    <!-- <router-view /> -->
    <Router-view :key="$route.fullPath"></Router-view>
  </div>
</template>

<!-- <script setup lang="ts"></script> -->
<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { useLoadingStore } from "@/stores/loading";

const loadingStore = useLoadingStore();
const userStore = useUserStore();

onMounted(async () => {
  if (userStore.hasToken) {
    await userStore.getUser();
  }
});
</script>
<style>
.app-loading {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
