<template>
  <div class="all">
    <WdNavbar title="积分" bg-color="transparent" color="white" :fix="false" />
    <div class="wallet">
      <div class="wallet__num">
        <div class="num">{{ isshow.integral }}</div>
        <div class="font">我的积分</div>
      </div>
    </div>
    <div class="option">
      <jitem />
    </div>
  </div>
</template>
<script setup>
import jitem from '@/components/xzpIntegralCard.vue'
import { get, api1 } from '@/utils/request.js'
import { reactive } from 'vue'
import WdNavbar from '@/components/WdNavbar.vue'
const isshow = reactive({
  integral: 0,
})

get(api1 + '/personal/integration').then((res) => {
  isshow.integral = res.totalIntegration
})
</script>
<style lang="scss" scoped>
.all {
  width: 100%;
  background-color: #f3f4f6;
}
.wallet {
  margin-top: -44px;
  width: 100%;
  height: 265px;
  background-image: url('@/assets/img/bg_jifen.png');
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
}
.option {
  margin-top: -55px;
  padding-bottom: 20px;
}
</style>
