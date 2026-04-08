<template>
  <div class="auth-register-member-rorm">
    <span class="auth-register-member-rorm__title">註冊帳號</span>
    <el-form ref="formRef" label-width="auto" label-position="top">
      <el-form-item prop="name" label="名稱：" size="large">
        <el-input
          :prefix-icon="User"
          v-model="registerRequest.name"
          clearable
          placeholder="name"
          size="large"
          class="my-text"
        ></el-input>
      </el-form-item>
      <el-form-item prop="account" label="帳號(信箱)：" size="large">
        <el-input
          v-model="registerRequest.email"
          size="large"
          placeholder="Email"
          :prefix-icon="Message"
        >
          <template #prefix> </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="密碼：" size="large">
        <el-input
          type="password"
          :prefix-icon="Lock"
          show-password
          v-model="registerRequest.password"
          size="large"
          placeholder="Password"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item prop="passwordCheck" label="密碼確認：" size="large">
        <el-input
          type="password"
          :prefix-icon="Lock"
          show-password
          v-model="registerRequest.password_confirmation"
          size="large"
          placeholder="Password"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item
        prop="verifyCode"
        class="custom-form-item"
        label="驗證碼："
        size="large"
        v-model="registerRequest.captcha"
      >
        <Captcha ref="captchaRef"></Captcha>
      </el-form-item>
    </el-form>
    <!-- <el-checkbox v-model="checked1" label="Option 1" size="large" /> -->
    <el-button size="large" type="primary" round @click="save">
      確認
    </el-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { User, Lock, Message } from "@element-plus/icons-vue";
import Captcha from "@/components/captcha/Captcha.vue";

import { RegisterRequest } from "@/types/auth";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const save = async () => {
  await authStore.register(registerRequest.value);
};

const registerRequest = ref<RegisterRequest>({
  name: "jjj",
  email: "ruby028016@gmail.com",
  password: "password",
  password_confirmation: "password",
  captcha_key: "",
  captcha: "",
  phone: "123456789",
});
</script>

<style lang="scss" scoped>
@use "@/styles/form.scss" as form;
.auth-register-member-rorm {
  display: flex;
  // align-items:center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  max-width: 500px;
  padding: 30px;

  @include respond(md) {
    padding: 20px;
  }
  .auth-register-member-rorm__title {
    margin: 20px auto;
    vertical-align: middle;
    font-size: 36px;
    color: rgb(80, 80, 80);
    font-weight: 700;
  }
}
</style>
