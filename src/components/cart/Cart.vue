<template>
  <div
    class="cart"
    v-if="cartShopStore.cartShop && cartShopStore.cartShop.shop"
  >
    <div class="cart__header">
      <h1>
        購物車({{ cartShopStore.cartShop.shop.brand }} -
        {{ cartShopStore.cartShop.shop.branch }})
      </h1>
    </div>

    <div class="cart__body">
      <div class="cart__table">
        <el-table :data="cartShopStore.cartShop.cart_items" height="100%">
          <el-table-column
            min-width="120"
            prop="product.name"
            label="商品名稱"
            align="center"
            sortable
          />
          <el-table-column prop="remark" label="備註" align="center" />
          <el-table-column prop="product.price" label="單價" align="center" />
          <el-table-column prop="qty" label="數量" align="center" width="180" sortable>
            <template #default="scope">
              <el-input-number
                v-model="scope.row.qty"
                :min="1"
                :max="10"
                @change="updateCart(scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="小計" align="center">
            <template #default="scope">
              {{ scope.row.product.price * scope.row.qty }}
            </template>
          </el-table-column>
          <el-table-column label="刪除" align="center" class="cart__delete">
            <template #default="scope">
              <el-icon
                @click="deleteCart(scope.row.id, scope.row.cart_shop_id)"
              >
                <DeleteFilled />
              </el-icon>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="cart__footer">
        <span class="cart__total">總金額：</span>
        <span class="cart__total-data">NT${{ sum }}</span>
        <hr />
        <el-button
          type="warning"
          size="large"
          class="cart__check-order"
          @click="checkLink"
          round
        >
          確認訂單
        </el-button>
        <el-button
          type="warning"
          size="large"
          class="cart__to-shop"
          @click="toShop()"
          round
        >
          繼續購物
        </el-button>
        <!-- <el-button type="warning" size="large" class="button-wight" round>
          糾團
        </el-button> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useCartShopStore } from "@/stores/cart";
import { DeleteFilled, Plus } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";

const $route = useRoute();
const cartShopStore = useCartShopStore();
import { ElMessageBox } from "element-plus";
import { CartItem, UpdataCartRequest } from "@/types/cart";

let $router = useRouter();

// const sum = ref(0);
const sum = computed(() => {
  return (cartShopStore.cartShop?.cart_items ?? []).reduce(
    (total, v) => total + v.qty * v.product.price,
    0
  );
});

const updateCartRequest = ref<UpdataCartRequest>({
  qty: 1,
  remark: "",
});

const toShop = () => {
  if (cartShopStore.cartShop?.shop.id) {
    $router.push("/shop/" + cartShopStore.cartShop.shop.id);
  } else {
    $router.push("/");
  }
};

const updateCart = (cartItems: CartItem) => {
  console.log(cartItems);
  updateCartRequest.value.qty = cartItems.qty;
  updateCartRequest.value.remark = cartItems.remark;
  cartShopStore.updateCart(
    updateCartRequest.value,
    cartItems.id,
    cartItems.cart_shop_id
  );
};

const deleteCart = async (cartItemId: number, cartShopId: number) => {
  console.log(cartItemId);
  await cartShopStore.deleteCartItem(cartItemId, cartShopId);
  console.log("刪除購物車項目完成", cartShopStore.cartShop);
};

let timer: any;
const getElMessageBox = () => {
  clearTimeout(timer);
  ElMessageBox.alert("購物車是空的，返回商店頁", "購物車", {
    confirmButtonText: "確定",
  }).then(() => {
    $router.push("/");
  });

  timer = setTimeout(() => {
    ElMessageBox.close();
    $router.push("/");
  }, 5000);
};

watch(
  () => cartShopStore.cartShop,
  (newVal) => {
    if (!newVal || !newVal.shop) {
      getElMessageBox();
    }
  }
);

const checkCartEmpty = () => {
  console.log("取得商店資料3");
  if (
    !cartShopStore.cartShop ||
    cartShopStore.cartShop.cart_items.length === 0
  ) {
    getElMessageBox();
  }
};

async function fetchCartShopData() {
  await cartShopStore.fetchCartShop(parseInt($route.params.id as string));
}

onMounted(async () => {
  const id = $route.params.id;
  if (typeof id === "string") {
    await fetchCartShopData();
  }
  // console.log("cartShop 變更:2");
  checkCartEmpty();
});
onBeforeUnmount(() => {
  clearTimeout(timer);
});
</script>

<style lang="scss" scoped>
.cart {
  display: block;
  overflow: hidden;
  margin: auto;
  min-height: 100%;

  .cart__header {
    display: flex;
    flex-direction: column;
    h1 {
      font-size: 40px;
      margin: 20px 0;
      font-weight: 500;
    }
    span {
      font-size: 18px;
      margin: 10px 0;
      padding: 10px 0;
    }
  }
  .cart__body {
    display: grid; /* 使用CSS Grid布局 */
    grid-template-columns: minmax(720px, 9fr) minmax(180px, 3fr);
    gap: 10px;
    flex:1;
    min-height: 100%;

    .cart__table {
      max-height: 400px;
      overflow-y: auto;
      margin-bottom: 20px;
      height: 400;

      /* 改內容列背景 */
      :deep(.el-table) {
        color: #151515;
        font-weight: 600;
        font-size: large;
        border-radius: 20px;
        background-color: #ffffff48; /* 改整個表格背景 */

        tr {
          background-color: #ffffff0a !important;
        }

        .el-table__header {
          .cell {
            color: #151515 !important;
          }
        }
        th.el-table__cell.is-leaf {
          background-color: #ffffff00 !important;
          .cell {
            .sort-caret.ascending {
              border-bottom-color:  rgb(255, 39, 39) !important;
            }
            .sort-caret.descending {
              border-top-color:  rgb(255, 39, 39) !important;
            }
          }
        }
      }
      :deep(.el-table__body tr:hover > td) {
        background-color: #fc8f365d !important;
        // background-color: var(--el-color-primary-light-8) !important;
        transition: background-color 0.3s;
      }
      .el-icon {
        height: 42px;
        width: 42px;
        cursor: pointer;
        color: rgb(255, 39, 39);
        // font-siae:20px;
        font-size: 26px;
        // color: var(--el-color-primary-rgb);
      }

      .el-icon:hover {
        cursor: pointer;
        color: rgb(255, 0, 0);
      }
    }

    .cart__footer {
      margin: 10px;
      display: flex;
      flex-direction: column;
      font-weight: 600;
      .cart__total {
        font-size: 22px;
        margin: 0 0 5px 10px;
        color: #1e1e1e;
      }
      .cart__total-data {
        font-size: 38px;
        margin: 0 0 0 10px;
        color: #202020;
      }
      button {
        margin: 5px 0;
        background-color: $color;
        border: 0;
        font-size: 16px;
      }
      .cart__to-shop {
        background-color: white;
        color: #000;
      }
      .cart__check-order:hover {
        background-color: rgb(253, 102, 20);
      }
      .cart__to-shop:hover {
        background-color: rgb(255, 231, 212);
        color: #000;
      }
    }

    @media (max-width: $breakpoint-md) {
      grid-template-columns: repeat(1, 1fr);
      .el-col {
        width: 100%;
        overflow: auto;
      }
      .el-col:first-child {
        margin: 10px;
      }
    }
  }
}
</style>
