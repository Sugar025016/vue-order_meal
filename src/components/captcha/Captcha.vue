<template>
  <div class="auth-captcha">
    <el-input
      :prefix-icon="Warning"
      v-model="localVerifyCode"
      placeholder="驗證碼"
      size="large"
      maxlength="5"
    >
      <template #append>
        <!-- <img :src="captcha" alt="Captcha Image" /> -->
        <img :src="captcha?.image" alt="Captcha Image" />
        <div class="auth-captcha__get">
          <el-link
            target="_blank"
            type="primary"
            :underline="false"
            @click="getCaptcha"
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
import { onMounted, ref, watch } from "vue";
import { Warning, RefreshRight } from "@element-plus/icons-vue";
import { getCaptchaApi } from "@/api/captcha";
import type { Captcha } from "@/types/captcha";

const props = defineProps({
  verifyCode: String, // 接收父組件的數據
});
const emits = defineEmits<{
  (e: "update:verifyCode", value: string): void;
  (e: "update:captchaKey", value: string): void;
  // (e: "update:captchaTTL", value: number): void;
}>();
// const captchaUrl = ref<string>("/api/register/captcha?timestamp=" + Date.now());

// const refreshCaptcha = async () => {
//   // captchaUrl.value = (await "/api/register/captcha?timestamp=") + Date.now();
//   await getCaptcha();
// };
const localVerifyCode = ref(props.verifyCode || ""); // 本地變數
watch(localVerifyCode, (newValue) => {
  emits("update:verifyCode", newValue || ""); // 當本地變數改變時通知父組件
});

const captcha = ref<Captcha>();

const getCaptcha = async () => {
  try {
    const res = await getCaptchaApi();
    // 伺服器回傳格式是 ApiResponse<Captcha>
    // 所以可以取出 res.data
    captcha.value = {
      image: res.data.image,
      captcha_key: res.data.captcha_key,
      ttl: res.data.ttl,
    };
    console.log("取得驗證碼成功:", captcha.value);

    emits("update:captchaKey", captcha.value.captcha_key);
    // emits("update:captchaTTL", captcha.value.ttl);
  } catch (err) {
    console.error("取得驗證碼失敗:", err);
  }
};

if (captcha.value?.ttl) {
  setTimeout(() => {
    alert("驗證碼已過期，請重新取得");
  }, captcha.value.ttl * 1000);
}

onMounted(() => {
  getCaptcha();
});

defineExpose({
  getCaptcha,
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
