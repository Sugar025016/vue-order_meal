<template>
  <div class="product-modal">
    <el-dialog
      v-model="addAddressModalOpen"
      width="500px"
      align-center
      title="圖片"
    >
      <img
        :src="product.imgUrl"
        alt="Flowers in Chania"
        class="product-modal__img"
      />
      <div class="product-modal__body">
        <h1>{{ props.product.name }}</h1>
        <span
          v-if="props.product.description != null"
          class="product-modal__body-description"
          >{{ props.product.description }}
        </span>
        <hr class="product-modal__body-divider" />
        <div class="product-modal__body-list">
          <div class="product-modal__body-input">
            <label for="orderUsername">訂購人:</label>
            <input
              id="orderUsername"
              type="text"
              placeholder="输入文本"
              v-model="props.product.orderUsername"
            />
          </div>
          <div class="product-modal__body-input">
            <label for="remark">備註:</label>
            <textarea
              id="remark"
              placeholder="输入文本"
              v-model="props.product.remark"
            ></textarea>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="product-modal__footer">
          <div class="product-modal__footer-count">
            <el-button
              type="primary"
              @click="changeCount(-1)"
              :disabled="props.product!.qty < 2"
              size="large"
              round
            >
              <el-icon><Minus /></el-icon>
            </el-button>

            <span>{{ props.product!.qty }}</span>

            <el-button
              type="primary"
              @click="changeCount(1)"
              :disabled="props.product!.qty > 9"
              size="large"
              round
            >
              <el-icon><Plus /></el-icon>
            </el-button>
            <span class="fs-5">
              總額：${{ props.product!.qty * props.product!.price }}
            </span>
          </div>
          <el-button
            type="primary"
            size="large"
            @click="checkAddCart()"
            data-bs-dismiss="modal"
            round
          >
            加入購物車
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Plus, Minus } from "@element-plus/icons-vue";
const props = defineProps<{ product: any }>();
const addAddressModalOpen = ref(false);

const openProduct = () => {
  addAddressModalOpen.value = true;
};

defineExpose({
  openProduct,
});

const count = ref(1);
count.value = 1;

const changeCount = (num: number) => {
  count.value += num;
  props.product.qty = count.value;
};
</script>

<style lang="scss" scoped>
.product-modal {
  ::v-deep .el-dialog {
    border-radius: 30px;
    height: auto;
    .el-dialog__header {
      height: 300px;
      .el-dialog__headerbtn {
        z-index: 10;
        background: rgba(255, 255, 255, 0.411);
        border-radius: 30px;
        font-size: 32px;
        margin: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        .el-dialog__close {
          color: rgba(0, 0, 0, 0.486);
        }
      }
      .el-dialog__headerbtn:hover {
        background: rgba(255, 255, 255, 0.733);
        .el-dialog__close {
          color: rgba(0, 0, 0, 0.675);
        }
      }
    }

    .product-modal__img {
      border-radius: 30px 30px 0 0; // 圓角大小
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 300px;
    }

    .el-dialog__title {
      font-size: 22px;
      margin: 0 10px;
    }
    .product-modal__body {
      display: flex;
      // align-items: center;
      flex-direction: column;
      gap: 10px;
      .shop-info-modal__body-title {
        margin: 10px 10px 30px 10px;
        span {
          display: flex;
          align-items: center;
          font-size: 20px;
          font-weight: 400;
          font-size: 36px;
          line-height: 1.2;
        }
      }
      h1 {
        font-size: 26px;
      }
      .product-modal__body-description {
        display: block;
        font-size: 18px;
        color: rgba(131, 131, 131, 0.8);
        line-height: 1.5;
        display: -webkit-box; /* 必須要有，啟用彈性伸縮盒子 */
        -webkit-line-clamp: 3; /* 限制顯示 3 行 */
        -webkit-box-orient: vertical; /* 垂直排列 */
        overflow: hidden; /* 超出隱藏 */
        text-overflow: ellipsis; /* 補上省略號 */
      }

      .product-modal__body-divider {
        margin: 1px 0;
        border-color: #505050;
        height: 2px;
      }
      .product-modal__body-list {
        display: flex;
        justify-content: center; /* 水平置中 */
        flex-direction: column;
        gap: 20px;
        margin-top: 8px;
        .product-modal__body-input {
          display: flex;
          justify-content: center; /* 水平置中 */
          flex-direction: column;
          gap: 10px;
          label {
            font-size: 18px;
            font-weight: 500;
            color: rgba(0, 0, 0, 0.683);
            padding-left: 10px;
          }

          input {
            border: 1px solid #ccc;
            border-radius: 20px;
            background-color: #50505000;
            height: 40px;
            padding-left: 20px;
            font-size: 18px;
          }
          textarea {
            border: 1px solid #ccc;
            border-radius: 20px;
            background-color: #50505000;
            padding: 10px 20px;
            font-size: 18px;
            height: 80px;
            resize: none; /* 禁止調整大小 */
            overflow-y: auto; /* 超出內容時顯示滾動條 */
          }
        }
      }
    }
    .product-modal__footer {
      display: flex;
      justify-content: space-between;
      .product-modal__footer-count {
        display: flex;
        justify-content: center; /* 水平置中 */
        gap: 16px;
      }
      span {
        display: flex;
        align-items: center;
        font-size: 18px;
        line-height: 1.5;
      }
      i {
        font-size: 20px;
      }
    }
  }
}
</style>
