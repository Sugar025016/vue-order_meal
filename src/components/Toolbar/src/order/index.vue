<!-- <script setup lang="ts">
// import useUserStore from '@/store/modules/user'
// import useSellShopStore from '@/store/modules/sellShop'
import { useRouter, useRoute } from 'vue-router'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
// import { GetOrderNewResponse, Orders } from '@/api/order/type'

import SellOrderModal from './sellOrderModal/index.vue'
import { ElMessage } from 'element-plus'
// import { reqGetOrderNew } from '@/api/order'

// let sellShopStore = useSellShopStore()
// let sellOrderModalOpen = ref(false)
// let userStore = useUserStore()

// let $router = useRouter()
// let $route = useRoute()

// let orderNew = ref<Orders>([])

const props = defineProps({
  isToolbarVisibleAll: Boolean,
})

const getOrderNew = async () => {

}

const goRoute = async (shopId: number, shopName: string) => {

}
const addShop = async () => {

}

onMounted(() => {
  const timer = setInterval(() => {
    getOrderNew()
  }, 60000)
  getOrderNew()
  onBeforeUnmount(() => {
    clearInterval(timer)
  })
})

</script> -->

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { ElMessage } from "element-plus";
import SellOrderModal from "./sellOrderModal/index.vue";
import { Shop, ArrowDown } from "@element-plus/icons-vue";
// Props
const props = defineProps({
  isToolbarVisibleAll: Boolean,
});

// ------------------ 假資料 ------------------
// 模擬使用者商店列表
const userStore = {
  shopNames: ref([
    { id: 1, name: "美味餐廳A" },
    { id: 2, name: "美味餐廳B" },
  ]),
};

// const userStore = ref({
//   account: "demo_account",
//   username: "測試用戶",
//   cartCount: 3,
//   orderCount: 5,
// });

// 模擬新訂單
const orderNew = ref([
  { id: 101, name: "漢堡套餐", quantity: 2 },
  { id: 102, name: "炸雞套餐", quantity: 1 },
]);

// ------------------ 方法 ------------------
const getOrderNew = async () => {
  // 模擬更新假資料
  orderNew.value = [
    { id: 101, name: "漢堡套餐", quantity: Math.floor(Math.random() * 5) + 1 },
    { id: 102, name: "炸雞套餐", quantity: Math.floor(Math.random() * 5) + 1 },
    { id: 103, name: "可樂", quantity: Math.floor(Math.random() * 5) + 1 },
  ];
};

// 打開訂單 Modal
const sellOrderModalOpen = ref(false);
const openSellOrderModal = () => {
  sellOrderModalOpen.value = true;
  ElMessage.success("開啟訂單 Modal（假資料）");
};

// 切換商店
const goRoute = async (shopId: number, shopName: string) => {
  ElMessage.info(`切換到商店：${shopName} (id: ${shopId})`);
};

// 新增商店
const addShop = async () => {
  ElMessage.success("新增餐廳（假資料）");
};

// ------------------ 定時刷新 ------------------
onMounted(() => {
  const timer = setInterval(() => {
    getOrderNew();
  }, 60000); // 每 60 秒刷新一次
  getOrderNew();
  onBeforeUnmount(() => {
    clearInterval(timer);
  });
});
</script>
<template>
  <div class="order">
    <div class="order-text">
      <div class="link">
        <el-link :underline="false" @click="openSellOrderModal">
          <el-icon class="icon list shopOrder"
            ><Shop class="svg-icon"
          /></el-icon>
          <span class="cartQuantity ">
            {{ orderNew.length }}
          </span>
        </el-link>
      </div>
      <el-dropdown v-if="userStore.shopNames.value.length > 1 && true"  >
        <span class="el-dropdown-link" style="cursor: pointer">
          商店
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu type="danger">
            <el-dropdown-item
              v-for="item in userStore.shopNames.value"
              @click="goRoute(item.id, item.name)"
            >
              {{ item.name }}
            </el-dropdown-item>
            <el-dropdown-item @click="addShop" divided>
              <!-- <router-link :to="'/Register/shop'" class="router-link"> -->
              新增餐廳
              <!-- </router-link> -->
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div v-if="userStore.shopNames.value.length == 1">
        <span class="el-dropdown-link" style="cursor: pointer">
          {{ userStore.shopNames.value[0].name }}
        </span>
      </div>
    </div>
  </div>
  <!-- <SellOrderModal
    v-model:scheduleVisible="sellOrderModalOpen"
    :orderNew="orderNew"
    :getOrderNew="getOrderNew"
  ></SellOrderModal> -->
</template>

<style lang="scss" scoped>
.order {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .order-text {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 15px;
    height: 100%;
    width: auto;
    min-width: 60px;

    a {
      color: #333333;
      text-decoration: none;
    }

    .link {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      min-width: 60px;

      .el-link {
        height: 100%;
        width: 100%;

        .el-link__inner {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }
        .cartQuantity {
          position: absolute;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 0px;
          display: flex;
          justify-content: center;
          align-items: center;
          right: 5px;
          top: 16px;
          font-size: 18px;
          color: white;
          background-color: rgb(255, 105, 105);
        }
      }

      .shopOrder {
        color: rgb(255, 105, 105);
        .svg-icon {
          border-radius: 20px;
          margin: 0px;
          font-size: 32px;
        }
      }

    }
    .shop-one {
      margin: 0 10px;
      color: $color;
      span {
        font-weight: 800;
      }
    }
    .el-dropdown-link {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
    }
    .el-dropdown {
      min-width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}


</style>
