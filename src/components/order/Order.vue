<template>
  <div class="order">
    <el-card class="order__shop">
      <el-link
        href="https://element-plus.org"
        target="_blank"
        underline="never"
      >
        <div class="order__shop-name">
          {{ orderStore.order?.shop?.brand }} -
          {{ orderStore.order?.shop?.branch }}
        </div>
      </el-link>
      <div class="order__shop-info">
        <div class="order__shop-info-data">
          <el-icon :size="20"><LocationOutline /></el-icon>
          <span>地址：</span>
          <span>
            {{
              orderStore.order?.shop?.city +
              orderStore.order?.shop?.area +
              orderStore.order?.shop?.street +
              orderStore.order?.shop?.detail
            }}
          </span>
        </div>
        <div class="order__shop-info-data">
          <el-icon :size="20"><CallConnecting20Regular /></el-icon>
          <span>電話：</span>
          <span>{{ orderStore.order?.shop?.phone }}</span>
        </div>
      </div>
    </el-card>

    <el-card class="order__summary">
      <div class="order__summary-header">
        <span
          class="order__summary-type"
          v-if="orderStore.order?.order_type === 2"
        >
          預定訂單 -
        </span>

        <span
          class="order__summary-type"
          v-else-if="orderStore.order?.order_type === 1"
        >
          即時訂單 -
        </span>

        <span
          class="order__summary-delivery"
          v-if="orderStore.order?.delivery_type === 1"
        >
          外送
        </span>

        <span
          class="order__summary-delivery"
          v-else-if="orderStore.order?.delivery_type === 2"
        >
          自取
        </span>
      </div>

      <div class="order__summary-content">
        <div class="order__summary-row">
          <span class="order__summary-label">訂單編號：</span>
          <span class="order__summary-value">
            {{ orderStore.order?.order_number }}
          </span>
        </div>

        <div
          class="order__summary-row"
          v-if="orderStore.order?.delivery_type === 1"
        >
          <span class="order__summary-label">外送地址：</span>
          <span>
            {{
              orderStore.order?.city +
              orderStore.order?.area +
              orderStore.order?.street +
              orderStore.order?.detail
            }}
          </span>
        </div>

        <div
          class="order__summary-row"
          v-if="orderStore.order?.order_type === 1"
        >
          <span class="order__summary-label">預定時間：</span>
          <span class="order__summary-value">
            {{ orderStore.order?.estimated_delivery_time }}
          </span>
        </div>

        <div
          class="order__summary-row"
          v-if="orderStore.order?.order_type === 2"
        >
          <span class="order__summary-label">預約時間：</span>
          <span class="order__summary-value">
            {{ orderStore.order?.scheduled_time }}
          </span>
        </div>

        <div class="order__summary-row">
          <span class="order__summary-label">訂單狀態：</span>
          <el-timeline>
            <el-timeline-item
              v-for="(item, index) in timeline"
              :key="index"
              :timestamp="item.timestamp"
              :type="item.type"
            >
              {{ item.content }}
            </el-timeline-item>
          </el-timeline>
        </div>
        <div class="order__summary-row">
          <span class="order__summary-label">餐具：</span>
          <span class="order__summary-value">
            {{ orderStore.order?.is_cutlery ? "需要餐具" : "不需要餐具" }}
          </span>
        </div>
        <div class="order__summary-row">
          <span class="order__summary-label">付款方式：</span>
          <span class="order__summary-value">
            {{ PayMethodText[orderStore.order.pay_method] }}
          </span>
        </div>
        <div class="order__summary-row">
          <span class="order__summary-label">訂單備註：</span>
          <span>{{ orderStore.order?.customer_note }}</span>
        </div>
      </div>
    </el-card>

    <el-card class="order__items">
      <div class="order__items-header">
        <span class="order__items-title">訂單內容</span>
      </div>
      <div class="order__items-list">
        <div
          class="order__items-list-item"
          v-for="item in orderStore.order?.items"
          :key="item.id"
        >
          <div class="order__item_name">
            <span>{{ item.product_name }}</span>
          </div>
          <div class="order__item_qty_price">
            <div class="order__item_qty">
              <span>x</span>
              <span>{{ item.quantity }}</span>
            </div>
            <div class="order__item_total_price">
              <span>{{ formatPrice(item.product_price * item.quantity) }}</span>
            </div>
          </div>
        </div>
      </div>

      <hr />
      <div class="order__item_info">
        <div class="order__item_name">
          <span>訂單金額：</span>
          <span>{{ formatPrice(orderStore.order?.subtotal) }}</span>
        </div>
        <div class="order__item_name">
          <span>外送金額：</span>
          <span>{{ formatPrice(orderStore.order?.delivery_fee) }}</span>
        </div>
        <div class="order__item_name">
          <span>總金額：</span>
          <span>{{ formatPrice(orderStore.order?.total_price) }}</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import { LocationOutline } from "@vicons/ionicons5";

import { CallConnecting20Regular } from "@vicons/fluent";
import { useOrderStore } from "@/stores/order";

import { PayMethodText } from "@/enums/PayMethod";

const route = useRoute();

const baseTimeline = [
  { status: 1, text: "訂單已建立" },
  { status: 2, text: "訂單已確認" },
  { status: 3, text: "餐點準備中" },
  { status: 4, text: "已出餐" },
  { status: 5, text: "" },
  { status: 6, text: "訂單已完成" },
];
const timeline = computed(() => {
  const status = orderStore.order?.status ?? 0;
  const deliveryType = orderStore.order?.delivery_type ?? 0;

  return baseTimeline.map((item) => {
    let text = item.text;

    if (item.status === 5) {
      text = deliveryType === 1 ? "外送中" : "待取餐";
    }

    return {
      content: text,
      timestamp: item.status === 1 ? (orderStore.order?.created_at ?? "") : "",
      type: status >= item.status ? "primary" : "info",
    };
  });
});
const orderStore = useOrderStore();

const weekNames = [
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六",
  "星期日",
];

const statusText: Record<number, string> = {
  1: "訂單已建立",
  2: "訂單已確認",
  3: "餐點準備中",
  4: "外送中",
  5: "訂單已完成",
  6: "訂單已取消",
  7: "訂單異常",
};
function formatPrice(value: number) {
  return `$${value.toLocaleString()}`;
}

// 初始化
onMounted(() => {
  const orderNumber = Array.isArray(route.params.orderNumber)
    ? route.params.orderNumber[0]
    : (route.params.orderNumber ?? "");

  orderStore.fetchOrder(orderNumber);
});
</script>

<style lang="scss" scoped>
$b-color: $color;

.order {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px; /* 左右間距 */
  font-size: 18px;
  font-weight: 460;

  .el-card {
    flex: 1; /* 左邊佔一半空間 */
    display: flex;
    border-radius: 20px;
    flex-direction: column;
    border: 0px;
    background-color: rgba(255, 230, 193, 0.54);
    width: 100%;
  }

  .order__shop {
    .order__shop-name {
      display: flex;
      width: 100%;
      flex-wrap: wrap; /* 允許換行 */
      align-items: center; /* 垂直置中 */
      justify-content: center; /* 水平置中 */
      font-size: 36px;
      color: rgb(0, 0, 0);

      .order__icon-heart {
        color: rgba(0, 0, 0, 0.801);
      }
    }
    .order__shop-info {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 20px 0;
      .order__shop-info-data {
        display: flex;
        width: 100%;
        align-items: center; /* 垂直置中 */
      }
    }
  }
  .order__summary {
    .order__summary-header {
      display: flex;
      width: 100%;
      flex-wrap: wrap; /* 允許換行 */
      align-items: center; /* 垂直置中 */
      font-size: 36px;
      color: rgb(0, 0, 0);
    }
    .order__summary-content {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin: 20px 0;
      .order__summary-row {
        display: flex;
        width: 100%;
        align-items: center; /* 垂直置中 */
        .order__summary-label {
          margin-right: 10px;
        }

        .order__summary-value {
          // margin-right: 10px;
          color: #ff6404;
          font-weight: 550;
          // font-size: 20px;
        }
      }
    }
  }

  .order__items {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    .order__items-header {
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center; /* 垂直置中 */
      .order__items-title {
        display: flex;
        align-items: center; /* 垂直置中 */
        justify-content: center; /* 水平置中 */
        font-size: 36px;
        color: rgb(0, 0, 0);
      }
    }

    .order__items-list {
      .order__items-list-item {
        display: flex;
        justify-content: space-between;
        gap: 10px;
        display: flex;
        gap: 10px;
        margin: 20px;
        .order__item_qty_price {
          display: flex;
          align-items: center;
          column-gap: 5px;
          flex-wrap: wrap;
          gap: 20px;
          .order__item_qty {
            display: flex;
            justify-content: space-between;
            width: 30px;
          }
          .order__item_total_price {
            text-align: right;
            width: 50px;
          }
        }
      }
    }
    .order__item_info {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin: 20px;
      .order__item_name {
        display: flex;
        width: 100%;
        align-items: center; /* 垂直置中 */
        justify-content: space-between;
      }
    }
  }

  .el-image {
    flex: 1; /* 左邊佔一半空間 */
    border-radius: 20px;
  }

  @include respond(md) {
    .el-image {
      display: none;
    }
  }
}
</style>
