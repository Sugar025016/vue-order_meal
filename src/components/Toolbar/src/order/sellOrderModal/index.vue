<script setup lang="ts">
import { ref, watch } from 'vue'
import { Orders, Order } from '@/api/order/type'

const props = defineProps({
  scheduleVisible: Boolean,
  orderNew: Object as () => Orders,
  getOrderNew: Function as () => Function,
})

const visible = ref(props.scheduleVisible)

const $emit = defineEmits(['update:scheduleVisible'])

const handleClose = () => {
  $emit('update:scheduleVisible', (visible.value = false))
}

const shopNameSet = ref<Set<string>>(new Set())

const orders = ref<Orders>([])
// 监听 orderNew 的变化
function deepEqual(obj1: Orders | Order, obj2: Orders | Order): boolean {
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    // 如果是数组，则逐个比较元素
    if (obj1.length !== obj2.length) {
      return false
    }

    for (let i = 0; i < obj1.length; i++) {
      if (!deepEqual(obj1[i], obj2[i])) {
        return false
      }
    }
    return true
  } else if (
    typeof obj1 === 'object' &&
    obj1 !== null &&
    typeof obj2 === 'object' &&
    obj2 !== null
  ) {
    // 如果是对象，则逐个比较属性
    const keys1 = Object.keys(obj1)
    const keys2 = Object.keys(obj2)

    if (keys1.length !== keys2.length) {
      return false
    }

    for (const key of keys1) {
      const val1 = obj1[key as keyof typeof obj1]
      const val2 = obj2[key as keyof typeof obj2]

      if (!deepEqual(val1, val2)) {
        return false
      }
    }
    return true
  } else {
    // 简单类型的比较
    return obj1 === obj2
  }
}

watch(
  () => props.orderNew,
  (newOrders) => {
    // 在这里执行你的逻辑，更新 shopNameSet
    if (!deepEqual(newOrders as Orders, orders.value)) {
      orders.value = newOrders as Orders
      updateShopNameSet(newOrders as Orders)
    }
  },
)

// 定义一个函数来更新 shopNameSet
function updateShopNameSet(orders: Orders) {
  shopNameSet.value = new Set<string>()

  orders.forEach((order) => {
    if (order.shopName !== undefined) {
      shopNameSet.value.add(order.shopName)
    }
  })
}
const multipleSelection = ref<Orders>([])
const handleSelectionChange = (val: Orders) => {
  multipleSelection.value = val
}

let orderIds = ref<number[]>([])

import { ElMessage } from 'element-plus'
import { reqPutOrderStatus } from '@/api/order'
import { ResultResponse } from '@/api/type'
import { formatDate } from '@/utils/time'

const cancel = () => {
  multipleSelection.value = []
  handleClose()
}
const confirm = async () => {
  orderIds.value = multipleSelection.value.map((order) => order.orderId)
  let res: ResultResponse = await reqPutOrderStatus(12, orderIds.value)
  if (res.status === 200) {
    ElMessage({
      type: 'success',
      message: '接收' + multipleSelection.value.length + '張訂單',
    })
    const internalGetOrderNew = ref(props.getOrderNew)
    // 检查是否传递了 getOrderNew，并调用它
    if (internalGetOrderNew.value) {
      internalGetOrderNew.value()
    }
  } else {
    ElMessage({
      type: 'error',
      message: '搜尋失败',
    })
  }
}

import { useRouter, useRoute } from 'vue-router'
import useSellShopStore from '@/store/modules/sellShop'

let sellShopStore = useSellShopStore()
let $router = useRouter()
let $route = useRoute()
const goTo = (id: number) => {
  sellShopStore.shopId = id
  $route.meta.shopId = id
  $router.push(`/Sell/${id}/orderNew`)
}
</script>

<template>
  <div class="dialog">
    <el-dialog
      v-model="props.scheduleVisible"
      title="待接訂單"
      :before-close="handleClose"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-body">
            <el-table :data="orders" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" />
              <el-table-column property="orderId" label="編號" width="60" />
              <el-table-column property="shopName" label="店名" width="100">
                <template #default="{ row }">
                  <el-link @click="goTo(row.shopId)" type="primary">
                    {{ row.shopName }}
                  </el-link>
                </template>
              </el-table-column>
              <el-table-column property="userName" label="訂購人" width="100" />

              <el-table-column
                property="takeTime"
                label="取餐日期"
                width="90"
                max-width="180"
                align="center"
                column-key="date"
                :formatter="formatDate"
              />
              <el-table-column
                property="takeTime"
                label="取餐時間"
                width="90"
                max-width="180"
                align="center"
                column-key="time"
                :formatter="formatDate"
              />
              <el-table-column label="外送地址">
                <template #default="{ row }">
                  {{ row.address.city }} - {{ row.address.area }} -
                  {{ row.address.detail }}
                </template>
              </el-table-column>
              <el-table-column property="remark" label="備註" />
            </el-table>
          </div>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel()" size="large" round>取消</el-button>
          <el-button type="primary" @click="confirm()" size="large" round>
            接單
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.dialog {
  ::v-deep .el-dialog {
    border-radius: 20px;
    width: 1200px;
    // margin: 10px;
    .el-dialog__header {
      margin: 0px;
      border-bottom: 1px;
      border-style: solid;
      border-color: rgb(155, 155, 155);
      padding: 20px 20px 15px 20px;
      display: flex;
      span {
        font-size: 26px;
        margin: 10px;
        // font-weight: 900;
      }
    }

    .modal-dialog {
      margin: 0 0 50px 0;
      .shop-name {
        display: flex;
        // justify-content: center;
        align-items: center;
        margin: 0 0 10px 10px;
        font-size: 20px;
        font-weight: 700;
        .el-icon {
          margin-right: 2px;
        }
      }
      .modal-content {
        .modal-header {
          border-bottom: 2px;
          border-style: solid;
          border-color: rgb(155, 155, 155);
          button {
            margin: 10px;
          }
        }
        .modal-body {
          // border-width: 2px;
        }
      }
    }
    :last-child.modal-dialog {
      margin: 0 0 0px 0;
    }
  }

  .dialog-footer {
    button:first-child {
      margin-right: 10px;
    }

    .el-button {
      margin-right: 20px;
      ::v-deep span {
        font-size: 16px;
        margin: 10px;
      }
    }
  }
}
</style>
