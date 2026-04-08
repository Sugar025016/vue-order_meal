<template>
  <!-- <div class="order-card"> -->
  <div class="order-card" @click="router(`/orders/${order.order_number}`)">
    <!-- {{ order.order_number }} -->
    <div class="order-card__shop">
      <img :src="order.shop.image_path" v-if="order.shop.image_path" alt="AA" />
      <div class="order-card__list">
        <div class="shop-card__header">
          <span class="shop-card__title"
            >{{ order.shop.brand }} - {{ order.shop.branch }}</span
          >
          <ShopFavorite :shopId="order.shop.id" />
        </div>
        <!-- <span class="order-card__content">
          {{ order. }}
        </span> -->
        <span class="shop-card__address">{{
          order.shop.city +
          order.shop.area +
          order.shop.street +
          order.shop.detail
        }}</span>
        <div class="order-card__info">
          <span class="order-card__price">${{ order.total_price }}</span>
          <span class="order-card__order-type">{{
            order.delivery_type == 1 ? "外送" : "自取"
          }}</span>
        </div>
      </div>
      <div class="order-card__status" v-if="order.status < 6">
        <span class="order-card__status-text"
          >{{ OrderStatusText[order.status] }}...</span
        >
      </div>
    </div>
    <div class="order-card__product">
      <!-- <span class="order-card__title">訂單內容</span> -->    
      <hr />
      <span
        class="order-card__content"
        v-for="value in order.items?.slice(0, 4)"
        :key="value.id"
      >
        {{ value.product_name }} x {{ value.quantity }}
      </span>
      <span
        v-if="order.items && order.items.length > 4"
        class="order-card__content"
      >
        ...
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { OrderStatusText } from "@/enums/OrderStatus";
import { Order } from "@/types/order";
import { useRouter } from "vue-router";
let $router = useRouter();

const router = (to: string) => {
  $router.push(to);
};
const props = defineProps<{
  order: Order;
}>();
</script>

<style lang="scss" scoped>
.order-card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border: px solid #ccc;
  border-radius: 18px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: white;
  max-width: 600px;
  width: 100%;
  height: 100%;

  .order-card__shop {
    display: flex;
    margin-bottom: 16px;
    img {
      width: 80px;
      height: 80px;
      border-radius: 8px;
      object-fit: cover;
      margin-right: 16px;
    }
    .order-card__list {
      display: flex;
      flex-direction: column;

      gap: 5px;
      .shop-card__header {
        display: flex;
        align-items: center;
        // justify-content: center;
        margin-bottom: 8px;
        .shop-card__title {
          font-size: 18px;
          font-weight: 600;
          margin-right: 8px;
        }
      }
      .order-card__info {
        display: flex;
        align-items: center;
        gap: 16px;
        .order-card__order-type {
          font-size: 16px;
          color: #ff6363;
        }
        .order-card__price {
          font-size: 16px;
          font-weight: 700;
          color: #333;
        }
      }
    }
    .order-card__status {
      // margin-left: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
      .order-card__status-text {
        font-size: 16px;
        color: #ff7817;
        font-weight: 500;
      }
    }
  }
  .order-card__product {
    .order-card__content {
      display: block;
      margin-bottom: 4px;
    }
  }
}
</style>
