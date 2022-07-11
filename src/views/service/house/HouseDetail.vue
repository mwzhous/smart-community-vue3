/* *@description:房产交易详情 *@author: 何明明 *@date: 2022-05-20 */
<template>
  <div class="box">
    <WdNavbar title="房产详情" />
    <img class="box--img" :src="imgs" />
    <!-- 房产信息 -->
    <div class="box__info">
      <div class="box__info__title">
        {{ items.title }}
      </div>
      <div class="box__info__all">
        <div class="box__info__all--tag">超大豪宅</div>
        <div class="box__info__all--time">一月前发布</div>
      </div>
      <div class="box__info__price">
        参考价格：<span class="box__info__price--jg">{{ items.price }}元/豪宅</span>
      </div>
      <div class="box__info--address">房产地址：{{ items.address }}</div>
      <div class="box__info--company">发布公司：{{ items.company }}</div>
    </div>

    <!-- 房产介绍 -->
    <div class="box__content">
      {{ items.content }}
    </div>
    <HmmXy :id="id" wz="收藏" class="box__lk" />
  </div>
</template>
<script setup>
import HmmXy from '@/components/HmmXy.vue'
import WdNavbar from '@/components/WdNavbar.vue'
import { get, api7 } from '@/utils/request.js'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
const route = useRoute()
const id = route.params.id
const items = ref({})
const imgs = ref()
const getShopData = async () => {
  await get(api7 + '/estate/' + id).then((res) => {
    items.value = res.estateTransaction
    imgs.value = res.estateTransaction.imageUrl
  })
}
getShopData()
</script>
<style lang="scss" scoped>
.box {
  background-color: #f3f4f5;
  &--img {
    width: 414px;
    height: 200px;
    background-color: #fff;
  }
  &__info {
    background-color: #fff;
    margin-top: 10px;
    padding: 20px;
    &__all {
      display: flex;
      &--time {
        margin-left: 200px;
        font-size: 16px;
        font-family: PingFang;
        font-weight: 900;
        color: #8e8c8c;
        line-height: 35px;
      }
      &--tag {
        font-size: 13px;
        font-weight:700;
        color: #8e8c8c;
        line-height: 35px;
      }
    }
    &__title {
      font-size: 20px;
      color: #cf0707;
    }

    &__price {
      font-size: 16px;
      font-family: PingFang;
      line-height: 40px;
      &--jg {
        color: red;
      }
    }
    &--address {
      font-size: 16px;
      font-family: PingFang;
      line-height: 40px;
    }
    &--company {
      font-size: 16px;
      line-height: 40px;
    }
  }
  &__content {
    background-color: #fff;
    margin-top: 15px;
    color: #777575;
    padding: 20px;
    margin-bottom: 12px;
  }
  &__lk {
    position: fixed;
    bottom: 0;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}
</style>
