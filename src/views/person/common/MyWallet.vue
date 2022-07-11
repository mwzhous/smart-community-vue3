<template>
  <div class="all">
    <WdNavbar title="我的钱包" bg-color="transparent" color="white" :fix="false" />
    <div class="wallet">
      <div class="wallet__num">
        <p class="num">{{ isshow.balance }}</p>
        <p class="font">账户余额（元）</p>
      </div>
      <div class="wallet__option">
        <witem />
      </div>
    </div>
  </div>
</template>
<script setup>
import witem from '@/components/xzpWalletCard.vue'
import { get, api1 } from '@/utils/request.js'
import { reactive } from 'vue'
import WdNavbar from '@/components/WdNavbar.vue'
const isshow = reactive({
  balance: 0,
})

get(api1 + '/personal/purse').then((res) => {
  isshow.balance = res.totalMoney
})
</script>
<style lang="scss" scoped>
.all {
  width: 100%;
  height: 100vh;
  background-color: #f3f4f6;
}
.wallet {
  margin-top: -44px;
  width: 100%;
  height: 265px;
  background-image: url('@/assets/img/bg_wodeqianbao.png');
  background-size: 100% 100%;
  padding-top: 63px;
  &__num {
    display: flex;
    flex-direction: column;
    align-items: center;
    .num {
      font-size: 52px;
      color: #fff;
      margin-bottom: 27px;
    }
    .font {
      font-size: 17px;
      color: #fff;
    }
  }
  &__option {
    margin-top: 49px;
  }
}
</style>
