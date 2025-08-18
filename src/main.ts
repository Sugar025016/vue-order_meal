import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import 'virtual:svg-icons-register'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/reset.scss'
// import 'virtual:svg-icons-register'
// import 'leaflet/dist/leaflet.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'  // 引入 Element Plus 中文语言包


const app = createApp(App)
app.use(createPinia())  // 啟用 Pinia
app.use(router)  // 啟用 Vue Router
app.use(ElementPlus, { locale: zhCn })  // 使用 Element Plus 並設置中文語言包

app.mount('#app')
