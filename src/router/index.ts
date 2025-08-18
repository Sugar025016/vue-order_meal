import { createRouter, createWebHistory } from 'vue-router'
import AuthLayout from '@/layouts/AuthLayout.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    component: AuthLayout,
    children: [
      { path: 'login', name: 'Login', component: LoginView },
      { path: 'register', name: 'register', component: RegisterView },
    ],
  },
  { path: '/home', component: HomeView }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
