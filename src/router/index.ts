import { createRouter, createWebHistory } from "vue-router";
import AuthLayout from "@/layouts/AuthLayout.vue";
import LoginView from "@/views/LoginView.vue";
import RegisterView from "@/views/RegisterView.vue";
import VerifyView from "@/views/VerifyView.vue";
import HomeLayout from "@/layouts/HomeLayout.vue";
import HomeView from "@/views/HomeView.vue";
import ShopView from "@/views/ShopView.vue";
import TestApi from "@/views/TestApi.vue";
import CartView from "@/views/CartView.vue";
import UserTabsView from "@/views/UserTabsView.vue";
import CheckoutView from "@/views/CheckoutView.vue";
import OrderView from "@/views/OrderView.vue";

const routes = [
  {
    path: "/login",
    component: AuthLayout,
    children: [
      { path: "/login", name: "Login", component: LoginView },
      { path: "/register", name: "register", component: RegisterView },
      { path: "/verifyOtp", name: "verifyOtp", component: VerifyView },
    ],
  },
  {
    path: "/",
    component: HomeLayout,
    children: [
      { path: "/test", name: "TestApi", component: TestApi },
      { path: "/", name: "Home", component: HomeView },
      { path: "/shop/:id", name: "shop", component: ShopView },
      { path: "/cart/:id", name: "cart", component: CartView },
      { path: "/user/:section", name: "user-section", component: UserTabsView },
      { path: "/checkout/:id", name: "checkout", component: CheckoutView },
      { path: "/orders/:orderNumber", name: "order", component: OrderView },
    ],
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
