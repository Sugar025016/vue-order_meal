import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(createPinia())  // 啟用 Pinia
app.use(router)  // 啟用 Vue Router
app.mount('#app')