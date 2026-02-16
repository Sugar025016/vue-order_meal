// import { ref } from 'vue'
// import { ElMessage } from 'element-plus'
// import { reqAddOrder } from '@/api/order'
// import { AddOrder } from '@/api/order/type'
// import { TimeSelectRef, d, t, radio1, remark } from './index.vue'

// export const sendOrder = async () => {
//   await TimeSelectRef.value?.save()
//   const takeTime = new Date(d.value)
//   const [hours, minutes] = t.value.split(':').map(Number)
//   takeTime.setHours(hours, minutes, 0, 0)
//   const order = ref<AddOrder>({
//     takeTime: takeTime,
//     addressId: radio1.value,
//     remark: remark.value,
//   })
//   // reqAddOrder()
//   const res: OrderResponseData = await reqAddOrder(order.value)

//   if (res.status === 200) {

//   } else {
//     ElMessage({
//       type: 'error',
//       message: '搜尋失败',
//     })
//   }
// }
