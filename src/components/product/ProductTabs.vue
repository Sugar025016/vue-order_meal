<template>
  <div class="product-tabs">
    <div class="product-tabs__header">
      <div
        v-for="(tab, index) in TabProductsData"
        :key="index"
        class="product-tabs__tab-label"
      >
        <span
          class="product-tabs__tab-label underline"
          @click="scrollToSection(tab.id)"
        >
          {{ tab.name }}
        </span>
      </div>
    </div>
    <div class="product-tabs__body">
      <div
        :id="tab.id.toString()"
        v-for="(tab, index) in TabProductsData"
        :key="index"
        v-show="true"
        class="product-tabs__tab"
        :ref="`${tab.id}`"
      >
        <span class="product-tabs__tab-title">{{ tab.name }}</span>
        <div class="products-body">
          <component v-for="product in tab.products" :key="product.id">
            <ProductCard
              v-if="shopData.orderable"
              :product="product"
              @click="openModal(product)"
            ></ProductCard>

            <el-tooltip
              effect="light"
              :content="'電話訂購：' + shopData.phone"
              class="box-item"
              v-else
            >
              <def-product-card :product="product"></def-product-card>
            </el-tooltip>
          </component>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="divider"></div>
    <div class="product-tabs__tab"></div>
  </div>

  <ProductModal ref="productModalRefs" :product="productData"></ProductModal>
</template>

<script setup lang="ts">
import ProductModal from "./ProductModal.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

import ProductCard from "./ProductCard.vue";

const productModalRefs = ref<InstanceType<typeof ProductModal> | null>(null);
function openPModal() {
  productModalRefs.value?.openProduct();
}

let money = ref();
let productModalVisible: boolean = false;

let $route = useRoute();

let id: number = Number($route.params.id);

let TabProductsData = ref<any[]>([]);

let productData = ref<any>({
  productId: 0,
  name: "",
  description: "",
  qty: 1,
  imgUrl: "",
  price: 0,
  department: "",
  orderUsername: "",
  remark: "",
  shopId: 0,
});

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

const openModal = (v: any) => {
  productData.value.productId = v.id;
  productData.value.name = v.name;
  productData.value.description = v.description;
  productData.value.qty = 1;
  productData.value.imgUrl = v.imgUrl;
  productData.value.price = v.price;
  productData.value.department = "";
  productData.value.orderUsername = "測試帳號";
  productData.value.remark = "";
  productData.value.shopId = v.shopId;
  productModalRefs.value?.openProduct();
  // productModalRefs.value?.addAddressModalOpen.value = true;
};

const getProductsData = async (id: number) => {
  //   let res: TabProductsResponseData = await reqGetTabProducts(id)
  //   TabProductsData.value = res.data
};

const getShopData = async (id: number) => {
  //   let res: ShopResponseData = await getShop(id)
  //   shopData.value = res.data
};

const scrollToSection = (sectionId: number) => {
  const element = document.getElementById(sectionId + "");

  if (element) {
    const headerHeight = 100;
    const targetPosition =
      element.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
    shopStore.scrollTop = targetPosition;
  }
};

onMounted(() => {
  getProductsData(id);
  getShopData(id);
});

const activeTab = ref(0);

const myModal = document.getElementById("myModal");
const myInput = document.getElementById("myInput");

myModal?.addEventListener("shown.bs.modal", () => {
  myInput?.focus();
});

onMounted(() => {
  // 模擬 TabProductsData
  TabProductsData.value = [
    {
      id: 1,
      name: "主餐",
      products: [
        {
          id: 101,
          name: "牛肉麵",
          price: 120,
          imgUrl: "https://picsum.photos/200/150?random=1",
          shopId: id,
          orderable: true,
          description:
            "不會這種早感的您，靠北頭髮沒是，的最朋友小動物意見，就沒。",
        },
        {
          id: 102,
          name: "雞腿飯",
          price: 100,
          imgUrl: "https://picsum.photos/200/150?random=2",
          shopId: id,
          orderable: true,
          description:
            "麼好放假好想去，到時知道點也？和只是太弟弟的時候一個很好看書館了是不記，沒關係全沒有，因為只是太弟弟的時候一個很好看書館了是不記，沒關係全只是太弟弟的時候一個很好看書館了是不記，沒關係全只是太弟弟的時候一個很好看書館了是不記沒關係全只是太弟弟的時候一個很好看書館了是不記沒關係全只是太弟弟的時候一個很好看書館了是不記沒關係全只是太弟弟的時候一個很好看書館了是不記，沒關係全望我超，求對方叫我什麼有什麼，",
        },
        {
          id: 102,
          name: "雞腿飯",
          price: 100,
          imgUrl: "https://picsum.photos/200/150?random=7",
          shopId: id,
          orderable: true,
          description:
            "麼好放假好想去，到時知道點也？和只是太弟弟的時候一個很好看書館了是不記，沒關係全沒有，因為望我超，求對方叫我什麼有什麼，",
        },
        {
          id: 102,
          name: "雞腿飯",
          price: 100,
          imgUrl: "https://picsum.photos/200/150?random=8",
          shopId: id,
          orderable: true,
        },
        {
          id: 102,
          name: "雞腿飯",
          price: 100,
          imgUrl: "https://picsum.photos/200/150?random=9",
          shopId: id,
          orderable: true,
          description:
            "麼好放假好想去，到時知道點也？和只是太弟弟的時候一個很好看書館了是不記，沒關係全沒有，因為望我超，求對方叫我什麼有什麼，",
        },
        {
          id: 102,
          name: "雞腿飯",
          price: 100,
          imgUrl: "https://picsum.photos/200/150?random=10",
          shopId: id,
          orderable: false,
          description:
            "麼好放假好想去，到時知道點也？和只是太弟弟的時候一個很好看書館了是不記，沒關係全沒有，因為望我超，求對方叫我什麼有什麼，",
        },
        {
          id: 102,
          name: "雞腿飯",
          price: 100,
          imgUrl: "https://picsum.photos/200/150?random=11",
          shopId: id,
          orderable: true,
          description:
            "麼好放假好想去，到時知道點也？和只是太弟弟的時候一個很好看書館了是不記，沒關係全沒有，因為望我超，求對方叫我什麼有什麼，",
        },
        {
          id: 102,
          name: "雞腿飯",
          price: 100,
          imgUrl: "https://picsum.photos/200/150?random=12",
          shopId: id,
          orderable: true,
        },
        {
          id: 102,
          name: "雞腿飯",
          price: 100,
          imgUrl: "https://picsum.photos/200/150?random=2",
          shopId: id,
          orderable: true,
        },
      ],
    },
    {
      id: 2,
      name: "飲料1111",
      products: [
        {
          id: 201,
          name: "珍珠奶茶",
          price: 60,
          imgUrl: "https://picsum.photos/200/150?random=3",
          shopId: id,
          orderable: true,
        },
        {
          id: 201,
          name: "珍珠奶茶",
          price: 60,
          imgUrl: "https://picsum.photos/200/150?random=3",
          shopId: id,
          orderable: true,
        },
        {
          id: 201,
          name: "珍珠奶茶",
          price: 60,
          imgUrl: "https://picsum.photos/200/150?random=3",
          shopId: id,
          orderable: true,
        },
        {
          id: 201,
          name: "珍珠奶茶",
          price: 60,
          imgUrl: "https://picsum.photos/200/150?random=3",
          shopId: id,
          orderable: true,
        },
        {
          id: 201,
          name: "珍珠奶茶",
          price: 60,
          imgUrl: "https://picsum.photos/200/150?random=3",
          shopId: id,
          orderable: true,
        },
        {
          id: 202,
          name: "冬瓜檸檬",
          price: 55,
          imgUrl: "https://picsum.photos/200/150?random=4",
          shopId: id,
        },
        {
          id: 202,
          name: "冬瓜檸檬",
          price: 55,
          imgUrl: "https://picsum.photos/200/150?random=4",
          shopId: id,
        },
        {
          id: 202,
          name: "冬瓜檸檬",
          price: 55,
          imgUrl: "https://picsum.photos/200/150?random=4",
          shopId: id,
        },
        {
          id: 202,
          name: "冬瓜檸檬",
          price: 55,
          imgUrl: "https://picsum.photos/200/150?random=4",
          shopId: id,
        },
      ],
    },
    {
      id: 3,
      name: "甜點",
      products: [
        {
          id: 301,
          name: "布丁",
          price: 40,
          imgUrl: "https://picsum.photos/200/150?random=5",
          shopId: id,
        },
        {
          id: 302,
          name: "蛋糕",
          price: 75,
          imgUrl: "https://picsum.photos/200/150?random=6",
          shopId: id,
        },
      ],
    },
  ];

  // 模擬 shopData
  shopData.value = {
    id,
    name: "範例商店",
    description: "這是一家測試中的餐飲店",
    address: {
      city: "台北市",
      area: "信義區",
      street: "松壽路",
      detail: "100號",
      lat: 25.033,
      lng: 121.565,
    },
    imgId: 1,
    imgUrl: "https://picsum.photos/400/200?random=10",
    tabProducts: [],
    products: [],
    orderable: true,
    schedules: [],
    addMeals: [],
    category: [],
    phone: "02-1234-5678",
  };
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
