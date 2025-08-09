import { defineStore } from 'pinia'

interface User {
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null
  }),
  actions: {
    login(email: string, password: string): boolean {
      // 模擬驗證邏輯（可改為 API）
      if (email === 'test@example.com' && password === '123456') {
        this.user = { email }
        return true
      }
      return false
    },
    logout() {
      this.user = null
    }
  }
})
