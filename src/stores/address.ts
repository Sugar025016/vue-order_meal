import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getAddressesApi,
  getAddressApi,
  deleteAddressApi,
  addAddressApi,
  updateAddressApi,
} from "@/api/address";
import { AddAddressRequest, Address } from "@/types/address";
import { useAuthStore } from "@/stores/auth";
import { ElMessage } from "element-plus";

export const useAddressStore = defineStore("userAddress", () => {
  const address = ref<Address>();
  const addresses = ref<Address[]>([]);
  const userStore = useAuthStore();

  const loading = ref(false);
  // 取得店家列表
  const fetchAddresses = async () => {
    loading.value = true;
    try {
      const response = await getAddressesApi();
      addresses.value = response.data;
      console.log("---------addresses:", addresses.value);
    } catch (error) {
      console.error("---------error:", error);
      addresses.value = [];
    } finally {
      loading.value = false;
    }
  };
  // 取得店家
  const fetchAddress = async ($id: number) => {
    loading.value = true;
    try {
      const response = await getAddressApi($id);
      console.log("購物車資料:", response);
      address.value = response.data;
      console.log("購物車資料:", address.value);
    } catch (error) {
      console.error("購物車資料error:", error);
      address.value = undefined;
    } finally {
      loading.value = false;
    }
  };

  const addAddress = async (payload: AddAddressRequest) => {
    try {
      await addAddressApi(payload);
      await fetchAddresses(); // 更新購物車列表
      console.warn("加入購物車成功:");
    } catch (err: any) {
      console.error("加入購物車發生錯誤:", err);
      // 可以視情況顯示提示訊息
      ElMessage.error("加入購物車失敗，請稍後再試！");
    }
  };
  const deleteAddress = async ($id: number) => {
    try {
      const response = await deleteAddressApi($id);
      await fetchAddresses();
      console.warn("刪除購物車成功:", response);
    } catch (err: any) {
      console.error("加入購物車發生錯誤:", err);
      ElMessage.error("加入購物車失敗，請稍後再試！");
    }
  };
  const updateAddress = async (
    $data: AddAddressRequest,
    $addressId: number
  ) => {
    try {
      await updateAddressApi($data, $addressId);
      await fetchAddresses(); 
      console.warn("加入購物車成功:");
    } catch (err: any) {
      console.error("加入購物車發生錯誤:", err);
      // 可以視情況顯示提示訊息
      ElMessage.error("加入購物車失敗，請稍後再試！");
    }
  };

  return {
    address,
    addresses,
    userStore,
    fetchAddress,
    fetchAddresses,
    deleteAddress,
    addAddress,
    updateAddress,
  };
});
