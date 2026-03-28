<template>
  <div class="order-list">
    <h1>進行中的訂單</h1>
    <template
      v-for="order in orderStore.OrderActive"
      :key="order.id"
      v-if="orderStore.OrderActive.length > 0"
    >
      <OrderCard :order="order" />
    </template>
    <template v-else>
      <el-empty description="沒有進行中的訂單" />
    </template>
    <h1>過去的訂單</h1>
    <template
      v-for="order in orderStore.OrderHistory.data"
      :key="order.id"
      v-if="orderStore.OrderHistory.data.length > 0"
    >
      <OrderCard :order="order" />
    </template>

    <div v-else>
      <el-empty description="沒有過去的訂單" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOrderStore } from "@/stores/order";
// import { Order } from "@/types/order";
import { Paginated } from "@/types/response";
import { ElMessage } from "element-plus";

import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { getOrderHistoryApi } from "@/api/order";
import OrderCard from "@/components/order/OrderCard.vue";
const orderStore = useOrderStore();

const page = ref<number>(1);

// const orderActive = ref<Order[]>([]);
// const orderHistoryPageResponse = ref<Paginated<Order>>({
//   data: [],
//   current_page: 0,
//   last_page: 0,
//   per_page: 0,
//   total: 0,
// });

const getOrders = async (page: number) => {
  await orderStore.getOrderActive();
  await orderStore.getOrderHistory(page);
};

onMounted(() => {
  // (window.addEventListener("scroll", handleScroll), getOrder(page.value));
  getOrders(page.value);
});
</script>

<style lang="scss" scoped>
$table-cell-padding-y: 1.5rem;
$table-border-color: rgb(155, 155, 155);
$table-border-color: rgba(155, 155, 155, 0.548);

.example-showcase .el-loading-mask {
  z-index: 9;
}
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
.order-list {
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  h1 {
    font-size: 22px;
    margin: 0 10px 20px 10px;
    color: $color;
    font-weight: 600;
  }
  .loading {
    height: 50px;
    margin-top: 20px;
  }
}

//   h1 {
//     font-size: 22px;
//     margin: 0 10px 20px 10px;
//     color: $color;
//     font-weight: 600;
//   }

//   .loading {
//     height: 50px;
//     margin-top: 20px;
//   }
// }
</style>
