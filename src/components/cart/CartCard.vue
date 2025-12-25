<template>
  <!-- <div class="cart-card-wrapper" > -->
  <div class="cart-card-wrapper" :class="{ disabled: !props.cartShop.is_open }">
    <div class="cart-card">
      <!-- <el-link
      class="cart-card__body"
      @click="toShop(props.cartShop.shop.id)"
      :undefinedline="false" 
    > -->
      <div class="cart-card__body">
        <div class="cart-card__shop-info">
          <div class="cart-card__shop-image">
            <img
              v-if="props.cartShop.shop.image_path"
              :src="props.cartShop.shop.image_path"
              alt="Your Image"
              onerror="this.classList.add('no-image-label');"
            />
          </div>
          <div class="cart-card__cotent">
            <span class="cart-card__title"
              >{{ props.cartShop.shop.brand }} -
              {{ props.cartShop.shop.branch }}</span
            >
            <span class="cart-card__phone">{{
              props.cartShop.shop.phone
            }}</span>
          </div>
          <div class="cart-card__delete">
            <el-icon @click.stop="deleteCart(props.cartShop.id)">
              <DeleteFilled />
            </el-icon>
          </div>
        </div>

        <div class="cart-card__product-info">
          <!-- {{ props.cartShop.cart_items }} -->

          <div
            v-for="(cartItem, index) in props.cartShop.cart_items.slice(0, 5)"
            :key="cartItem.product.id"
            class="cart-card__product-image"
          >
            <!-- {{ cartItem.product }} -->
            <img
              :src="cartItem.product.image_path"
              alt="Your Image"
              onerror="this.classList.add('no-image-label');"
            />
            <template
              v-if="index === 4 && props.cartShop.cart_items.length > 5"
            >
              <div class="cart-card__overlay">
                +{{ props.cartShop.cart_items.length - 4 }}
              </div>
            </template>
          </div>
          <!-- <span v-if="props.cartShop.cart_items.length > 4">....</span> -->
          <div
            class="cart-card__product-plus"
            @click="toShop(props.cartShop.shop.id)"
          >
            <el-icon><Plus /></el-icon>
          </div>
        </div>
      </div>

      <div class="cart-card__foot">
        <el-button plain @click="toCart(props.cartShop.id)" round
          >前往購物車</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DeleteFilled, Plus } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { CartShop } from "@/types/cart";
import { useCartShopStore } from "@/stores/cart";
import { checkShopOpenTime } from "@/composables/useShopSchedule";

import { Schedule } from "@/types/schedule";
import { computed } from "vue";

const cartShopStore = useCartShopStore();

const props = defineProps<{
  cartShop: CartShop;
}>();
// const schedules = props.cartShop.shop.schedules as Schedule[];

// const check = (schedules: Schedule[]) => {
//   if (!schedules || schedules.length === 0) return false;
//   const now = new Date();

//   const week = now.getDay(); // JS 0 = Sunday
//   const weekMap = [7, 1, 2, 3, 4, 5, 6]; // JS → 系統
//   const today = weekMap[week];

//   const minutes = now.getHours() * 60 + now.getMinutes() + (today - 1) * 1440; // 現在時間的分鐘數

//   const result = schedules.some((s) => {
//     return s.start_time <= minutes && minutes < s.end_time;
//   });

//   return result;
// };
// const isOpenTime = check(schedules);

// const isOpenTime = computed(() => {
//   return checkShopOpenTime(schedules);
// });
// const isDisabled = computed(() => {
//   return (
//     !isOpenTime.value ||
//     !props.cartShop.shop.is_orderable ||
//     !props.cartShop.shop.is_open
//   );
// });

let $router = useRouter();

const toShop = (id: number) => {
  $router.push({
    path: `/shop/${id}`,
    query: { t: Date.now() }, // 每次都不一樣，保證觸發路由更新
  });
};

const toCart = (id: number) => {
  $router.push({
    path: `/cart/${id}`,
    query: { t: Date.now() }, // 每次都不一樣，保證觸發路由更新
  });
};

const deleteCart = (v: number) => {
  cartShopStore.deleteCartShop(v);
};
</script>

<style lang="scss" scoped>
.cart-card {
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 10px;

  .cart-card__body {
    display: flex;
    flex-direction: column;

    text-decoration: none;

    color: inherit;
    gap: 10px;
  }

  .cart-card__shop-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    .cart-card__shop-image {
      border: 1px solid #e0e0e0;
      width: 60px;
      height: 46px;
      border-radius: 5px;

      // margin-right: 10px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
  }

  .cart-card__cotent {
    flex-grow: 1;
    gap: 5px;
    display: flex;
    flex-direction: column;
  }

  .cart-card__title {
    font-size: 18px;
    font-weight: bold;
  }
  .cart-card__phone {
    font-size: 16px;
    color: rgb(99, 99, 99);
    font-weight: 700;
  }

  .cart-card__delete {
    cursor: pointer;
    color: #ff4d4f;
    font-size: 24px;
    margin: 6px;

    .el-icon:hover {
      color: #ff312d;
      transform: scale(1.03);
    }
  }
  .cart-card__product-info {
    display: flex;
    align-items: center;
    height: 40px;
    gap: 3px;
    .cart-card__product-image {
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      // width: 46px;
      height: 100%;
      position: relative;
      width: 47px; // 調整大小
      // height: 50px;
      // margin-right: 5px;
      // margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 5px;
        object-fit: cover;
      }

      .cart-card__overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        border-radius: 8px;
        font-size: 14px;
      }
    }
    span {
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 24px;
    }
    .cart-card__product-plus {
      cursor: pointer;
      border: 1px solid #e0e0e0;
      width: 46px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      i {
        font-size: 24px;
        color: #606060;
      }
      // :hover {
      //   color: #ff842d;
      //   transform: scale(1.05);
      //   border: 1px solid #ff842d;
      // }
    }
    .cart-card__product-plus:hover {
      transform: scale(1.05);
      border: 1px solid #ff842d;
      i {
        font-size: 24px;
        color: #ff842d;
      }
    }
  }

  .cart-card__foot {
    margin-top: 10px;
    width: 100%;
    button {
      width: 100%;
    }
  }
}

.cart-card-wrapper {
  position: relative;

  &.disabled {
    pointer-events: none; // ❗ 禁止點擊
    opacity: 0.5; // ❗ 灰階效果（可調整）

    &::after {
      content: "休息中";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.49); // 半透明遮罩
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
