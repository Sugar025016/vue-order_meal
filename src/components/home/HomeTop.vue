<template>
  <div class="home-top">
    <div class="home-top__card" :span="24" :class="{ 'buyCard-height': true }">
      <div class="home-top__border">
        <div class="home-top__content">
          <span class="home-top__title">餓了就來找美食</span>
          <span class="home-top__span">
            本站所有品相已店內同價，線上定餐免收外送服務費，歡迎線上定餐
          </span>
        </div>
        <div class="home-top__open-shop">
          <el-tooltip
            class="box-item"
            effect="light"
            content="開店"
            placement="top-end"
          >
            <img
              @click="registerShop()"
              src="@/assets/images/open-shop.png"
              class="w-8 h-8 rounded-full"
              loading="lazy"
            />
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const registerShop = () => {};
</script>

<style lang="scss" scoped>
.home-top {
  .home-top__card {
    background: url("@/assets/images/food-home.jpg") no-repeat;
    background-size: cover;
    padding: 5px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
    .home-top__border {
      border-radius: 0 600px;
      border: white 3px solid;
      display: grid; /* 使用CSS Grid布局 */
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 10px;
      padding: 0 5px;

      .home-top__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 0 0 18%;
        color: white;
        .home-top__title {
          display: flex;
          width: auto;
          font-size: clamp(38px, 6vw, 70px);
        }
        .home-top__span {
          display: flex;
          vertical-align: middle;
          margin: 20px 0;
          font-size: clamp(14px, 2vw, 20px);
        }
      }
      .home-top__open-shop {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10%;

        img {
          width: auto; /* Ensure image does not exceed container width */
          height: auto; /* Ensure image does not exceed container height */
          max-width: 75%;
          max-height: 75%;
          min-width: 200px;
          min-height: 200px;
        }

        img:hover {
          animation: shake 0.5s ease-in-out infinite; /* 添加摇动动画 */
        }

        @keyframes shake {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25%,
          75% {
            transform: rotate(-8deg);
          }
          50% {
            transform: rotate(18deg);
          }
        }
      }

      @include respond(sm) {
        grid-template-columns: repeat(1, 1fr);
        border-radius: 0 30%;
        grid-gap: 0;
        .home-top__content {
          padding: 30px calc(20% - 80px) 0 calc(20% - 80px);
        }
        .home-top__open-shop {
          padding: 0 10%;
        }
      }

      // @media (max-width: $breakpoint-sm) {
      //   grid-template-columns: repeat(1, 1fr);
      //   border-radius: 0 200px;
      //   grid-gap: 0;
      //   .home-top__content {
      //     padding: 30px calc(20% - 80px) 0 calc(20% - 80px);
      //   }
      //   .home-top__open-shop {
      //     padding: 0 20px;
      //   }
      // }
    }
  }
}
</style>
