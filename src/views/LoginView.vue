<template>
  <div class="login-container">
    <LeftImage />
    <LoginForm />
  </div>
</template>

<script setup>
import LeftImage from '@/components/auth/LeftImage.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh;
}
</style>