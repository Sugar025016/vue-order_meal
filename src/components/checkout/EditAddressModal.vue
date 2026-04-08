<script setup lang="ts">
import { nextTick, reactive, ref } from "vue";
import { Address } from "@/types/address";

import address from "@/utils/address.js";

const addAddressModalOpen = ref<boolean>(false);
const handleClose = () => {
  addAddressModalOpen.value = false;
};

const formSize = ref("default");

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

let addressData = reactive<Address>({
  city: "",
  area: "",
  street: "",
  detail: "",
  lat: 0,
  lng: 0,
  id: 0,
  user_id: 0,
});
const emits = defineEmits(["childClosed"]);
const saveAddress = async () => {
  await formRef.value.validate();
  // let res: AddressResponseData = await reqAddUserAddresses(addressData)
  // if (res.status === 200) {
  //   await userStore.userInfo()
  //   emits('childClosed')
  // } else {
  //   ElMessage({
  //     type: 'error',
  //     message: '搜尋失败',
  //   })
  // }
};

const addShop = () => {
  addAddressModalOpen.value = true;

  Object.assign(addressData, {
    city: "",
    area: "",
    street: "",
    detail: "",
  });
  title.value = "新增外送地址";
  nextTick(() => {
    formRef.value.clearValidate("city");
    formRef.value.clearValidate("area");
    formRef.value.clearValidate("street");
    formRef.value.clearValidate("detail");
  });
};

const updateShop = (address: Address) => {
  addAddressModalOpen.value = true;

  title.value = "更改地址";
  Object.assign(addressData, address);

  nextTick(() => {
    formRef.value.clearValidate("city");
    formRef.value.clearValidate("area");
    formRef.value.clearValidate("street");
    formRef.value.clearValidate("detail");
  });
};
const title = ref<string>();

defineExpose({
  updateShop,
  addShop,
  handleClose,
});
</script>
<template>
  <div class="dialog">
    <el-dialog
      v-model="addAddressModalOpen"
      :title="title"
      :before-close="handleClose"
      class="test1"
      width="40%"
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
            <el-form-item prop="city">
              <el-select
                v-model="addressData.city"
                class="m-2"
                placeholder="請選擇城市"
                size="large"
                @change="changeCity()"
              >
                <el-option
                  v-for="(item, index) in address"
                  :key="index"
                  :label="item.cityName"
                  :value="item.cityName"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="area">
              <el-select
                v-model="addressData.area"
                class="m-2"
                placeholder="請選擇區域"
                size="large"
                no-data-text="請先選擇城市"
                @change="changeArea()"
              >
                <el-option
                  v-for="(area, index) in address.find(
                    (address) => address.cityName === addressData.city,
                  )?.areas"
                  :key="index"
                  :value="area.areaName"
                  :label="area.areaName"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="street">
              <el-select
                class="m-4"
                v-model="addressData.street"
                placeholder="請選擇路(街)名或鄉里名稱"
                size="large"
                no-data-text="請先選擇鄉鎮[市]區"
              >
                <el-option
                  v-for="(street, index) in address
                    .find((address) => address.cityName === addressData.city)
                    ?.areas.find((areas) => areas.areaName === addressData.area)
                    ?.streets"
                  :key="index"
                  :value="street.streetName"
                  :label="street.streetName"
                />
              </el-select>
            </el-form-item>
            <el-form-item prop="detail">
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

<style lang="scss" scoped>
.el-form {
  .el-form-item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 22px;
    max-width: 500px;
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
