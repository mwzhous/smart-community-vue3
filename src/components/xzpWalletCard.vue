<template>
  <div v-for="(item, index) in isshow.list" :key="index" class="witem">
    <div class="witem__left">
      <div class="witem__left__one">{{ item.purpose }}</div>
      <div class="witem__left__two">{{ item.updateTime }}</div>
    </div>

    <div v-if="parseInt(item.money) > 0" class="witem__right" style="color: #ff7d1d">
      {{ item.money }}
    </div>
    <div v-else class="witem__right" style="color: #727071">{{ item.money }}</div>
  </div>
</template>

<script setup>
import { get, api1 } from '@/utils/request.js'
import { reactive } from 'vue'
const isshow = reactive({
  balance: 0,
  list: [],
})

get(api1 + '/personal/purse').then((res) => {
  isshow.balance = res.totalMoney
  isshow.list = res.purseList
})
</script>

<style lang="scss" scoped>
.witem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 374px;
  height: 78px;
  background-color: #fff;
  border: 0.5px solid #ded;
  border-radius: 5px;
  margin: 12px 0 0 20px;
  &__left {
    margin-left: 23px;
    &__one {
      font-size: 17px;
      color: #111111;
      margin-bottom: 10px;
    }
    &__two {
      font-size: 15px;
      color: #aaaaaa;
    }
  }
  &__right {
    margin-right: 23px;
    font-size: 22px;
  }
}
</style>
