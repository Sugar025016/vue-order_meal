<template>
  <div class="auth-captcha">
    <el-input
      :prefix-icon="Warning"
      v-model="localVerifyCode"
      placeholder="驗證碼"
      size="large"
      maxlength="4"
    >
      <template #append>
        <img :src="captchaUrl" alt="Captcha Image" />
        <div class="auth-captcha__get">
          <el-link
            target="_blank"
            type="primary"
            :underline="false"
            @click="refreshCaptcha"
          >
            <el-icon><RefreshRight /></el-icon>
            <span class="span">驗證碼</span>
          </el-link>
        </div>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { Warning, RefreshRight } from "@element-plus/icons-vue";

const props = defineProps({
  verifyCode: String, // 接收父組件的數據
});
const emits = defineEmits(["update:verifyCode"]);
const captchaUrl = ref<string>("/api/register/captcha?timestamp=" + Date.now());

const refreshCaptcha = async () => {
  captchaUrl.value = (await "/api/register/captcha?timestamp=") + Date.now();
};
const localVerifyCode = ref(props.verifyCode); // 本地變數
watch(localVerifyCode, (newValue) => {
  emits("update:verifyCode", newValue); // 當本地變數改變時通知父組件
});

defineExpose({
  refreshCaptcha,
});
</script>

<style lang="scss" scoped>
.auth-captcha {
  width: 100%;
  :deep(.el-input-group) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;

    padding: 0;
    .el-input-group__append {
      background-color: rgb(255, 255, 255);
      padding: 0;
      // border: none;
      box-shadow: none;
      gap: 5px;
    }

    @media (max-width: $breakpoint-xs) {
      grid-template-columns: 1fr;
      .el-input-group__append {
        margin: 0 10px;
        justify-content: flex-start;
      }
    }
  }
}

img {
  width: 120px;
  height: 40px;
}
.auth-captcha__get {
  i {
    font-size: 20px;
  }
}
:deep(.el-input__inner) {
  letter-spacing: 2px !important;
}
</style>
