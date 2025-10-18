<script setup lang="ts">
import { ref, onMounted } from 'vue'
import request from '@/api/request'

interface ApiResponse {
  code: number
  message: string
  data: {
    token_from_header: string | null
    item: {
      id: number
      name: string
      price: number
    }
  }
}

const responseData = ref<ApiResponse | null>(null)
const error = ref<string | null>(null)

onMounted(async () => {
  // ✅ 模擬登入後有 token
  console.log('已模擬登入，token 已存於 localStorage')

  try {
    const res = await request.get<ApiResponse>('/testAuth')
    responseData.value = res.data
  } catch (err) {
    error.value = '請求失敗'
  }
})
</script>

<template>
  <div class="p-4">
    <h2>測試 Laravel API</h2>
    <pre v-if="responseData">{{ responseData }}</pre>
    <p v-else-if="error" style="color:red">{{ error }}</p>
    <p v-else>載入中...</p>
  </div>
</template>