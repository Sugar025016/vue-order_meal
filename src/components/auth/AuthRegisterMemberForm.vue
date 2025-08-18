<template>
  <div class="register-member">
    <span class="table-title">註冊帳號</span>
    <el-form ref="formRef" label-width="auto" label-position="top">
      <el-form-item prop="name" label="名稱：" size="large">
        <el-input
          :prefix-icon="User"
          v-model="registerMember.name"
          clearable
          placeholder="name"
          size="large"
          class="my-text"
        ></el-input>
      </el-form-item>
      <el-form-item prop="account" label="帳號(信箱)：" size="large">
        <el-input
          v-model="registerMember.account"
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
          v-model="registerMember.password"
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
          v-model="registerMember.passwordCheck"
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
        v-model="registerMember.verifyCode"
      >
        <AuthCaptcha ref="captchaRef"></AuthCaptcha>
      </el-form-item>
    </el-form>
    <!-- <el-checkbox v-model="checked1" label="Option 1" size="large" /> -->
    <el-button size="large" type="primary" round @click="save()">
      確認
    </el-button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { User, Lock, Message } from "@element-plus/icons-vue";
// import { RegisterMember } from '@/api/user/type'
// import { reqAddMember } from '@/api/user'
import { ElMessage } from "element-plus";
import AuthCaptcha from "./AuthCaptcha.vue";
// import { ResponseData } from '@/api/type'

import { useRouter } from "vue-router";
// import TimeSelect from '@/components/Buy/BuyCheck/src/timeSelect.vue'

let $router = useRouter();

const save = async () => {};

export interface RegisterMember {
  verifyCode: string;
  name: string;
  account: string;
  password: string;
  passwordCheck: string;
  phone: string;
}

const registerMember = ref<RegisterMember>({
  name: "jjj",
  account: "ruby028016@gmail.com",
  phone: "123456789",
  password: "password",
  passwordCheck: "password",
  verifyCode: "",
});
</script>

<style lang="scss" scoped>
@use "@/styles/form.scss" as form;
.register-member {
  display: flex;
  // align-items:center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
  .table-title {
    margin: 20px auto;
    vertical-align: middle;
    font-size: 36px;
    color: rgb(80, 80, 80);
    font-weight: 700;
  }
}
</style>
