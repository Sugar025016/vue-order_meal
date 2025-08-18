<template>
  <div class="login_container">
    <el-card class="login_form">
      <h3>會員登入</h3>

      <el-form label-position="top" ref="loginForms">
        <el-form-item prop="username" label="帳號(信箱)：">
          <el-input
            clearable
            :prefix-icon="User"
            v-model="loginForm.username"
            placeholder="請輸入帳號"
            size="large"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密碼：">
          <el-input
            type="password"
            :prefix-icon="Lock"
            show-password
            v-model="loginForm.password"
            size="large"
            placeholder="請輸入密碼"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item
          label="驗證碼："
          prop="verifyCode"
          class="custom-form-item"
        >
          <AuthCaptcha ref="captchaRef"></AuthCaptcha>
        </el-form-item>
        <el-form-item prop="rememberMe">
          <el-checkbox
            class="custom-checkbox"
            label="記住我"
            size="large"
            text-color="#F56C6C"
          />
        </el-form-item>
      </el-form>
      <el-form-item>
        <el-button class="login_btn" type="primary" size="default" round>
          登入
        </el-button>
        <!-- <el-button type="primary" round>Primary</el-button> -->
      </el-form-item>
      <div class="forget">
        <router-link :to="'/Login/forgetPassword'" class="link">
          忘記密碼
        </router-link>
      </div>
      <hr />
      <div class="forget">
        <router-link :to="'/Register'" class="link">
          沒有帳號這邊可以註冊
        </router-link>
      </div>
    </el-card>
  </div>
</template>
<script setup lang="ts">
import { User, Lock } from "@element-plus/icons-vue";
import AuthCaptcha from "./AuthCaptcha.vue";
import { reactive } from "vue";

const loginForm = reactive({
  username: "admin@example.com",
  password: "password",
  verifyCode: "",
  rememberMe: true,
});
</script>

<style lang="scss" scoped>
@use "@/styles/form.scss" as form;

.login_container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  @include respond(md) {
    max-width: 500px;
  }
  .el-card {
    border: 0px;
    box-shadow: none;
    border-radius: 40px;
    width: 100%;
  }
  .login_form {
    position: relative;
    padding: 10px;
    background: transparent;
    width: 100%;

    h1 {
      background: $color;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-size: 40px;
      text-align: center;
      font-weight: 700;
      margin-bottom: 40px;
      margin-top: -10px;
    }

    h3 {
      font-size: 36px;
      text-align: center;
      font-weight: 600;
      margin-bottom: 40px;
      margin-top: -10px;
      color: rgb(87, 87, 87);
    }
    .login_btn {
      width: 100%;
    }
    button {
      height: 40px;
      font-size: 16px;
    }
    .forget {
      width: 100%;
      display: flex;
      text-align: center;
      a {
        width: 100%;
        text-decoration: none;
        color: $color;

        margin: 1px;
      }
    }
    hr {
      border-bottom: 1px;
      border-style: solid;
    }
  }
}
.custom-checkbox {
  color: red; /* 设置文字颜色为红色 */
}
.el-card {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}
</style>
