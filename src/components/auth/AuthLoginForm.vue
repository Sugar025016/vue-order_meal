<template>
  <div class="auth-login-form">
    <el-card class="auth-login-form__card">
      <h3>會員登入</h3>

      <el-form label-position="top" ref="loginForms">
        <el-form-item prop="email" label="帳號(信箱)：">
          <el-input
            clearable
            :prefix-icon="User"
            v-model="loginForm.email"
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
        <!-- <el-form-item
          label="驗證碼："
          prop="verifyCode"
          class="custom-form-item"
        >
          <Captcha ref="captchaRef"></Captcha>
        </el-form-item> -->
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
        <el-button
          class="auth-login-form__login-btn"
          type="primary"
          size="default"
          @click="handleLogin"
          round
        >
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
import Captcha from "@/components/captcha/Captcha.vue";

import { reactive, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useUserStore } from "@/stores/user";
import { LoginRequest } from "@/types/auth";
import { useRouter } from "vue-router";
// import router from "@/router";
let $router = useRouter();
const authStore = useAuthStore();
const userStore = useUserStore();
const loginForm = reactive({
  email: "ruby028016@gmail.com",
  password: "password",
  verifyCode: "",
  rememberMe: true,
});

const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref<string | null>(null);

const handleLogin = async () => {
  loading.value = true;
  error.value = null;

  const params: LoginRequest = {
    email: loginForm.email,
    password: loginForm.password,
  };

  try {
    const isLogin = await authStore.login(params);
    if (isLogin) {
      alert(`歡迎回來，${userStore.user?.name}！`);
      $router.push("/");
    } else {
      error.value = "登入失敗，請確認帳號密碼";
    }
  } catch (err: any) {
    error.value = err.response?.data?.message || "登入失敗";
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped>
@use "@/styles/form.scss" as form;

.auth-login-form {
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
  .auth-login-form__card {
    position: relative;
    padding: 10px;
    background: transparent;
    width: 100%;

    h3 {
      font-size: 36px;
      text-align: center;
      font-weight: 600;
      margin-bottom: 40px;
      margin-top: -10px;
      color: rgb(87, 87, 87);
    }
    .auth-login-form__login-btn {
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
</style>
