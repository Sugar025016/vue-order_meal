<template>
  <div>
    <!-- 觸發按鈕 -->
    <el-button round type="primary" plain @click="dialogVisible = true">
      變更密碼
    </el-button>

    <!-- Dialog -->
    <el-dialog
      v-model="dialogVisible"
      title="變更密碼"
      width="500px"
      :before-close="handleClose"
    >
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="舊密碼" prop="currentPassword">
          <el-input
            v-model="form.currentPassword"
            type="password"
            placeholder="請輸入舊密碼"
          />
        </el-form-item>

        <el-form-item label="新密碼" prop="newPassword">
          <el-input
            v-model="form.newPassword"
            type="password"
            placeholder="請輸入新密碼"
          />
        </el-form-item>

        <el-form-item label="確認新密碼" prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="請再次輸入新密碼"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false" round>取消</el-button>
          <el-button type="primary" @click="submitForm" round
            >確認變更</el-button
          >
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import { useAuthStore } from "@/stores/auth";
import { PwdChangeRequest } from "@/types/auth";
const authStore = useAuthStore();

const dialogVisible = ref(false);
const formRef = ref();

const form: PwdChangeRequest = reactive({
  currentPassword: "password",
  newPassword: "",
  confirmPassword: "",
});

const rules = {
  currentPassword: [
    { required: true, message: "請輸入舊密碼", trigger: "blur" },
  ],
  newPassword: [{ required: true, message: "請輸入新密碼", trigger: "blur" }],
  confirmPassword: [
    {
      required: true,
      message: "請再次輸入新密碼",
      trigger: "blur",
    },
    {
      validator: (rule: any, value: string, callback: any) => {
        if (value !== form.newPassword) {
          callback(new Error("兩次密碼輸入不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};

// 提交表單
const submitForm = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (!valid) {
      console.log("驗證失敗");
      return false;
    }

    try {
      const res = await authStore.changePassword(form);

      if (res?.status) {
        ElMessage.success("密碼更新成功");
        dialogVisible.value = false;

        // 清空表單
        form.currentPassword = "";
        form.newPassword = "";
        form.confirmPassword = "";
      } else {
        ElMessage.error(authStore.error || "更新失敗");
      }
    } catch (err) {
      ElMessage.error("更新失敗，請稍後再試");
    }
  });
};

// 關閉前處理
const handleClose = () => {
  dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
:deep(.el-dialog) {
  border-radius: 20px; // Dialog 圓角
  padding: 20px;

  .el-dialog__header {
    span {
      font-weight: 600;
      font-size: 22px;
    }
    // border-bottom: none; // 去掉底線
    text-align: center;
    padding: 16px 20px;
  }

  .el-dialog__body {
    padding: 20px;
    background-color: #fff8f8;
    border-radius: 12px;
  }

  .el-form {
    .el-form-item {
      //   margin-bottom: 18px;

      .el-form-item__label {
        width: 100px !important;
        font-weight: 500;
        font-size: 15px;
        color: #555;
      }
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px 0 0 0;

    .el-button {
      margin-left: 10px;
      padding: 6px 20px;
      font-weight: 500;
    }
  }
}

/* 可選：彈窗背景稍微透明 */
.el-overlay {
  background-color: rgba(0, 0, 0, 0.35);
}
</style>
