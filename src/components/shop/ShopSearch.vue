<template>
  <div
    class="home-search"
    :class="{ haveAddress: addressStore.currentAddress }"
  >
    <!-- <div class="home-search" > -->
    <!-- <div class="home-search__item" v-if="false"> -->
    <div class="home-search__item" v-if="!addressStore.currentAddress">
      <div class="home-search__custom-select-wrapper">
        <select
          class="home-search__custom-select"
          v-model="selectedOptionCity"
          @change="changeCity"
        >
          <option selected value="-1">縣市</option>
          <option
            v-for="(item, index) in address"
            :key="index"
            :label="item.cityName"
            :value="index"
          >
            {{ item }}
          </option>
        </select>
      </div>
    </div>

    <div class="home-search__item" v-if="!addressStore.currentAddress">
      <div class="home-search__custom-select-wrapper">
        <select
          class="home-search__custom-select"
          v-model="selectedOptionArea"
          @change="changeArea"
        >
          <option selected value="">區域鄉鎮</option>
          <option
            v-if="selectedOptionCity > -1"
            v-for="area in address[selectedOptionCity].areas"
            :key="area.areaName"
            :value="area.areaName"
            :label="area.areaName"
          >
            {{ area }}
          </option>
        </select>
      </div>
    </div>

    <div class="home-search__item item-category">
      <div class="home-search__custom-select-wrapper">
        <select
          class="home-search__custom-select"
          v-model="selectedOptionCategory"
          @change="changeCategory"
        >
          <option value="0">全部</option>
          <option v-for="c1 in categoryList" :key="c1.id" :value="c1.id">
            {{ c1.name }}
          </option>
        </select>
      </div>
    </div>
    <div class="home-search__item search-container">
      <div class="home-search__input-search">
        <input
          v-model="searchText"
          @input="handleInput"
          @focus="showHistory = true"
        />
        <el-button @click="search" type="primary">搜尋</el-button>
      </div>
      <div
        class="home-search__history"
        v-if="showHistory"
        @mouseleave="showHistory = false"
      >
        <div class="home-search__history-title">Search History:</div>
        <ul>
          <li
            v-for="history in searchHistory"
            :key="history"
            @click="fillInput(history)"
          >
            {{ history }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import address from "@/utils/address.js";
import { getCategory } from "@/api/category";
import type { Categories } from "@/types/category";
import type { ShopSearchRequest } from "@/types/shop";

import { useShopStore } from "@/stores/shop";
import { useAddressStore } from "@/stores/address";

const shopStore = useShopStore();
const addressStore = useAddressStore();

const categoryList = ref<Categories>([]);

const fetchCategory = async () => {
  try {
    const res = await getCategory();
    if (res.status && res.data) {
      console.log("取得分類成功:", res.data);
      console.log("取得分類成功:", categoryList);
      categoryList.value = res.data; // 將取得的分類資料存入響應式
      console.log("取得分類成功:", categoryList.value);
    }
  } catch (err) {
    console.error("取得分類失敗:", err);
  }
};

// 假搜尋歷史
const searchHistory = ["咖啡", "餐廳", "電影", "遊戲"];

// 選擇器狀態

const selectedOptionCity = computed<number>({
  get() {
    const city = shopStore.searchParams.city;
    if (!city) return -1;

    const index = address.findIndex((item) => item.cityName === city);

    return index > -1 ? index : -1;
  },
  set(value) {
    const index = Number(value);
    if (index === -1) {
      shopStore.searchParams.city = null;
      shopStore.searchParams.area = null; // 常見需求：換縣市清區域
    } else {
      shopStore.searchParams.city = address[index].cityName;
      shopStore.searchParams.area = null;
    }
  },
});

// const selectedOptionArea = ref("");
const selectedOptionArea = computed<string>({
  get() {
    return shopStore.searchParams.area ?? "";
  },
  set(value) {
    shopStore.searchParams.area = value || null;
  },
});

// const selectedOptionCategory = ref(0);
const selectedOptionCategory = computed<number>({
  get() {
    return shopStore.searchParams.category || 0;
  },
  set(value) {
    shopStore.searchParams.category = value !== 0 ? value : null;
  },
});

// const searchText = ref("");

const searchText = computed<string>({
  get() {
    return shopStore.searchParams.keyword || "";
  },
  set(value) {
    shopStore.searchParams.keyword = value || null;
  },
});

const showHistory = ref(false);

// 方法
function changeCity() {
  selectedOptionArea.value = "";
}

function changeArea() {
  // 可加入額外邏輯
}

function changeCategory() {
  // 可加入額外邏輯
}

function handleInput() {
  // 可加入輸入邏輯
}

function search() {
  console.log("searchText:", selectedOptionCity.value);
  shopStore.setSearchParams({
    city:
      selectedOptionCity.value > -1
        ? address[selectedOptionCity.value].cityName
        : null,
    area: selectedOptionArea.value || null,
    category:
      selectedOptionCategory.value !== 0 ? selectedOptionCategory.value : null,
    keyword: searchText.value || null,
  });
}

function fillInput(history: string) {
  searchText.value = history;
  showHistory.value = false;
}

// 初始掛載
onMounted(() => {
  fetchCategory();
});
</script>

<style lang="scss" scoped>
.home-search {
  display: grid;
  grid-template-columns: 3fr 4fr 5fr 12fr;
  grid-column-gap: 10px;
  grid-row-gap: 16px;
  color: #777777;

  .home-search__item {
    border-radius: 50px;
    background-color: rgb(255, 255, 255);

    .home-search__custom-select-wrapper {
      .home-search__custom-select {
        width: 100%;
        height: 40px;
        border: 1px solid $border;
        border-radius: 50px;
        padding: 8px 16px;
        font-size: 16px;
        font-weight: 500;
        color: $font;
        cursor: pointer; /* 預設游標樣式 */
        background-color: rgb(255, 255, 255);
        background: url("@/assets/icons/expand.png") no-repeat;
        background-size: 20px;
        background-position: right 10px center;
        .option:hover {
          background-color: $color;
          color: $color-light-9;
        }
      }

      .home-search__custom-select:hover {
        border: 1px solid $color;
      }

      /* 禁用時游標變換成禁止圖示 */
      .home-search__custom-select:disabled {
        cursor: not-allowed;
      }
    }
  }

  .home-search__item {
    margin-right: 0px;
    height: 40px;

    .home-search__input-search {
      display: flex;
      border: 1px solid #ccc;
      border-radius: 50px;
      background-color: rgb(255, 255, 255);
      height: 100%;

      input {
        padding: 5px 20px;
        width: 80%;
        border: 0px solid #ccc;
        outline: none;
        background: #cccccc00;
        height: 100%;
      }

      button {
        height: 100%;
        left: 0;
        padding: auto 15px;
        color: #fff;
        cursor: pointer;
        border-radius: 50px;
        width: 20%;
        font-size: 20px;
      }
    }

    .home-search__input-search:hover {
      border: 1px solid $color;
    }

    .home-search__history {
      width: auto;
      min-width: 300px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      position: absolute;
      z-index: 10000;

      .home-search__history-title {
        font-weight: bold;
        padding: 8px 10px;
        background-color: #f4f4f4;
      }
      li {
        padding: 6px 10px;
        &:hover {
          background-color: #f4f4f4;
        }
      }
    }
  }

  @media (max-width: $breakpoint-md) {
    grid-template-columns: minmax(120px, 2fr) minmax(150px, 3fr) minmax(
        200px,
        4fr
      );
    .search-container {
      grid-column: span 3;
    }
  }

  @media (max-width: $breakpoint-xs) {
    grid-template-columns: minmax(120px, 2fr) minmax(150px, 3fr);
    .search-container {
      grid-column: span 2;
    }
    .item-category {
      grid-column: span 2;
    }
  }
}
.haveAddress {
  display: grid;
  grid-template-columns: 3fr 12fr;
  grid-column-gap: 10px;

  .search-container {
    max-width: 700px;
  }
  .item-category {
    min-width: 200px;
  }
}
</style>
