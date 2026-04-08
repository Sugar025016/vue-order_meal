<template>
  <div class="shop-card">
    <el-card @click="toShop(shop.id)" :body-style="{ padding: '0px' }">
      <div class="shop-card_image">
        <img
          v-if="shop.image_path"
          :src="shop.image_path"
          alt="Your Image"
          onerror="this.classList.add('no-image-label');"
        />
      </div>
      <div class="shop-card_orderable" v-if="shop.is_open && shop.is_orderable">
        <!-- <span class="overlay-text">可線上</span>
      <span class="overlay-text">訂購</span> -->
        <img src="@/assets/images/plateOrder.png" alt="" />
      </div>

      <div class="shop-card__bottom">
        <div class="shop-card__header">
          <span class="shop-card__title"
            >{{ shop.brand }} - {{ shop.branch }}</span
          >
          <ShopFavorite :shopId="props.shop.id" />
        </div>
        <span class="shop-card__description">{{ shop.description }}</span>
        <span class="shop-card__address">{{
          shop.city + shop.area + shop.street + shop.detail
        }}</span>
      </div>
    </el-card>

    <div class="shop-card__wrapper" v-if="!shop.is_open">休息中</div>

    <!-- <div v-if="isDisabled" class="shop-card__wrapper">關閉中</div> -->
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import { Shop } from "@/types/shop";
import ShopFavorite from "./ShopFavorite.vue";

const props = defineProps<{
  shop: Shop;
}>();

let $router = useRouter();

// var imageContainer = document.querySelector(".image-container");
// var image = imageContainer?.querySelector("image_path");

// image?.addEventListener("load", function () {
//   imageContainer?.classList.add("loaded");
// });

// const { isOpenTime } = useShopSchedule(props.shop.schedules);
// const isDisabled = computed(() => {
//   return !isOpenTime.value || !props.shop.is_open;
// });

const toShop = (id: number) => {
  $router.push(`/shop/${id}`);
};
</script>
<style lang="scss" scoped>
.el-card {
  border-radius: 20px;
  overflow: visible;
  height: 100%;
}
.el-card:hover {
  transform: scale(1.02); /* 鼠标悬停时放大 20% */
}
.shop-card {
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  overflow: visible;
  display: inline-block;
  position: relative;
  .shop-card_image {
    position: relative;
    max-width: 100%;
    /* overflow: hidden; */
    border-radius: 10px;
  }

  .shop-card_image::before {
    content: "";
    display: block;
    padding-top: 50%; /* 1:1 的比例 */
    background-image: url("@/assets/images/shop2.jpg"); /* 設置背景圖片 */
    background-size: cover;
    background-position: center;
    background-size: 80% auto; /* 設置背景圖片的尺寸 */
    background-repeat: no-repeat; /* 設置背景圖片不重複 */
  }

  .shop-card_image img {
    border-radius: 20px 20px 0 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 1; /* 初始設置圖片透明度為 0 */
    transition: opacity 0.3s ease; /* 添加漸變動畫效果 */
  }

  .shop-card_image.loaded img {
    opacity: 100; /* 設置圖片透明度為 1 */
  }
  .no-image-label {
    display: none; /* 設置缺圖片時隱藏（缺圖圖標） */
  }

  .shop-card_orderable {
    position: absolute;
    top: -14px;
    right: 14px;
    width: 100%;
    display: flex;
    // justify-content: center;
    align-items: center;
    // z-index: 1000;
    img {
      width: 90px; /* 设置图片的宽度 */
      height: auto; /* 高度自动根据宽度和图片比例进行调整 */
    }
  }

  .shop-card__bottom {
    padding: 14px;
    margin-top: 1px;
    line-height: 26px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    justify-content: space-around;
    height: 100%;
    .shop-card__header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .shop-head__el-link {
        .shop-head__icon-heart--active {
          color: rgb(255, 136, 0);
        }
        .shop-head__icon-heart {
          color: rgba(172, 172, 172, 0.801);
        }
      }
    }
    .shop-card__title {
      font-size: 24px;
      color: #696969;
    }
    .shop-card__description {
      line-height: 16px;
      font-size: 14px;
      color: #929292;
    }

    .shop-card__address {
      line-height: 16px;
      font-size: 14px;
      color: #696969;
    }
  }
}

.shop-card__wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.336); /* 半透明灰 */
  color: white;
  font-size: 24px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  pointer-events: all; /* 阻擋卡片點擊 */
  z-index: 101;
  cursor: not-allowed;
}
</style>

<script setup lang="ts"></script>
