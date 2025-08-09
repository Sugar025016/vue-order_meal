<template>
  <form @submit.prevent="onLogin">
    <h2>登入</h2>

    <label>Email:</label>
    <input v-model="email" type="email" required />

    <label>密碼:</label>
    <input v-model="password" type="password" required />

    <button type="submit">登入</button>

    <p v-if="error" class="error">{{ error }}</p>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()
const authStore = useAuthStore()

const onLogin = () => {
  const success = authStore.login(email.value, password.value)
  if (success) {
    error.value = ''
    router.push('/home')
  } else {
    error.value = '帳號或密碼錯誤'
  }
}
</script>

<style scoped>
form {
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
}
input {
  margin-bottom: 1rem;
  padding: 8px;
}
.error {
  color: red;
}
</style>
