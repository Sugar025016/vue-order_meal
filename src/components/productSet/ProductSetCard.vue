<template>
  <div v-if="!product" class="productCard addCard" :class="{ active: setting }">
    <div class="products-content add">
      <div class="add-icon">
        <el-icon :size="30"><Plus /></el-icon>
      </div>
    </div>
  </div>
  <div
    v-else
    class="productCard"
    @click="
      setting === true
        ? (product.isChoose = !product.isChoose)
        : (product.isChoose = product.isChoose)
    "
    :class="{ active: setting }"
  >
    <!-- <el-icon><Close /></el-icon> -->
    <el-button
      v-if="change"
      type="primary"
      class="delete"
      :icon="Delete"
      circle
      @click.stop="deleteProduct(product.id)"
    />
    <span class="orderable" v-if="!product.orderable">未上架</span>

    <div class="overlay" v-if="!product.orderable"></div>

    <input
      class="form-check-input checkbox"
      type="checkbox"
      id="inlineCheckbox1"
      v-model="product.isChoose"
      v-if="choose"
    />
    <div class="products-content">
      <!-- <div class="content-top"> -->
      <span class="content-title">
        {{ product.name }}
      </span>
      <span class="content-description">
        {{ product.description }}
      </span>
      <span class="content-price">{{ product.price }}$</span>
      <!-- </div> -->
    </div>
    <img :src="product.imgUrl" v-if="product.imgUrl" alt="美食圖" />
  </div>
</template>
<script setup lang="ts">
import { markRaw } from "vue";

import { Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
// import { reqDeleteSellProducts } from '@/api/sellProduct'
import { ElMessageBox } from "element-plus";

defineProps(["product", "setting", "choose", "add", "change"]);

const deleteProduct = async (productId: number) => {
  ElMessageBox.confirm("是否確認要刪除?", "Warning", {
    confirmButtonText: "刪除",
    cancelButtonText: "取消",
    type: "warning",
    icon: markRaw(Delete),
  })
    .then(() => {
      //   reqDeleteSellProducts(productId)
      //   window.location.reload()
      //   ElMessage({
      //     type: 'success',
      //     message: 'Delete completed',
      //   })
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};
</script>

<style lang="scss" scoped>
.productCard.active .overlay {
  display: block; /* 当 active 为 true 时显示遮罩层 */
}
.productCard .overlay {
  display: block; /* 当 active 为 true 时显示遮罩层 */
}
.active:hover {
  box-shadow: 1px 1px 2px 1px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transform: scale(1.01);
}
.active:active {
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.2);
  transform: scale(1);
}
e:acte:active {
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.2);
  transform: scale(1);
}
.productCard {
  word-break: break-all;
  position: relative;
  box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  border: 1px solid #8f8f8f54;
  height: 150px;
  width: 100%;
  justify-content: space-between;

  border-radius: 10px;
  .overlay {
    position: absolute;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    background-color: rgba(212, 212, 212, 0.3); /* 遮罩层的颜色和透明度 */
    border-radius: 10px;
  }

  .delete {
    z-index: 10;
    position: absolute;
    margin: 5px 5px;
    right: 0px;
  }
  .orderable {
    color: rgb(255, 0, 0);
    font-size: 10px;
    z-index: 1;
    position: absolute;
    margin: 5px 25px;
  }
  .checkbox {
    height: 18px;
    width: 18px;
    position: absolute;
    // background-color: $color;
    margin: 0;
  }
  .checkbox:checked::before {
    content: "\2713"; /* 这是 Unicode 编码的勾选符号 */
    font-size: 30px; /* 勾选标志的大小 */
    color: #fff; /* 勾选标志的颜色 */
    position: absolute; /* 使勾选标志居中 */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 18px; /* 勾选标志的宽度 */
    height: 18px; /* 勾选标志的高度 */
    line-height: 14px; /* 行高与高度相同，使文本垂直居中 */
    background-color: $color;
    vertical-align: middle;
    border: 1px solid #f80505;
  }

  .products-content {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 20px;
    width: 100%;
    align-content: space-between;
    gap: 10px;
    span {
      max-width: 100%;
      font-size: 20px;
      color: rgba(0, 0, 0, 0.801);
    }
    // .content-top {
    .content-description {
      color: rgba(141, 141, 141, 0.753);
      font-size: 16px;
      line-height: 1.5;
      display: -webkit-box; /* 必須要有，啟用彈性伸縮盒子 */
      -webkit-line-clamp: 2; /* 限制顯示 3 行 */
      -webkit-box-orient: vertical; /* 垂直排列 */
      overflow: hidden; /* 超出隱藏 */
      text-overflow: ellipsis; /* 補上省略號 */
      min-height: 48px;
    }
    // }
  }

  img {
    border-radius: 0 10px 10px 0;
    height: 150px;
    width: 150px;
  }
}

.productCard:hover {
  transform: scale(1.02);
}

.addCard {
  cursor: pointer;
  .add {
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    // width: 100%;
    .add-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0 10px 10px 0;
      padding: 14px;
      border: 2px solid #a1a1a154;
    }
  }
}

.addCard:hover {
  background-color: #dddddd8a;
  transform: scale(1.01);
  .add {
    transform: scale(1.03);
    .add-icon {
      transform: scale(1.02);
      .el-icon {
        transform: scale(1.03);
      }
    }
  }
}
.addCard:active {
  background-color: #dddddd8a;
  transform: scale(1.02);
  .add {
    transform: scale(1);
    .add-icon {
      transform: scale(1);
      .el-icon {
        transform: scale(1);
      }
    }
  }
}
</style>
