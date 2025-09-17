<template>
  <div class="dialog">
    <el-dialog
      v-model="chooseAddressModelOpen"
      title="外送地址"
      :before-close="handleClose"
      :show-close="!chooseAddressModelOpen"
      :close-on-click-modal="!chooseAddressModelOpen"
    >
      <div class="address">
        <span class="address-introduce">選擇外送地址：</span>
        <div class="item">
          <el-scrollbar max-height="400px">
            <el-radio-group
              v-model="addressId"
              class="radio"
              v-for="address in addresses"
              @change="changeRedis(addressId)"
            >
              <el-radio :label="address.id" size="large">
                {{
                  address.city +
                  "&nbsp-&nbsp" +
                  address.area +
                  "&nbsp-&nbsp" +
                  address.street +
                  "&nbsp-&nbsp" +
                  address.detail
                }}
              </el-radio>
              <div>
                <el-button
                  class="btn btn-primary"
                  @click="reviseAddress(address)"
                  type="primary"
                  round
                  plain
                  :icon="EditPen"
                  circle
                ></el-button>
                <el-button
                  class="btn btn-primary"
                  @click="checkDeleteAddress(address)"
                  type="danger"
                  round
                  :icon="Delete"
                  circle
                ></el-button>
              </div>
            </el-radio-group>
          </el-scrollbar>
          <div class="address-edit">
            <el-button
              class="button-icon button-left"
              type="primary"
              size="large"
              :icon="Plus"
              circle
              @click="addAddress()"
            />
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="checkAddress" round size="large">
            確認
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>

  <EditAddressModal
    ref="addressRefs"
    @childClosed="handleChildClosed"
  ></EditAddressModal>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import useUserStore from "@/store/modules/user";
import { UserAddressResponseData } from "@/api/user/type";
import {
  reqDeleteUserAddresses,
  reqGetUserAddresses,
  reqPutUserAddressDelivery,
} from "@/api/user";
import { ElMessage } from "element-plus";

import EditAddressModal from "@/components/Buy/BuyCheck/src/editAddressModal.vue";
import { Address, Response } from "@/api/type";
import { Plus, EditPen, Delete, CaretTop } from "@element-plus/icons-vue";

import useShopStore from "@/store/modules/shop";
import { ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

let shopStore = useShopStore();

let userStore = useUserStore();

const radio1 = ref(0);
const addresses = ref<Address[]>();
const addressId = ref<number>(0);

let $router = useRouter();

const chooseAddressModelOpen = ref<boolean>(false);

const addAddress = async () => {
  addressRefs.value?.addShop();
};
const reviseAddress = async (address: Address) => {
  if (address.id === userStore.address?.id && userStore.cartCount > 0) {
    await ElMessageBox.confirm(
      "外送地址變更，需要清空購物車，你確定要變更嗎？",
      "外送地址變更",
      {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      }
    )
      .then(() => {
        addressRefs.value?.updateShop(address);
      })
      .catch(() => {
        return;
      });
  } else {
    addressRefs.value?.updateShop(address);
  }
};

const checkDeleteAddress = async (address: Address) => {
  if (address.id === userStore.address?.id && userStore.cartCount > 0) {
    await ElMessageBox.confirm(
      "刪除此外送地址，需要清空購物車，你確定要變更嗎？",
      "外送地址變更",
      {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      }
    ).then(() => {
      deleteAddress(address);
    });
  } else {
    deleteAddress(address);
  }
};

const deleteAddress = async (address: Address) => {
  let res: Response = await reqDeleteUserAddresses(address.id as number);
  if (res.status === 200) {
    userStore.userInfo();
    getUserAddress();
  } else {
    ElMessage({
      type: "error",
      message: "搜尋失败",
    });
  }
};

const checkAddress = async () => {
  if (userStore.cartCount > 0) {
    let addr: Address = addresses.value?.find(
      (t) => t.id === addressId.value
    ) as Address;
    let mk = calculateDistance(
      addr.lat as number,
      addr.lng as number,
      userStore.cartLat,
      userStore.cartLng
    );

    if (mk > userStore.cartDeliveryKm && userStore.cartCount > 0) {
      await ElMessageBox.confirm(
        "外送地址變更，需要清空購物車，你確定要變更嗎？",
        "外送地址變更",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          chooseAddress();
          ElMessage({
            type: "success",
            message: "購物車已清空",
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: "取消變更外送地址",
          });
        });
    } else {
      chooseAddress();
    }
  } else {
    chooseAddress();
  }
};
function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const earthRadiusKm = 6371;

  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  const lat1Rad = degreesToRadians(lat1);
  const lat2Rad = degreesToRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) *
      Math.sin(dLon / 2) *
      Math.cos(lat1Rad) *
      Math.cos(lat2Rad);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

const chooseAddress = async () => {
  let res: Response = await reqPutUserAddressDelivery(addressId.value);
  if (res.status === 200) {
    await shopStore.getShopPage();
    await userStore.userInfo();
    userStore.setCheckAddress(true);
    userStore.address = addresses.value?.find(
      (t) => t.id === addressId.value
    ) as Address;
    chooseAddressModelOpen.value = false;
    $router.push("/");
  } else {
    ElMessage({
      type: "error",
      message: "設定外送地址失敗",
    });
  }
};
// let isChangeAddress = ref<boolean>(true)
let addressParams = ref<Address[]>([]);

const open = async () => {
  chooseAddressModelOpen.value = true;
  getUserAddress();
};

const getUserAddress = async () => {
  let res: UserAddressResponseData = await reqGetUserAddresses();
  if (res.status === 200) {
    addresses.value = res.data;
    addressParams.value = JSON.parse(JSON.stringify(addresses.value));
    console.log("www  res.data:", res.data);
    if (res.data.length === 0) {
      // isChangeAddress.value = false
      addAddress();
    }

    if (userStore.address && userStore.address.id) {
      addressId.value = userStore.address.id;
    } else if (addresses.value[0] && addresses.value[0].id) {
      addressId.value = addresses.value[0].id;
    }
  } else {
    ElMessage({
      type: "error",
      message: "搜尋失败",
    });
  }
};

const handleClose = () => {
  chooseAddressModelOpen.value = false;
};

const changeRedis = (addressId: number) => {};

const addressRefs = ref<typeof EditAddressModal>();

const handleChildClosed = () => {
  addressRefs.value?.handleClose();
  getUserAddress();
};
defineExpose({
  open,
});
</script>

<style lang="scss" scoped>
.dialog {
  :deep(.el-dialog) {
    border-radius: 20px;
    width: 550px;

    // max-height: 80%;
    .el-dialog__header {
      margin: 0px;
      border-bottom: 1px;
      border-style: solid;
      border-color: rgb(155, 155, 155);
      padding: 20px 20px 15px 20px;
      display: flex;
      width: 100%;
      span {
        font-size: 26px;
        margin: 10px;
      }
    }
    .el-dialog__body {
      margin: 20px 20px 0 20px;
      padding: 20px 20px 0 20px;
      .address {
        width: 100%;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        .address-introduce {
          font-weight: 900;
        }
        .item {
          width: 100%;

          .address-edit {
            width: 100%;
            position: relative;
            display: flex;
            flex-direction: center;
            justify-content: flex-start;

            .button-left {
              position: relative;
              left: 0px;
            }
          }
        }
        .radio {
          display: flex;
          align-items: center;
        }
        .address-add {
          margin: 0 0 0 10px;
          .address {
            margin: 10px 0;
          }
        }
      }
    }
  }
}

@media (max-width: $breakpoint-sm) {
  .dialog {
    :deep(.el-dialog) {
      width: 100%;
      height: auto;
      // position: fixed;
      // bottom: 0;
      // right: 0;
      // top:0;
      // left: 0;
      .radio {
        margin: 10px 0;
        .el-radio {
          margin-right: 0px;
          // height: 36px;
          span {
            font-size: 16px;
            white-space: pre-wrap;
            line-height: 20px;
          }
        }

        .el-button:first-child {
          margin: 0 0 0 20px;
          // width: 32px;
        }
      }
    }
  }
}
</style>
