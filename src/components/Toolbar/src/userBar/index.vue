<template>
  <div class="user-bar">
    <div class="user-bar__user">
      <el-icon class="icon" v-if="userStore.user?.name"
        ><UserIcon class="svg-icon"
      /></el-icon>
      <el-dropdown v-if="userStore.user?.name" style="cursor: pointer">
        <span class="user-bar__el-dropdown-link">
          {{ userStore.user?.name }}
          <el-icon class="el-icon__right">
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

    <el-link @click="openCartDrawer()" class="link" :underline="false">
      <el-icon class="icon" v-if="userStore.user?.name"
        ><ShoppingBag class="svg-icon"
      /></el-icon>
      <span class="user-bar__count">
        {{
          userStore.user?.cartShopCount == null
            ? 0
            : userStore.user?.cartShopCount
        }}
      </span>
    </el-link>
    <router-link
      :to="{
        path: '/user/order',
        query: { status: `${Date.now()}` },
      }"
      class="link"
      v-if="userStore.user?.name"
    >
      <el-icon class="icon order" v-if="userStore.user?.name"
        ><Document class="svg-icon"
      /></el-icon>
      <span class="user-bar__count order-count">
        {{ orderStore?.ordersCount == null ? 0 : orderStore?.ordersCount }}
      </span>
    </router-link>

    <div class="user-bar__pickup-mode">
      <el-switch
        v-model="orderStore.deliveryType"
        class="ml-2"
        inline-prompt
        active-text="外送"
        inactive-text="自取"
        :active-value="1"
        :inactive-value="2"
        size="large"
      />
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
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import {
  User as UserIcon,
  ShoppingBag,
  Document,
} from "@element-plus/icons-vue";
import ChooseAddressModel from "@/components/Toolbar/src/toolbarChooseAddress/index.vue";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { useAddressStore } from "@/stores/address";
import { useOrderStore } from "@/stores/order";

const addressStore = useAddressStore();
const orderStore = useOrderStore();
let $router = useRouter();

const cartDrawerRef = ref<InstanceType<typeof CartDrawer> | null>(null);
function openCartDrawer() {
  cartDrawerRef.value?.openCart();
  console.log("openCartDrawer");
}

const authStore = useAuthStore();
const userStore = useUserStore();

const chooseAddressRef = ref<typeof ChooseAddressModel>();


const props = defineProps({
  isToolbarVisibleAll: Boolean,
});

const logout = async () => {
  await authStore.logout();
};

const changeLink = async (to: string) => {
  // $router.push('/BuyMember/' + path + '/' + page)
  // $router.push(to);
  $router.push({
    path: `${to}`,
    query: { t: Date.now() }, // 每次都不一樣，保證觸發路由更新
  });
};


const chooseAddressOpen = async () => {
  chooseAddressRef.value?.open();
};

onMounted(async () => {
  const need = await addressStore.checkNeedChooseAddress();
  orderStore.getProcessingOrdersCount();
  console.log("need:////////////", need);
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
  gap: 15px;

  .user-bar__user {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e32828;
    .el-dropdown {
      height: 15px;
      .user-bar__el-dropdown-link {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
      }
    }
  }

  // .user-bar__item {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   height: 100%;
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
    margin-right: 10px;
    // width: 60px;
    .user-bar__count {
      position: absolute;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      right: -10px;
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
  // }

  .user-bar__pickup-mode {
    display: flex;
    // align-self: flex-end;
    // margin-left: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 5px;
    .el-switch {
      width: 100%;
      height: auto;
      --el-switch-off-color: #e35858;
      --el-switch-on-color: #fd8928;
    }
  }
}
</style>
