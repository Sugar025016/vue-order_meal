<template>
  <div class="buyOrder">
        <h1>我的訂單</h1>

        <div class="tabs">
          <div class="tabs-content">
            <el-table
              :data="order"
              style="width: 100%"
              :row-class-name="tableRowClassName"
              :cell-style="cellStyle"
            >
              <el-table-column label="圖片" prop="imgUrl" align="center">
                <template #="{ row, $index }">
                  <el-image
                    :src="row.imgUrl"
                    alt=""
                    style="width: 130px; height: 100px"
                    lazy
                  />
                </template>
              </el-table-column>

              <!-- <el-table-column prop="orderDetails" label="訂單編號" width="300" /> -->
              <el-table-column type="expand">
                <!-- <template #default="props">
                  <div m="4">
                    <p m="t-0 b-2">State: {{ props.row.state }}</p>
                    <p m="t-0 b-2">City: {{ props.row.city }}</p>
                    <p m="t-0 b-2">Address: {{ props.row.address }}</p>
                    <p m="t-0 b-2">Zip: {{ props.row.zip }}</p>
                    <h3>Family</h3>

                  </div>
                </template> -->
                <template #default="props">
                  <!-- <div m="4">
                    <p m="t-0 b-2">State: {{ props.row.orderDetails }}</p>
                    <h3>Family</h3>

                  </div> -->
                  <div m="4" style="margin: 10px 40px" class="expand-row">
                    <el-table
                      :data="props.row.orderDetails"
                      class="expand-table"
                    >
                      <el-table-column
                        label="圖片"
                        prop="imgUrl"
                        align="center"
                      >
                        <template #="{ row, $index }">
                          <el-image
                            :src="row.imgUrl"
                            alt=""
                            style="width: 130px; height: 100px"
                            lazy
                          />
                        </template>
                      </el-table-column>
                      <el-table-column
                        label="餐點"
                        prop="productName"
                        align="center"
                      />
                      <el-table-column label="數量" prop="qty" align="center" />
                      <el-table-column
                        label="價格"
                        prop="price"
                        align="center"
                      />
                      <el-table-column
                        label="備註"
                        prop="remark"
                        align="center"
                      />
                    </el-table>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="orderId" label="訂單編號" width="100" />

              <el-table-column prop="shopName" label="店家" width="100" />

              <el-table-column prop="statusChinese" label="狀態" />
              <!-- <el-table-column prop="takeTime" label="取餐時間" /> -->
              <el-table-column
                prop="takeTime"
                label="取餐日期"
                width="100"
                max-width="180"
                align="center"
                column-key="date"
                :formatter="formatDate"
              />
              <el-table-column
                prop="takeTime"
                label="取餐時間"
                width="100"
                max-width="180"
                align="center"
                column-key="time"
                :formatter="formatDate"
              />
              <el-table-column prop="totalPrice" label="金額" />
              <el-table-column
                prop="remark"
                label="備註"
                :cell-style="cellStyle"
              />
            </el-table>
          </div>
          <div v-if="loading" class="loading" v-loading="loading"></div>
        </div>
  </div>
</template>

<script setup lang="ts">



import { ElMessage } from "element-plus";

import { onBeforeUnmount, onMounted, ref } from "vue";
import { formatDate } from "@/utils/time";
const activeTab = ref(0);
interface Tab {
  label: string;
  content: string;
}
const tabs: Tab[] = [
  { label: "我的訂單", content: "Content 1" },
  { label: "過去的訂單", content: "Content 2" },
];
const changeTab = (index: number) => {
  activeTab.value = index;
};
const page = ref<number>(1);

const order = ref<Orders>([]);
const orderPageResponse = ref<OrderPageResponse>();

const tableRowClassName = ({
  row,
  rowIndex,
}: {
  row: Order;
  rowIndex: number;
}) => {
  if (rowIndex === 1) {
    return "warning-row";
  } else if (rowIndex === 3) {
    return "success-row";
  }
  return "";
};

const $color = "#fd7e14";
const cellStyle = ({ row }: any) => {
  const style = ref({
    color: "",
    background: "",
  });
  if (row.status <= 90) {
    style.value.color = $color;
  }

  return style.value;
};

const getOrder = async (page: number) => {
  let res: GetOrderPageResponse = await reqGetOrder(page);
  if (res.status === 200) {
    orderPageResponse.value = await res.data;
    const to = window.scrollY;
    await order.value.push(...res.data.content);

    window.scrollTo({ top: to, behavior: "instant" });

    loading.value = false;
  } else {
    ElMessage({
      type: "error",
      message: "搜尋失败",
    });
  }
};

const loading = ref(false);
let a = 0;
const handleScroll = async () => {
  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 200
  ) {
    // 觸發加載更多數據的方法
    if (
      orderPageResponse.value?.totalPages &&
      page.value < orderPageResponse.value?.totalPages &&
      !loading.value
    ) {
      loading.value = true;

      page.value = page.value + 1;

      await setTimeout(() => {
        getOrder(page.value);
      }, 1400);
    }
  }
};
onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
onMounted(() => {
  window.addEventListener("scroll", handleScroll), getOrder(page.value);
});
</script>

<style lang="scss" scoped>
$table-cell-padding-y: 1.5rem;
$table-border-color: rgb(155, 155, 155);
$table-border-color: rgba(155, 155, 155, 0.548);

.example-showcase .el-loading-mask {
  z-index: 9;
}
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
.el-table .success-row {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
.buyOrder {
  h1 {
    font-size: 36px;
    margin: 0 10px 20px 10px;
    color: $color;
  }
  .tabs {
    width: 100%;
    .tabs-header {
      display: flex;
      margin: 20px 0 0 0;
      color: #636262;
      border-bottom: 1px solid #63626236;
      white-space: nowrap;
      overflow-x: auto;
      div {
        position: relative;
        padding: 0 32px 0 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
      .tab-label {
        display: inline-block;
        position: relative;
        padding: 16px 0;
        z-index: 1;
      }

      .underline {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: transparent;
        transition: background-color 0.2s;
        display: inline-flex;
        position: relative;
        align-items: center;
        justify-content: center;
        border-bottom: 3px solid rgba(0, 0, 0, 0);
      }
      div:hover .underline {
        border-bottom: 3px solid $color;
      }
      .active {
        color: #000000;
        border-bottom: 3px solid $color;
      }
      div:hover {
        color: #000000;
      }
      .tabs-content {
        font-size: 30px;
        margin: 10px;
        border-bottom: #636262;
        display: flex;
        align-items: center;
        .table > tbody {
          background-color: aquamarine;
        }
        .table {
          background-color: aquamarine;
          tbody {
            background-color: aquamarine;
            tr td:first-child {
              margin-top: 10px;
              margin-bottom: 10px;
            }
          }
        }
      }
    }
    .loading {
      height: 50px;
      margin-top: 20px;
    }
  }
}
</style>
