<template>
  <div class="user-bar">
    <div class="user-bar__user">
      <el-icon class="icon" v-if="authStore.user?.name"
        ><UserIcon class="svg-icon"
      /></el-icon>
      <el-dropdown v-if="authStore.user?.name" style="cursor: pointer">
        <span class="el-dropdown-link">
          {{ authStore.user?.name }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="changeLink('/user/profile')">
              會員資料
            </el-dropdown-item>
            <el-dropdown-item @click="changeLink('/user/order')">
              歷史訂單
            </el-dropdown-item>
            <el-dropdown-item @click="changeLink('/user/favorite')">
              收藏店家
            </el-dropdown-item>
            <el-dropdown-item @click="chooseAddressOpen()" divided>
              設定外送地點
            </el-dropdown-item>
            <el-dropdown-item @click="logout()" divided>登出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <div
      class="user-bar__item"
      :class="{ shopCar: authStore.user?.account != '' }"
    >
      <el-link @click="openCartDrawer()" class="link" :underline="false">
        <el-icon class="icon" v-if="authStore.user?.name"
          ><ShoppingBag class="svg-icon"
        /></el-icon>
        <span class="user-bar__count">
          {{
            authStore.user?.cartShopCount == null
              ? 0
              : authStore.user?.cartShopCount
          }}
        </span>
      </el-link>
      <router-link
        :to="'/BuyOrder'"
        class="link"
        v-if="authStore.user?.account"
      >
        <el-icon class="icon order" v-if="authStore.user?.name"
          ><Document class="svg-icon"
        /></el-icon>
        <span class="user-bar__count order-count">
          {{
            authStore.user?.orderCount == null ? 0 : authStore.user?.orderCount
          }}
        </span>
      </router-link>
    </div>
  </div>

  <!-- <SellOrderModal
    v-model:scheduleVisible="sellOrderModalOpen"
    :orderNew="orderNew"
  ></SellOrderModal> -->
  <!-- <MemberModel v-model:memberModelOpen="memberModelOpen"></MemberModel> -->

  <CartDrawer ref="cartDrawerRef"></CartDrawer>
  <ChooseAddressModel ref="chooseAddressRef"></ChooseAddressModel>
</template>

<script setup lang="ts">
import CartDrawer from "@/components/cart/CartDrawer.vue";

import { ArrowDown } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import {
  User as UserIcon,
  ShoppingBag,
  Document,
} from "@element-plus/icons-vue";
import ChooseAddressModel from "@/components/Toolbar/src/toolbarChooseAddress/index.vue";
import { useAuthStore } from "@/stores/auth";
import { useAddressStore } from "@/stores/address";

const addressStore = useAddressStore();
let $router = useRouter();
let $route = useRoute();
let sellOrderModalOpen = ref(false);
let memberModelOpen = ref(false);

const cartDrawerRef = ref<InstanceType<typeof CartDrawer> | null>(null);
function openCartDrawer() {
  cartDrawerRef.value?.openProduct();
  console.log("openCartDrawer");
}

const authStore = useAuthStore();

const chooseAddressRef = ref<typeof ChooseAddressModel>();

const path = window.location.hash;
// $router.getRoutes()

const props = defineProps({
  isToolbarVisibleAll: Boolean,
});

const toLogin = () => {};

const logout = async () => {
  authStore.logout();
};

const changeLink = async (to: string) => {
  // $router.push('/BuyMember/' + path + '/' + page)
  $router.push(to);
};
type Orders = any[]; // 🔹假型別（你有定義可以替換掉）
let orderNew = ref<Orders>([]);
const chooseAddressOpen = async () => {
  chooseAddressRef.value?.open();
};
const userStore = authStore.user;
// const userStore = ref({
//   account: "demo_account",
//   username: "測試用戶",
//   cartCount: 3,
//   orderCount: 5,
// });


onMounted(async () => {
  
  const need = await addressStore.checkNeedChooseAddress();
  console.log("need:////////////",need )
  if (need) {
    chooseAddressRef.value?.open();
  }
});
</script>

<style lang="scss" scoped>
.svg-icon {
  border-radius: 20px;
  margin: 0px;
  font-size: 32px;
}
.user-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .user-bar__user {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e32828;
    .el-dropdown {
      height: 15px;
      .el-dropdown-link {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
      }
    }
  }

  .user-bar__item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    span {
      // font-size: 16px;
      font-weight: 800;
    }
    .link {
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      width: 100%;
      height: 100%;
      position: relative;

      width: 60px;
      .user-bar__count {
        position: absolute;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        border: 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        right: 6px;
        top: 8px;
        background-color: $color;
        font-size: 18px;
        color: white;
      }

      .order {
        color: rgb(35, 130, 255);
      }
      .order-count {
        border-radius: 50%;
        background-color: rgb(35, 130, 255);
      }
    }
  }
}
</style>
