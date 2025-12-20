<template>
  <div class="a">
    <el-button type="primary" plain @click="openDialog" round>
      更改名稱
    </el-button>

    <!-- Step 1：密碼驗證 -->
    <el-dialog v-model="passwordDialog" title="驗證密碼" width="420">
      <el-input
        v-model="password"
        type="password"
        placeholder="請輸入登入密碼"
      />

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="passwordDialog = false" round>取消</el-button>
          <el-button type="primary" @click="verifyPassword" round
            >下一步</el-button
          >
        </div>
      </template>
    </el-dialog>

    <!-- Step 2：更改名稱 -->
    <el-dialog v-model="nameDialog" title="更改名稱" width="420">
      <el-input v-model="newName" placeholder="請輸入新的名稱" />

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="nameDialog = false" round>取消</el-button>
          <el-button type="primary" @click="submitName" round
            >確認變更</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth";
const authStore = useAuthStore();
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();

const passwordDialog = ref(false);
const nameDialog = ref(false);

const password = ref("");
const newName = ref("");
const openDialog = () => {
  passwordDialog.value = true;
  password.value = "password";
  newName.value = userStore.user?.name || "";
};
const verifyPassword = async () => {
  // 呼叫後端驗證密碼 API
  const res = await authStore.verifyPassword(password.value);
  console.log("verifyPasswordApi:", res?.status);
  if (res?.status) {
    passwordDialog.value = false;
    nameDialog.value = true;
    ElMessage.success("密碼驗證成功，請輸入新名稱");
  } else {
    ElMessage.error(res?.message || "密碼驗證失敗");
  }
};

const submitName = async () => {
  const res = await userStore.updateName(newName.value);
  if (res.status) {
    nameDialog.value = false;
    authStore.resetVerification();
    ElMessage.success("名稱更新成功");
  } else {
    ElMessage.error(res.message || "更新失敗");
  }
};
</script>
<style scoped lang="scss">
.a {
  :deep(.el-dialog) {
    border-radius: 14px;
    .el-dialog__header {
      font-size: 20px;
      font-weight: 600;
      text-align: center;
    }

    .el-dialog__body {
      padding: 20px 24px;
    }

    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      gap: 12px;

      .el-button {
        // border-radius: 8px;
        padding: 6px 20px;
      }
    }
  }
}
</style>
