<template>
  <div class="dialog">
    <el-dialog
      v-model="addAddressModalOpen"
      :title="title"
      :before-close="handleClose"
      class="test1"
      width="40%"
      :modal-append-to-body="false"
      :lock-scroll="false"
      :destroy-on-close="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <el-form
            ref="formRef"
            :model="addressData"
            :rules="addressRules"
            label-width="120px"
            class="demo-ruleForm"
            :size="formSize"
            status-icon
            label-position="top"
          >
            <el-form-item prop="city" label="縣市">
              <el-select
                v-model="addressData.city"
                class="m-2"
                placeholder="請選擇城市"
                size="large"
                @change="changeCity()"
              >
                <el-option
                  v-for="(item, index) in addressOptions"
                  :key="index"
                  :label="item.cityName"
                  :value="item.cityName"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="area" label="區域">
              <el-select
                v-model="addressData.area"
                class="m-2"
                placeholder="請選擇區域"
                size="large"
                no-data-text="請先選擇城市"
                @change="changeArea()"
              >
                <el-option
                  v-for="(area, index) in addressOptions.find(
                    (address:any) => address.cityName === addressData.city
                  )?.areas"
                  :key="index"
                  :value="area.areaName"
                  :label="area.areaName"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="street" label="路(街)名或鄉里名稱">
              <el-select
                class="m-4"
                v-model="addressData.street"
                placeholder="請選擇路(街)名或鄉里名稱"
                size="large"
                no-data-text="請先選擇鄉鎮[市]區"
              >
                <el-option
                  v-for="(street, index) in addressOptions
                    .find((address:any) => address.cityName === addressData.city)
                    ?.areas.find((areas:any) => areas.areaName === addressData.area)
                    ?.streets"
                  :key="index"
                  :value="street.streetName"
                  :label="street.streetName"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="detail" label="外送地址詳細資訊">
              <el-input
                v-model="addressData.detail"
                size="large"
                placeholder="请您输入外送地址"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            class="btn btn-primary"
            @click="handleClose()"
            type="primary"
            round
            plain
          >
            取消
          </el-button>

          <el-button
            class="btn btn-primary"
            @click="saveAddress()"
            type="primary"
            round
            plain
          >
            確定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { AddressRequest } from "@/types/address";
import addressOptions from "@/utils/address.js";
import { useAddressStore } from "@/stores/address";

const addAddressModalOpen = ref<boolean>(false);
const handleClose = () => {
  addAddressModalOpen.value = false;
};

const addressStore = useAddressStore();
const formSize = ref("default");
const addressId = ref<number | null>(null);
const changeCity = () => {
  addressData.area = "";
  addressData.street = "";
};

const changeArea = () => {
  addressData.street = "";
};

const validatorShopAddressDetail = (rule: any, value: any, callBack: any) => {
  if (value.trim().length <= 255) {
    callBack();
  } else {
    callBack(new Error("地址不可超過255個字"));
  }
};
const validateNotEmptyString = (rule: any, value: any, callback: any) => {
  if (value.trim() === "") {
    callback(new Error("請輸入地址"));
  } else {
    callback();
  }
};
const addressRules = {
  city: [{ required: true, message: "請選擇城市", trigger: "blur" }],
  area: [{ required: true, message: "請選擇區域", trigger: "blur" }],
  street: [{ required: true, message: "請選擇街道", trigger: "blur" }],
  detail: [
    {
      required: true,
      message: "Detail cannot be empty",
      trigger: "blur",
      validator: validatorShopAddressDetail,
    },
    {
      validator: validateNotEmptyString,
      trigger: "blur",
      message: "請輸入外送地址",
    },
  ],
};

let formRef = ref<any>();

let addressData = reactive<AddressRequest>({
  city: "",
  area: "",
  street: "",
  detail: "",
});
const emits = defineEmits(["childClosed"]);
const saveAddress = async () => {
  if (!originalAddress.value || isAddressChanged()) {
    await formRef.value.validate();
    const success = await addressStore.createOrUpdateAddress(
      addressData,
      addressId.value
    );
    if (success) {
      addAddressModalOpen.value = false;
    }
  }
  addAddressModalOpen.value = false;
};

const isAddressChanged = () => {
  if (!originalAddress.value) return true;
  return (
    addressData.city !== originalAddress.value.city ||
    addressData.area !== originalAddress.value.area ||
    addressData.street !== originalAddress.value.street ||
    addressData.detail !== originalAddress.value.detail
  );
};

const addShopOpen = () => {
  addressId.value = null;
  Object.assign(addressData, {
    city: "",
    area: "",
    street: "",
    detail: "",
  });
  title.value = "新增外送地址";
  addAddressModalOpen.value = true;
};
let originalAddress = ref<AddressRequest | null>(null);
const updateShopOpen = (address: any) => {
  addressId.value = address.id;
  title.value = "更改地址";
  Object.assign(addressData, address);
  originalAddress.value = JSON.parse(JSON.stringify(address));
  addAddressModalOpen.value = true;
};
const title = ref<string>();

defineExpose({
  updateShopOpen,
  addShopOpen,
  handleClose,
});
</script>

<style lang="scss" scoped>
.el-dialog__body {
  max-height: 90vh; /* 90% viewport 高度 */
  overflow: hidden; /* 超過不滾動 */
}
.el-form {
  .el-form-item {
    .el-form-item__label {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 0px;
      padding: 0 0 0 12px !important;
    }
    .el-select {
      margin: 0 !important;
    }
    :deep(.el-form-item__error) {
      margin: 2px !important;
    }
  }

  @media (max-width: $breakpoint-xs) {
    display: flex;
    flex-direction: column;
  }
}
</style>
