import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeLayout from '@/layouts/HomeLayout.vue'
import HomeView from '@/views/HomeView.vue'
import ShopView from '@/views/ShopView.vue'

const routes = [
  {
    path: '/login',
    component: AuthLayout,
    children: [
      { path: '/login', name: 'Login', component: LoginView },
      { path: '/register', name: 'register', component: RegisterView },
    ],
  },
  {
    path: '/',
    component: HomeLayout,
    children: [
      { path: '/', name: 'Home', component: HomeView },
      { path: '/shop', name: 'shop', component: ShopView },
    ],
  },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
