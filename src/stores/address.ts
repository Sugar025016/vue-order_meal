import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getAddressesApi,
  getAddressApi,
  deleteAddressApi,
  addAddressApi,
  updateAddressApi,
  createOrUpdateAddressApi,
  setCurrentAddressApi,
} from "@/api/address";
import { AddressRequest, Address } from "@/types/address";
import { useAuthStore } from "@/stores/auth";
import { useShopStore } from "@/stores/shop";
import { ElMessage } from "element-plus";

export const useAddressStore = defineStore("address", () => {
  const address111 = ref<Address>();
  const currentAddress = ref<Address | null>(null);
  const currentAddressId = ref<number | null>();
  const addresses = ref<Address[]>([]);
  const userStore = useAuthStore();
  const shopStore = useShopStore();

  const loading = ref(false);
  // 取得店家列表
  const fetchAddresses = async () => {
    loading.value = true;
    try {
      const response = await getAddressesApi();
      addresses.value = response.data.addresses;
      currentAddress.value = response.data.currentAddress;
      if (currentAddress.value) {
        const curr = currentAddress.value;
        addresses.value = addresses.value.filter((a) => a.id !== curr.id);
        addresses.value.unshift(currentAddress.value);
      }
      await shopStore.fetchShops();
      console.log("---------shopStore.shops:", shopStore.shops);
      console.log("---------addresses:", addresses.value);
    } catch (error) {
      console.error("---------error:", error);
      addresses.value = [];
      currentAddress.value = null;
    } finally {
      loading.value = false;
    }
  };
  // const fetchAddress = async ($id: number) => {
  //   loading.value = true;
  //   try {
  //     const response = await getAddressApi($id);
  //     console.log("購物車資料:", response);
  //     address111.value = response.data;
  //     console.log("購物車資料:", address111.value);
  //   } catch (error) {
  //     console.error("購物車資料error:", error);
  //     address111.value = undefined;
  //   } finally {
  //     loading.value = false;
  //   }
  // };

  const createOrUpdateAddress = async (
    addressRequest: AddressRequest,
    id: number | null
  ) => {
    try {
      const response = await createOrUpdateAddressApi(addressRequest, id);
      console.warn("address更新成功:");
      await fetchAddresses(); // 更新購物車列表
      return response.status;
    } catch (err: any) {
      console.error("發生錯誤:", err);
      // 可以視情況顯示提示訊息
      ElMessage.error("發生錯誤，請稍後再試！");
      return false;
    }
  };

  const clearAddress = async () => {
    currentAddress.value = null;
    addresses.value = [];
  };

  // const addAddress = async (payload: AddAddressRequest) => {
  //   try {
  //     await addAddressApi(payload);
  //     await fetchAddresses(); // 更新購物車列表
  //     console.warn("加入購物車成功:");
  //   } catch (err: any) {
  //     console.error("加入購物車發生錯誤:", err);
  //     // 可以視情況顯示提示訊息
  //     ElMessage.error("加入購物車失敗，請稍後再試！");
  //   }
  // };

  // const updateAddress = async (
  //   $data: AddAddressRequest,
  //   $addressId: number
  // ) => {
  //   try {
  //     await updateAddressApi($data, $addressId);
  //     await fetchAddresses();
  //     console.warn("加入購物車成功:");
  //   } catch (err: any) {
  //     console.error("加入購物車發生錯誤:", err);
  //     // 可以視情況顯示提示訊息
  //     ElMessage.error("加入購物車失敗，請稍後再試！");
  //   }
  // };
  const deleteAddress = async ($id: number) => {
    try {
      const response = await deleteAddressApi($id);
      if(currentAddress.value?.id==$id){
        currentAddress.value=null;
      }
      await fetchAddresses();
      console.warn("刪除購物車成功:", response);
      return response.status;
    } catch (err: any) {
      console.error("加入購物車發生錯誤:", err);
      ElMessage.error("加入購物車失敗，請稍後再試！");
      return false;
    }
  };

  const setCurrentAddress = async (id: number) => {
    console.log("設定目前地址:", id);
    try {
      const response = await setCurrentAddressApi(id);
      console.log("設定成功，回傳資料:", response.data);
      fetchAddresses();
      return response.status;
    } catch (error) {
      console.error("設定目前地址失敗，錯誤:", error);
      ElMessage.error("設定失敗，請稍後再試");
      return false;
    }
  };
  const hasCheckedAddress = ref(false); // 用來避免重複跳出

  const checkNeedChooseAddress = async () => {
    if (hasCheckedAddress.value) return false;

    const token = ref<string | null>(localStorage.getItem("token"));
    if (token) {
      hasCheckedAddress.value = true;
    }

    return hasCheckedAddress.value;
  };

  return {
    address: address111,
    addresses,
    currentAddress,
    fetchAddresses,
    deleteAddress,
    createOrUpdateAddress,
    setCurrentAddress,
    checkNeedChooseAddress,
    clearAddress,
  };
});
