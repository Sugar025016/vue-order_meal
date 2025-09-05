<script setup lang="ts">
import { ref } from 'vue'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
const dialogVisible = ref(false)

const props = defineProps({
  memberModelOpen: Boolean,
})

const visible = ref(props.memberModelOpen)

const $emit = defineEmits(['update:memberModelOpen'])

const handleClose = () => {
  $emit('update:memberModelOpen', (visible.value = false))
}
</script>
<template>
  <div class="dialog">
    <el-dialog
      v-model="props.memberModelOpen"
      title="個人資料"
      :before-close="handleClose"
    >
      <div class="text">
        <span>帳號：</span>
        <span>{{ userStore.account }}</span>
      </div>
      <div class="text">
        <span>姓名：</span>
        <span>{{ userStore.username }}</span>
      </div>
      <div class="text">
        <span>E-mail：</span>
        <span>{{ userStore.email }}</span>
      </div>
      <div class="text">
        <span>手機：</span>
        <span>{{ userStore.phone }}</span>
        <el-button class="text-button" round>驗證手機號碼</el-button>
      </div>
      <div class="text">
        <span>LINE Notify：</span>
        <span>BBBBB</span>
        <el-button class="text-button" round>連結Line Notify</el-button>
      </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
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
    .el-dialog__body {
      // font-size: 20px;
      margin: 20px;
      .text {
        margin: 20px 0;
        span {
          font-size: 16px;
          margin: 20px 0;
        }
        .text-button {
          margin: 0 20px;
          background-color: $color;
          color: #000;
        }
      }
    }
  }
}
</style>
