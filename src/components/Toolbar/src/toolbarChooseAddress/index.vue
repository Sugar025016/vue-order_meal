<template>
  <div class="dialog">
    <el-dialog
      v-model="chooseAddressModelOpen"
      title="外送地址11"
      :before-close="handleClose"
      :close-on-click-modal="!chooseAddressModelOpen"
      :modal-append-to-body="false"
      :lock-scroll="false"
    >
      <div class="address" v-if="addressStore.addresses.length">
        <span class="address-introduce">選擇外送地址：</span>
        <div class="item">
          <el-scrollbar max-height="400px">
            <el-radio-group
              v-model="addressId"
              class="radio"
              v-for="address in addressStore.addresses"
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

      <div v-else class="no-address">
        <div class="no-address-content">
          <p>請新增外送地址</p>
          <el-button type="primary" size="large" round @click="addAddress()">
            新增外送地址
          </el-button>
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
import { ref } from "vue";
import { ElMessage } from "element-plus";

import EditAddressModal from "@/components/Toolbar/src/toolbarChooseAddress/editAddressModal.vue";
import { Plus, EditPen, Delete } from "@element-plus/icons-vue";
import { useAddressStore } from "@/stores/address";

import { ElMessageBox } from "element-plus";
import { Address } from "@/types/address";

const addressStore = useAddressStore();
// 假資料
const addresses = ref<Address[]>([]);

const addressId = ref<number>(0);


const chooseAddressModelOpen = ref<boolean>(false);

const addAddress = async () => {
  addressRefs.value?.addShopOpen();
};
const reviseAddress = async (address: Address) => {
  addressRefs.value?.updateShopOpen(address);
};
const checkDeleteAddress = async (address: any) => {
  try {
    await ElMessageBox.confirm("您確定要刪除該地址嗎？", "刪除地址", {
      confirmButtonText: "確定",
      cancelButtonText: "取消",
      type: "warning",
    });

    await deleteAddress(address);

    ElMessage({
      type: "success",
      message: "地址已刪除",
    });
  } catch (err) {
    // 點取消或出錯都會進來
    ElMessage({
      type: "info",
      message: "已取消刪除地址",
    });
  }
};

const deleteAddress = async (address: any) => {
  const success = await addressStore.deleteAddress(address.id);
  console.log("刪除的地址是目前選擇的地址，----------------");
  console.log("success:", success);
  if (success) {
    if (addressStore.currentAddress?.id === address.id) {
      addressId.value = 0;
      console.log("刪除的地址是目前選擇的地址，已清除目前地址");
      console.log("addressId.value:", addressId.value);
    }
    getAddress();
  }
};

const checkAddress = async () => {
  if (addressStore.addresses.length < 1) {
    ElMessage({
      type: "warning",
      message: "請新增外送地址",
    });
  } else if (!addressId.value || addressId.value === 0) {
    console.log("請選擇外送地址");
    console.log("addressId.value:", addressId.value);
    ElMessage({
      type: "warning",
      message: "請選擇外送地址",
    });
    return;
  } else if (addressStore.currentAddress?.id === addressId.value) {
    chooseAddressModelOpen.value = false;

    return;
  } else {
    await setCurrentAddress();
  }
};



// function calculateDistance(
//   lat1: number,
//   lon1: number,
//   lat2: number,
//   lon2: number
// ): number {
//   const earthRadiusKm = 6371;

//   const dLat = degreesToRadians(lat2 - lat1);
//   const dLon = degreesToRadians(lon2 - lon1);

//   const lat1Rad = degreesToRadians(lat1);
//   const lat2Rad = degreesToRadians(lat2);

//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.sin(dLon / 2) *
//       Math.sin(dLon / 2) *
//       Math.cos(lat1Rad) *
//       Math.cos(lat2Rad);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//   return earthRadiusKm * c;
// }

const setCurrentAddress = async () => {
  console.log("setCurrentAddress addressId.value:", addressId.value);
  const success = await addressStore.setCurrentAddress(addressId.value);
  if (success) {
    chooseAddressModelOpen.value = false;
  } else {
    ElMessage({
      type: "error",
      message: "設定外送地址失敗",
    });
  }
};
let addressParams = ref<Address[]>([]);

const open = async () => {
  getAddress();
  chooseAddressModelOpen.value = true;
};
const getAddress = async () => {
  await addressStore.fetchAddresses();
  addressParams.value = JSON.parse(JSON.stringify(addresses.value));
  addressId.value = addressStore.currentAddress?.id || 0;
  if (addressStore.addresses?.length === 0) {
    addAddress();
  }
};

const handleClose = () => {
  chooseAddressModelOpen.value = false;
};


const addressRefs = ref<typeof EditAddressModal>();
const handleChildClosed = () => {
  // addressRefs.value?.handleClose()
  // getUserAddress()
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

.no-address {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px; // 或依需求調整
  text-align: center;

  .no-address-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      font-size: 26px;
      font-weight: bold;
      color: #ff2b2b;
      color: #555;
      margin-bottom: 20px;
    }

    .el-button {
      font-size: 16px;
      padding: 10px 20px;
    }
  }
}
</style>
