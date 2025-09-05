<script setup lang="ts">
import { ArrowDown } from "@element-plus/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import {
  User as UserIcon,
  ShoppingBag,
  Document,
} from "@element-plus/icons-vue";
let $router = useRouter();
let $route = useRoute();
let sellOrderModalOpen = ref(false);
let memberModelOpen = ref(false);

// const chooseAddressRef = ref<typeof ChooseAddressModel>()

const path = window.location.hash;
// $router.getRoutes()

const props = defineProps({
  isToolbarVisibleAll: Boolean,
});

const toLogin = () => {};

const logout = async () => {};

const changeLink = async (to: string) => {
  // $router.push('/BuyMember/' + path + '/' + page)
  $router.push(to);
};
type Orders = any[]; // 🔹假型別（你有定義可以替換掉）
let orderNew = ref<Orders>([]);
const chooseAddressOpen = async () => {
  // chooseAddressRef.value?.open();
};

const userStore = ref({
  account: "demo_account",
  username: "測試用戶",
  cartCount: 3,
  orderCount: 5,
});
</script>
<template>
  <div class="user-bar">
    <div class="user-bar__user">
      <el-icon class="icon" v-if="userStore.username"
        ><UserIcon class="svg-icon"
      /></el-icon>
      <el-dropdown v-if="userStore.username" >
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="changeLink('/profile')">
              會員資料
            </el-dropdown-item>
            <el-dropdown-item @click="changeLink('/BuyOrder')">
              歷史訂單
            </el-dropdown-item>
            <el-dropdown-item @click="changeLink('/favorite')">
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

    <div class="user-bar__item" :class="{ shopCar: userStore.account != '' }">
      <router-link :to="'/BuyShopCart'" class="link">
        <el-icon class="icon" v-if="userStore.username"
          ><ShoppingBag class="svg-icon"
        /></el-icon>
        <span class="user-bar__count">
          {{ userStore.cartCount }}
        </span>
      </router-link>
      <router-link :to="'/BuyOrder'" class="link" v-if="userStore.account">
        <el-icon class="icon order" v-if="userStore.username"
          ><Document class="svg-icon"
        /></el-icon>
        <span class="user-bar__count order-count">
          {{ userStore.orderCount }}
        </span>
      </router-link>
    </div>
  </div>

  <!-- <SellOrderModal
    v-model:scheduleVisible="sellOrderModalOpen"
    :orderNew="orderNew"
  ></SellOrderModal> -->
  <!-- <MemberModel v-model:memberModelOpen="memberModelOpen"></MemberModel> -->

  <!-- <ChooseAddressModel ref="chooseAddressRef"></ChooseAddressModel> -->
</template>

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
