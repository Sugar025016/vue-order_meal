<template>
  <div class="verify-view__overlay">
    <div class="verify-view__card">
      <div v-if="errorMsg" class="verify-view__error">{{ errorMsg }}</div>
      <div class="verify-view__header">
        <img src="@/assets/images/otp.png" class="verify-view__image" />
        <h2>驗證您的電子郵件地址</h2>
        <p>驗證碼已經寄到妳的電子郵，請輸入 6 位數驗證碼。</p>
      </div>

      <!-- OTP Inputs -->
      <div class="verify-view__input-group">
        <input
          v-for="(digit, index) in otpDigits"
          :key="index"
          ref="otpRefs"
          maxlength="1"
          class="verify-view__input"
          v-model="otpDigits[index]"
          @input="onInput(index)"
          @keydown.backspace="onBackspace(index, $event)"
        />
      </div>

      <!-- Verify Button -->
      <button class="verify-view__btn" @click="verifyOtp" :disabled="loadingVerify">
        {{ loadingVerify ? "驗證中…" : "驗證電子郵件" }}
      </button>

      <!-- Resend -->
      <div class="verify-view__resend">
        <button
          :disabled="resendTimer > 0 || loadingResend"
          @click="resendOtp()"
        >
          <span v-if="loadingResend">寄送中…</span>
          <span v-else>
            重新發送驗證碼
            <span v-if="resendTimer > 0">({{ resendTimer }}s)</span>
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const loadingVerify = ref(false);
const loadingResend = ref(false);

const router = useRouter();
const authStore = useAuthStore();

const otpDigits = ref(["", "", "", "", "", ""]);
const otpRefs = ref([]);

const resendTimer = ref(0);

const emit = defineEmits(["close"]);
const errorMsg = ref("");

// 輸入後跳下一格
const onInput = (index) => {
  if (loadingResend.value) {
    errorMsg.value = "驗證碼發送中，請等待.....";
    otpDigits.value = ["", "", "", "", "", ""];
    return;
  }
  if (resendTimer.value <= 0) {
    errorMsg.value = "驗證碼已過期，請重新發送";
    otpDigits.value = ["", "", "", "", "", ""];
    return;
  }
  // 使用者一輸入新的數字，就清除錯誤訊息
  errorMsg.value = "";
  if (otpDigits.value[index].length === 1 && index < 5) {
    otpRefs.value[index + 1].focus();
  }
};

// Backspace 回上一格
const onBackspace = (index, event) => {
  if (event.key === "Backspace" && index > 0 && otpDigits.value[index] === "") {
    otpRefs.value[index - 1].focus();
  }
};

// 驗證 OTP
const verifyOtp = async () => {
  if (loadingVerify.value) return; // 防止重複送出

  const otp = otpDigits.value.join("");

  if (resendTimer.value <= 0) {
    errorMsg.value = "驗證碼已過期，請重新發送";
    otpDigits.value = ["", "", "", "", "", ""];
    return;
  }

  if (otp.length !== 6) {
    errorMsg.value = "請輸入完整的 6 位數驗證碼";
    return;
  }

  loadingVerify.value = true;

  const ok = await authStore.verifyOtp(otp).finally(() => {
    loadingVerify.value = false;
  });

  if (!ok) {
    errorMsg.value = "驗證碼錯誤，請重新輸入";

    otpDigits.value = ["", "", "", "", "", ""];
    otpRefs.value[0].focus();
    return;
  }

  errorMsg.value = "";
  router.push("/home");
};

// 重送 OTP
const resendOtp = async () => {
  if (loadingResend.value) return;

  loadingResend.value = true;

  otpDigits.value = ["", "", "", "", "", ""];
  await authStore.sendOtp().finally(() => {
    loadingResend.value = false;
  });

  errorMsg.value = "";
  alert("已重新寄送驗證碼");
  startTimer();
};

// 送 OTP
const sendOtp = async () => {
  loadingResend.value = true;

  otpDigits.value = ["", "", "", "", "", ""];
  // await authStore.sendOtp().finally(() => {
  //   loadingResend.value = false;
  // });
  await authStore.sendOtp();
  loadingResend.value = false;
  alert("已寄送驗證碼");
  startTimer();
};

// 倒數 60 秒
const startTimer = () => {
  resendTimer.value = 60 * 5;
  // resendTimer.value = 6;

  const timer = setInterval(() => {
    resendTimer.value--;
    if (resendTimer.value <= 0) clearInterval(timer);
  }, 1000);
};

onMounted(() => {
  if (!authStore.email) {
    console.log("authStore.email.value : ", authStore.email);
    router.push("/login"); // 在組件內導向
    return;
  } else {
    sendOtp();
  }
});
</script>

<style scoped>
.verify-view__error {
  color: red;
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
}
/* 背景遮罩 */
.verify-view__overlay {
  display: flex;
  flex: 1;
  background-color: #feefdb;
}

/* 主卡片 */
.verify-view__card {
  margin: auto;
  background: #fff;
  width: 400px;
  padding: 32px;
  border-radius: 20px;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* 關閉按鈕 */
.verify-view__close {
  position: absolute;
  right: 16px;
  top: 16px;
  border: none;
  background: none;
  font-size: 20px;
  cursor: pointer;
  opacity: 0.5;
}
.verify-view__close:hover {
  opacity: 1;
}

/* 標題區域 */
.verify-view__header h2 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
}
.verify-view__header p {
  font-size: 13px;
  color: #777;
  margin-bottom: 20px;
}
.verify-view__image {
  width: 200px;
  /* margin-bottom: 10px; */
}

/* OTP Input */
.verify-view__input-group {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.verify-view__input {
  width: 50px;
  height: 58px;
  border: 1px solid #ddd;
  border-radius: 10px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  outline: none;
  transition: 0.2s;
}

.verify-view__input:focus {
  border-color: #ffa629;
  box-shadow: 0 0 0 2px rgba(255, 166, 41, 0.3);
}

/* 按鈕 */
.verify-view__btn {
  width: 100%;
  padding: 12px;
  background: #ff9f2f;
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;
}
.verify-view__btn:hover {
  background: #ff8b00;
}

/* Resend */
.verify-view__resend {
  margin-top: 12px;
}

.verify-view__resend button {
  border: none;
  background: none;
  font-size: 14px;
  color: #777;
  cursor: pointer;
  text-decoration: none;
}

.verify-view__resend button:hover {
  color: #000;
}

.verify-view__resend button:disabled {
  color: #bbb;
  cursor: not-allowed;
}
</style>
