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
import { ref } from "vue";
import { useLoadingStore } from "@/stores/loading";
import { ElLoading } from "element-plus";

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

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // 返回上一頁時保持 scroll 位置
      return savedPosition;
    } else {
      // 新頁面一律滾動到頂部
      return { top: 0, behavior: "smooth" };
    }
  },
});
let loadingInstance: any = null;
router.beforeEach((to, from, next) => {
  loadingInstance = ElLoading.service({
    lock: true,
    text: "載入中...",
    background: "rgba(0, 0, 0, 0.3)",
  });

  next();
});

router.afterEach(() => {
  loadingInstance?.close();
  // setTimeout(() => {
  //   loadingInstance?.close();
  // }, 1000);
});

export default router;
