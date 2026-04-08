<template>
  <div class="product-tabs">
    <div class="product-tabs__header">
      <div
        v-for="(tab, index) in shopStore.shop?.tabs || []"
        :key="index"
        class="product-tabs__tab-label"
      >
        <span @click="scrollToSection(tab.id)">
          {{ tab.name }}
        </span>
      </div>
    </div>
    <div class="product-tabs__body">
      <div
        :id="tab.id.toString()"
        v-for="(tab, index) in shopStore.shop?.tabs || []"
        :key="index"
        v-show="true"
        class="product-tabs__tab"
        :ref="`${tab.id}`"
      >
        <span class="product-tabs__tab-title">{{ tab.name }}</span>
        <div class="products-body">
          <component v-for="product in tab.products" :key="product.id">
            <!-- tooltip 不會出現 -->
            <el-tooltip
              v-if="!shopStore.shop?.is_orderable"
              effect="light"
              :content="'電話訂購：' + shopStore.shop?.phone"
              placement="bottom"
              teleported="false"
              :open-delay="150"
              :close-delay="100"
            >
              <div>
                <ProductCard :product="product" />
              </div>
            </el-tooltip>

            <ProductCard
              v-else
              :product="product"
              @click="openModal(product)"
            />
          </component>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="divider"></div>
    <div class="product-tabs__tab"></div>
  </div>

  <ProductModal ref="productModalRefs"></ProductModal>
</template>

<script setup lang="ts">
import ProductModal from "./ProductModal.vue";
import { ref } from "vue";

import ProductCard from "./ProductCard.vue";
import { useShopStore } from "@/stores/shop";
import { Shop } from "@/types/shop.ts";
import { Product } from "@/types/product";

const shopStore = useShopStore();

const productModalRefs = ref<InstanceType<typeof ProductModal> | null>(null);
// function openPModal() {
//   productModalRefs.value?.openProduct();
// }

// let money = ref();
// let productModalVisible: boolean = false;

let TabProductsData = ref<any[]>([]);
const shop = ref<Shop>();

shop.value = shopStore.shop;

TabProductsData.value = shopStore.shop?.tabs || [];
console.log("TabProductsData", TabProductsData.value);

let shopData = ref<any>({
  id: 0,
  name: "",
  description: "",
  address: {
    city: "",
    area: "",
    street: "",
    detail: "",
    lat: undefined,
    lng: undefined,
  },
  imgId: 0,
  imgUrl: "",
  tabProducts: [],
  products: [],
  orderable: false,
  schedules: [],
  addMeals: [],
  category: [],
});

const openModal = (v: Product) => {
  productModalRefs.value?.openProduct(v);
  // productModalRefs.value?.addAddressModalOpen.value = true;
};

const scrollToSection = (sectionId: number) => {
  const element = document.getElementById(sectionId + "");

  if (element) {
    const headerHeight = 100;
    const targetPosition =
      element.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
    // shopStore.scrollTop = targetPosition;
  }
};

const myModal = document.getElementById("myModal");
const myInput = document.getElementById("myInput");

myModal?.addEventListener("shown.bs.modal", () => {
  myInput?.focus();
});
</script>

<style lang="scss" scoped>
.product-tabs {
  flex: 1;
  .product-tabs__header {
    display: flex;
    margin: 20px 0 0 0;
    color: #636262;
    border-bottom: 1px solid #63626236;
    overflow-x: auto;
    .product-tabs__tab-label {
      position: relative;
      padding: 0 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        padding: 16px 0;
        z-index: 1;
        font-size: 20px;
        height: 50px;
        width: 100%;
        background-color: transparent;
        transition: background-color 0.2s;
        border-bottom: 3px solid rgba(255, 0, 0, 0);
      }
    }
    .product-tabs__tab-label:hover {
      color: $color;
      span {
        border-bottom: 3px solid $color;
      }
    }
  }
  .product-tabs__body {
    .product-tabs__tab {
      margin: 10px;
      @include respond(md) {
        max-width: 700px;
        margin: 0 auto;
      }
      .product-tabs__tab-title {
        margin: 10px;
        font-size: 26px;
        color: #000000b6;
        line-height: 1.5;
      }
      .products-body {
        display: grid; /* 使用CSS Grid布局 */
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 10px;

        @include respond(xl) {
          grid-template-columns: repeat(2, 1fr);
        }
        @include respond(md) {
          grid-template-columns: repeat(1, 1fr);
        }
      }
    }
  }
}
</style>
