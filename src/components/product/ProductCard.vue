<template>
  <div class="product-card">
    <div class="product-card__list">
      <span class="product-card__title">{{ product.name }}</span>
      <span class="product-card__content">
        {{ product.description }}
      </span>
      <span class="product-card__price">{{ product.price }}$</span>
    </div>
    <img :src="product.imgUrl" v-if="product.imgUrl" alt="AA" />
  </div>
</template>
<script setup lang="ts">
defineProps(["product"]);
</script>
<style lang="scss" scoped>
.product-card {
  word-break: break-all;
  position: relative;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /*初始陰影 */
  display: flex;
  border: 1px solid #8f8f8f54;
  height: 150px;
  width: 100%;
  justify-content: space-between;
  border-radius: 10px;
  cursor: pointer;
  .product-card__list {
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

    .product-card__content {
      color: rgba(131, 131, 131, 0.8);
      font-size: 16px;
      line-height: 1.5;
      display: -webkit-box; /* 必須要有，啟用彈性伸縮盒子 */
      -webkit-line-clamp: 2; /* 限制顯示 3 行 */
      -webkit-box-orient: vertical; /* 垂直排列 */
      overflow: hidden; /* 超出隱藏 */
      text-overflow: ellipsis; /* 補上省略號 */
      min-height: 48px;
    }
  }
  img {
    border-radius: 0 10px 10px 0;
    height: 150px;
    width: 250px;
  }
}
.product-card:hover {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* 陰影加深 */
  transform: scale(1.01);
}
.product-card:active {
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  transform: scale(1);
}
</style>
