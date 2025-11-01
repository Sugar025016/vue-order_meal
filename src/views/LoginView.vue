<template>
  <div class="login-view">
    <AuthTitle class="login-view_auth-title" />
    <AuthLoginForm class="login-view_auth-login-form" />
  </div>

</template>

<script setup lang="ts">
import AuthTitle from "@/components/auth/AuthTitle.vue";
import AuthLoginForm from "@/components/auth/AuthLoginForm.vue";




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
<!-- 
<template>
 <div class="">
    <ShopTimeSelect 
      v-model="startTime" 
      placeholder="開始時間" 
      :start="'00:00'" 
      :end="'24:00'" 
      :max-time="endTime"
    />

    <ShopTimeSelect 
      v-model="endTime" 
      placeholder="結束時間" 
      :start="'00:00'" 
      :end="'48:00'" 
      :min-time="startTime"
    />
    {{ startTime }} - {{ endTime }}
  </div>

  <div style="margin-top: 10px;">
    <p>開始：{{ startTime }}</p>
    <p>結束：{{ endTime }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import ShopTimeSelect from "@/components/shop/ShopTimeSelect.vue"

const startTime = ref("")
const endTime = ref("")
console.log("startTime:", startTime)
console.log("endTime:", endTime)

</script>

<style lang="scss" scoped>



</style> -->
