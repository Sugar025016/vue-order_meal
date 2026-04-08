<template>
  <div class="checkout">
    <div class="checkout__header">
      <h1>訂單資料確認</h1>
      <h1 v-if="!orderStore.deliveryType" class="checkout__delivery-delivery">
        - 自取單
      </h1>
      <h1 v-else class="checkout__delivery-pickup">- 外送單</h1>
    </div>
    <div class="checkout__body">
      <el-row :gutter="20">
        <div class="el-col">
          <!-- {{
            orderDate && orderTime
              ? "預約時間：" + addOrderRequest.scheduled_time
              : ""
          }}
          {{ addOrderRequest.scheduled_time }}
          {{ orderDate }}
          {{ selectedDateTime }} -->
          <div class="order_check date-time-item">
            <span v-if="orderStore.deliveryType === 1">外送時間：</span>

            <span v-else>自取時間：</span>
            <div class="item date-time">
              <el-radio-group v-model="addOrderRequest.order_type">
                <el-radio :value="1" size="large">立即取餐</el-radio>
                <el-radio :value="2" size="large">預約取餐</el-radio>
              </el-radio-group>
              <TimeSelect
                v-if="addOrderRequest.order_type === 2"
                v-model:date="orderDate"
                v-model:time="orderTime"
                v-model:datetime="selectedDateTime"
              ></TimeSelect>
            </div>
          </div>
          <hr v-if="orderStore.deliveryType" />
          <div class="order_check address" v-if="orderStore.deliveryType">
            <span>外送地址：</span>
            <div v-if="isChangeAddress" class="item address-radio">
              <div class="address-edit">
                <span>
                  {{
                    addressStore.currentAddress?.city +
                    "&nbsp-&nbsp" +
                    addressStore.currentAddress?.area +
                    "&nbsp-&nbsp" +
                    addressStore.currentAddress?.street +
                    "&nbsp-&nbsp" +
                    addressStore.currentAddress?.detail
                  }}
                </span>
                <span
                  v-if="!isDeliveryAvailable"
                  :class="{ checkout__too_far: !isDeliveryAvailable }"
                >
                  （超出外送範圍）</span
                >
              </div>
              <div class="address-edit">
                <el-button
                  type="primary"
                  size="large"
                  class="button-wight"
                  @click="chooseAddressOpen()"
                  round
                  plain
                >
                  編輯
                </el-button>
              </div>
            </div>
          </div>

          <hr />
          <div class="checkout__radio">
            <div class="checkout__pay-method">
              <span>付款方式：</span>
              <el-radio-group v-model="addOrderRequest.pay_method">
                <el-radio :value="1">現金</el-radio>
                <el-radio :value="2">信用卡</el-radio>
                <el-radio :value="3">LINE Pay</el-radio>
              </el-radio-group>
            </div>

            <div class="checkout__need-cutlery">
              <span>需要餐具：</span>
              <el-radio-group v-model="addOrderRequest.is_cutlery">
                <el-radio :value="true" size="large" border>需要</el-radio>
                <el-radio :value="false" size="large" border>不需要</el-radio>
              </el-radio-group>
            </div>
          </div>
          <hr />
          <div class="order_check textarea">
            <span>備註：</span>
            <div class="item">
              <el-form-item prop="desc">
                <el-input
                  v-model="addOrderRequest.customer_note"
                  type="textarea"
                  :minRows="5"
                  :maxRows="6"
                  :rows="5"
                />
              </el-form-item>
            </div>
          </div>
        </div>
        <div class="el-col">
          <div class="body-right">
            <span class="total">總金額:</span>
            <span class="total-data">NT${{ sum }}</span>
            <hr />
            <el-button
              type="warning"
              size="large"
              class="button-orange"
              @click="sendOrder()"
              round
            >
              送出訂單
            </el-button>
            <el-button
              type="warning"
              size="large"
              class="button-wight"
              @click="toShop"
              round
            >
              繼續購物
            </el-button>
            <el-button type="warning" size="large" class="button-wight" round>
              糾團
            </el-button>
          </div>
        </div>
      </el-row>
    </div>
  </div>

  <ChooseAddressModel ref="chooseAddressRef"></ChooseAddressModel>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed, reactive } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import TimeSelect from "./timeSelect.vue";

import { useCartShopStore } from "@/stores/cart";
import { useAddressStore } from "@/stores/address";
import ChooseAddressModel from "@/components/Toolbar/src/toolbarChooseAddress/index.vue";
import { AddOrderRequest } from "@/types/order";
import { useOrderStore } from "@/stores/order";
import { calcDistanceKm } from "@/composables/useShopSchedule";
import { ElMessageBox } from "element-plus";
import { emptyAddOrder } from "@/constants/emptyOrder";

const $route = useRoute();

const addOrderRequest = reactive<AddOrderRequest>({
  ...emptyAddOrder,
});

const orderDate = ref<Date | null>(null);
const orderTime = ref<number | null>(null);
const selectedDateTime = ref<Date | null>(null);

const cartShopStore = useCartShopStore();
const addressStore = useAddressStore();

const chooseAddressRef = ref<typeof ChooseAddressModel>();
const router = useRouter();
const orderStore = useOrderStore();
const sum = computed(() => {
  return (cartShopStore.cartShop.cart_items ?? []).reduce(
    (total, v) => total + v.qty * v.product.price,
    0,
  );
});

// const note = ref("");
// const payMethod = ref<1 | 2 | 3>(1);
// const is_cutlery = ref("1");

const startOptionDay = new Date();
const oneWeekLater = new Date();
oneWeekLater.setDate(startOptionDay.getDate() + 7);
let timer: any;

const chooseAddressOpen = async () => {
  chooseAddressRef.value?.open();
};
// const isDeliveryAvailable = ref<boolean>(false);

//     isDeliveryAvailable.value =
//       calcDistanceKm(
//         addressStore.currentAddress?.lat || 0,
//         addressStore.currentAddress?.lng || 0,
//         cartShopStore.cartShop.shop.lat,
//         cartShopStore.cartShop.shop.lng,
//       ) < cartShopStore.cartShop.shop.delivery_km;

let $router = useRouter();
const toShop = () => {
  if (cartShopStore.cartShop?.shop.id) {
    $router.push("/shop/" + cartShopStore.cartShop.shop.id);
  } else {
    $router.push("/");
  }
};

const isDeliveryAvailable = computed(
  () =>
    calcDistanceKm(
      addressStore.currentAddress?.lat || 0,
      addressStore.currentAddress?.lng || 0,
      cartShopStore.cartShop.shop.lat,
      cartShopStore.cartShop.shop.lng,
    ) < cartShopStore.cartShop.shop.delivery_km,
);

const sendOrder = async () => {
  // addOrderRequest.pay_method = addOrderRequest.pay_method.value;
  // addOrderRequest.is_cutlery = is_cutlery.value === "1";
  // addOrderRequest.customer_note = note.value || null;
  console.log("addOrderRequest", addOrderRequest);
  console.log("orderDate.value", orderDate.value);
  console.log("orderTime.value", orderTime.value);
  console.log("selectedDateTime.value", selectedDateTime.value);
  if (addOrderRequest.order_type === 2 && !selectedDateTime.value) {
    ElMessageBox.confirm(
      `您尚未選擇預約時間，是否要以立即取餐送出訂單？`,
      "確認送出",
    ).then(() => {
      addOrderRequest.scheduled_time = null;
      addOrderRequest.estimated_delivery_time = null;
      sendOrder();
    });
    return;
  } else {
    addOrderRequest.scheduled_time = selectedDateTime.value
      ? selectedDateTime.value.toISOString().slice(0, 19).replace("T", " ")
      : null;
    addOrderRequest.estimated_delivery_time = null;
  }
  if (!isDeliveryAvailable.value) {
    ElMessageBox.confirm(
      `外送距離太遠 無法送達，請重新選擇地址`,
      "超出外送範圍",
    ).then(() => {});
    return;
  }

  const response = await orderStore.createOrder(
    cartShopStore.cartShop.id,
    addOrderRequest,
  );

  if (response?.status) {
    // router.push("/order/" + response.data.id)
    router.push("/orders/" + response.data.orderNumber);
  }
};

//這邊呼叫 sendOrder
// const sendOrder = async () => {
//   try {
//     addOrderRequest.pay_method = addOrderRequest.pay_method.value;
//     addOrderRequest.is_cutlery = is_cutlery.value === "1";
//     addOrderRequest.customer_note = note.value;

//     const response = await addOrderApi(
//       cartShopStore.cartShop.id,
//       addOrderRequest,
//     );

//     if (response.status) {
//       // router.push("/order/" + response.data.id)
//       router.push("/user/order");
//     }
//   } catch (error: any) {
//     // Axios 錯誤（後端有回應）
//     if (error.response) {
//       const status = error.response.status;

//       // 422 驗證錯誤
//       if (status === 422) {
//         console.error("驗證失敗", error.response.data.errors);
//         // TODO: 顯示在表單上 or message
//       }
//       // 401 未登入 / token 過期
//       else if (status === 401) {
//         console.error("尚未登入或登入過期");
//         // TODO: 轉登入頁
//       }
//       // 404 / 403 / 500
//       else {
//         console.error("下單失敗", error.response.data.message);
//       }
//     } else {
//       // 網路錯誤 / 連不到後端
//       console.error("網路異常，請稍後再試");
//     }
//   }
// };

let isChangeAddress = ref<boolean>(true);

async function fetchCartShopData() {
  await cartShopStore.fetchCartShop(parseInt($route.params.id as string));
}

async function fetchAddressData() {
  await addressStore.fetchAddresses();
}

onBeforeUnmount(() => {
  clearTimeout(timer);
});

onMounted(async () => {
  const id = $route.params.id;
  if (typeof id === "string") {
    await fetchCartShopData();
    await fetchAddressData();
  }
});
</script>

<style lang="scss" scoped>
$table-cell-padding-y: 1.5rem;
$table-border-color: rgb(155, 155, 155);

.checkout {
  display: block;
  overflow: hidden;
  padding: 0 5%;

  .checkout__header {
    display: flex;
    gap: 10px;
    // flex-direction: column;
    h1 {
      font-size: 40px;
      margin: 0 0 15px 20px;
      @media (max-width: $breakpoint-md) {
        // max-width: 1200px;
        // max-width: none;
        margin: 0px 10px;
      }
    }

    .checkout__delivery-pickup {
      margin-left: 20px;
      color: #ff6a00;
    }
    .checkout__delivery-delivery {
      margin-left: 20px;
      color: #e35858;
    }
  }
  .checkout__body {
    font-size: 18px;
    .el-row {
      display: grid; /* 使用CSS Grid布局 */
      grid-template-columns: minmax(620px, 9fr) minmax(200px, 3fr);
    }
    .el-col:first-child {
      margin: 0 calc(8vw - 60px) 0 0;
    }

    .item {
      margin: 20px 50px;
      gap: 10px;
    }
    .date-time-item {
      display: grid;
      .date-time {
        .el-radio-group {
          .el-radio {
            ::v-deep .el-radio__label {
              font-size: 18px !important;
            }
          }
        }
      }
    }
    .address {
      .address-radio {
        display: flex;
        flex-direction: column;

        .el-select {
          max-width: 600px;
        }
        .address-edit {
          width: 100%;
          position: relative;
          display: flex;
          flex-direction: center;
          span {
            font-size: 18px;
            color: #000000;
          }

          .checkout__too_far {
            color: rgb(255, 0, 0);
            // background-color: #ff6a00;
          }
        }
      }
      .address-add {
        margin: 0 0 0 10px;
        .address {
          margin: 10px 0;
        }

        .button {
          display: flex;
          align-items: center;
          position: relative;
          height: 40px;
          .button-left {
            position: relative;
            left: 0px;
          }

          .button-right {
            position: absolute;
            right: 0px;
          }
        }
      }
    }
    .textarea {
      .el-form-item {
        width: 500px;
        div {
          caret-color: white;
        }
      }
    }
    .checkout__radio {
      margin: 20px 50px;
      display: grid; /* 使用CSS Grid布局 */
      // grid-template-columns: repeat(2, 1fr);
      justify-content: space-between;
      align-items: center;
      .checkout__pay-method,
      .checkout__need-cutlery {
        display: flex;
        align-items: center;

        margin: 10px;
        span {
          margin-right: 10px;
        }
        ::v-deep .el-radio__label {
          font-size: 18px;
          font-weight: 700;
          color: #000000;
          // .is-checked+.el-radio__label {
          //   color: #df2929;
          // }
        }
        ::v-deep .is-checked + .el-radio__label {
          font-weight: 700;
          color: #ff6a00;
          // .is-checked+.el-radio__label {
          //   color: #df2929;
          // }
        }
        @media (max-width: $breakpoint-md) {
          // max-width: 1200px;
          // max-width: none;
          margin: 10px 0px;
        }
      }
      @media (max-width: $breakpoint-xl) {
        grid-template-columns: repeat(1, 1fr);
        // max-width: 1200px;
        // max-width: none;
        margin: 20px 10px;
      }

      @media (max-width: $breakpoint-md) {
        grid-template-columns: repeat(1, 1fr);
        // max-width: 1200px;
        // max-width: none;
        margin: 20px 0px;
      }
    }

    .body-right {
      margin: 10px;

      display: flex;
      flex-direction: column;
      .total {
        margin: 0 0 5px 10px;
        color: #000000;
      }
      .total-data {
        font-size: 30px;
        margin: 0 0 0 10px;
      }
      button {
        margin: 5px 0;
        background-color: $color;
        border: 0;
      }
      .button-wight {
        background-color: white;
        color: #000;
      }
      .button-orange:hover {
        background-color: rgb(253, 102, 20);
      }
      .button-wight:hover {
        background-color: rgb(255, 187, 132);
        color: #000;
      }
    }

    .order_check {
      margin: 20px;
      // margin: 0 calc(20% - 80px);
      .checkout__order-type {
        margin: 0px 30px;
      }
    }
  }
  // @media (max-width: $breakpoint-xs) {
  //   margin: 10px;
  // }
}
.checkout {
  @media (max-width: $breakpoint-md) {
    margin: 10px;

    padding: 0;
    .rwdBody {
      margin: 0;
      width: 100%;
    }
    .checkout__body {
      .el-row {
        // grid-template-columns: repeat(1, 1fr);
        display: grid; /* 使用CSS Grid布局 */
        // grid-template-columns: minmax(760px, 9fr) minmax(180px, 3fr);
        grid-template-columns: repeat(1, 1fr);
        .el-col {
          width: 100%;
          .order_check {
            // margin: 0 calc(10% - 40px);
            margin: 20px;
            .item {
              margin: 20px 30px;

              @media (max-width: $breakpoint-xs) {
                margin: 20px 20px;
              }
            }

            @media (max-width: $breakpoint-xs) {
              margin: 20px 20px;
            }
          }
          .textarea {
            .el-form-item {
              width: 100%;
            }
            .item {
              .el-textarea {
                // background-color: aquamarine;
                width: 50px;
                width: auto;
                width: 100%;
                // width: 250px;
                .el-textarea__inner {
                  width: 100%;
                  // width: 250px;
                  background-color: aquamarine;

                  // width: 80%;
                }
                // @media (max-width: $breakpoint-xs) {
                //   // .el-textarea__inner {
                //     width: 100%;
                //     width: 250px;
                //     background-color: aquamarine;
                //     // width: 80%;
                //   // }
                // }
              }
            }
          }
        }
        .el-col:first-child {
          margin: 10px;
          .order_check {
            margin: 0 10px 0 0;
            .el-form {
              flex-wrap: wrap;
            }
          }
        }
      }
    }
  }
  @media (max-width: $breakpoint-xs) {
    .el-textarea__inner {
      width: 100%;
      width: 250px;
      background-color: aquamarine;
      // width: 80%;
    }
  }
}
</style>
