// stores/shop.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Shop } from '@/types/shop';
import { getShopsApi ,getShopApi } from '@/api/shop';
import { ShopSearchRequest } from '@/types/shop';

export const useShopStore = defineStore('shop', () => {
  // 資料列表
  const shops = ref<Shop[]>([]);
  const shop = ref<Shop>();
  // 搜尋條件
  const searchParams = ref<ShopSearchRequest>({});
  // loading 狀態
  const loading = ref(false);

  // 取得店家列表
  const fetchShops = async (params?: ShopSearchRequest) => {
    console.log("fetchShops params:", params);
    loading.value = true;
    try {
      const response = await getShopsApi(params || searchParams.value);
      shops.value = response.data;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };
    // 取得店家
  const fetchShop = async ($id: number) => {
    loading.value = true;
    try {
      const response = await getShopApi($id);
      console.log("店家資料:", response);
      shop.value = response;
      console.log("店家資料:", shop.value);
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  // 更新搜尋條件並重新抓取
  const setSearchParams = (params: ShopSearchRequest) => {
    searchParams.value = params;
    fetchShops();
  };

  return {
    shops,
    shop,
    searchParams,
    loading,
    fetchShops,
    fetchShop,
    setSearchParams
  };
});
