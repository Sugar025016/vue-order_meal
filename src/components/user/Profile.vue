<template>
  <div class="profile">
    <div class="profile__context">
      <h1>個人資料</h1>

      <div class="profile__row">
        <span class="profile__label">帳號-E-mail：</span>
        <span class="profile__value">{{ userStore.user?.email }}</span>
        <!-- <el-link type="primary" class="profile__action" :underline="false">
          變更密碼
        </el-link> -->
        <PwdChangeDialog class="profile__action"></PwdChangeDialog>
      </div>

      <div class="profile__row">
        <span class="profile__label">名稱：</span>
        <span class="profile__value">{{ userStore.user?.name }}</span>
        <RenameDialog class="profile__action"></RenameDialog>
        <!-- <el-link type="primary" class="profile__action" :underline="false">
          更改名稱
        </el-link> -->
      </div>

      <div class="profile__row">
        <span class="profile__label">手機：</span>
        <span class="profile__value">{{ userStore.user?.phone }}</span>
        <el-button class="profile__action" round type="danger" plain>
          驗證手機號碼
        </el-button>
      </div>

      <div class="profile__row">
        <span class="profile__label">LINE Notify：</span>
        <span class="profile__value">BBBBB</span>
        <el-button class="profile__action" round type="primary" plain>
          連結Line Notify
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import PwdChangeDialog from "@/components/user/PwdChangeDialog.vue";
import RenameDialog from "@/components/user/RenameDialog.vue";
let userStore = useUserStore();
</script>
<style lang="scss" scoped>
.profile {
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 400px);

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: antiquewhite;

  &__context {
    width: 100%;
    max-width: 600px;
    background: #fffbfb;
    border-radius: 12px;
    padding: 24px 28px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);

    h1 {
      font-size: 22px;
      margin-bottom: 24px;
      font-weight: 600;
      color: #333;
    }

    .profile__row {
      display: flex;
      align-items: center;
      margin-bottom: 18px;
      font-size: 16px;

      .profile__label {
        width: 120px;
        font-weight: 500;
        color: #555;
      }

      .profile__value {
        color: #333;
      }

      .profile__action {
        margin-left: 12px;
        font-size: 14px;
        // padding: 4px 14px;
      }
    }
  }
}
</style>
