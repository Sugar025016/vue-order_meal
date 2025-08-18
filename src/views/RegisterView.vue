<template>
  <div class="login-view">
    <AuthTitle class="login-view_auth-title" />
    <AuthRegisterMemberForm class="login-view_auth-login-form" />
  </div>
</template>

<script setup>
import AuthTitle from "@/components/auth/AuthTitle.vue";
import AuthRegisterMemberForm from "@/components/auth/AuthRegisterMemberForm.vue";
</script>

<style lang="scss" scoped>
.login-view {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  max-width: 1000px;
  margin: auto;


  @include respond(md) {
    display: flex;
    flex-direction: column; // 每個區塊垂直排列
  }
  > * {
    flex: 1 1; // 子元件各佔一半左右

    @include respond(md) {
      // 當螢幕小於 md
      flex: none;
    }
  }
}
</style>
