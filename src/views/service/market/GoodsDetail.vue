/* *@description:跳蚤市场--商品详情页 *@author: 何明明 *@date: 2022-05-16 */
<template>
  <div>
    <WdNavbar title="商品详情" />
    <div v-if="JSON.stringify(items) != '{}'" class="box">
      <div class="box__n1">
        <!-- 头像区域 -->
        <div class="box__n1__autor">
          <img :src="items.avatar" class="box__n1__autor--img" />
          <div class="box__n1__autor__info">
            <div class="box__n1__autor__info--title">{{ items.username }}</div>
            <div class="box__n1__autor__info--content">
              地址:{{ items.fleaMarketGoods.address }}
            </div>
          </div>
        </div>
        <!-- 商品介绍 -->
        <div class="box__n1__des">
          <div class="box__n1__des--title">{{ items.fleaMarketGoods.name }}</div>
          <div class="box__n1__des--content">{{ items.fleaMarketGoods.content }}</div>
          <img :src="items.fleaMarketGoods.thumbnail" class="box__n1__des--img" />
        </div>
      </div>
    </div>
    <HmmXy :id="id" wz="想要" class="box__n2" />
  </div>
</template>
<script setup>
import { ref } from 'vue'
import HmmXy from '@/components/HmmXy.vue'
import WdNavbar from '@/components/WdNavbar.vue'
import { get, api3 } from '@/utils/request'
import { useRoute } from 'vue-router'
const items = ref({})
const route = useRoute()
const id = route.params.id
const getDetailData = () => {
  let url = api3 + '/fleaMarket/' + id
  get(url).then((result) => {
    items.value = result
  })
}
getDetailData()
</script>
<style lang="scss" scoped>
.box {
  background-color: #f3f4f5;
  display: flex;
  justify-content: center;
  border: 1px solid #f3f4f5;
  &__n1 {
    background: #ffffff;
    width: 391px;
    height: 558px;
    margin-top: 11px;
    &__autor {
      margin-top: 14px;
      display: flex;
      margin-left: 17px;
      margin-right: 17px;
      &--img {
        width: 41px;
        margin-right: 11px;
        display: flex;
      }
      &__info {
        &--title {
          font-size: 16px;
          font-family: PingFang;
          font-weight: bold;
          color: #333333;
          line-height: 20px;
        }
        &--content {
          font-size: 13px;
          font-family: PingFang;
          font-weight: 400;
          color: #aaaaaa;
          line-height: 20px;
        }
      }
    }
    &__des {
      display: flex;
      flex-direction: column;
      align-items: start;
      margin-left: 15px;
      margin-top: 20px;
      &--title {
        font-size: 18px;
        font-family: PingFang;
        font-weight: bold;
        color: #333333;
        line-height: 23px;
      }
      &--content {
        margin-top: 12px;
        font-size: 16px;
        font-family: PingFang;
        font-weight: 400;
        color: $c8;
        line-height: 23px;
      }
      &--img {
        margin-top: 20px;
        width: 357px;
        height: 357px;
      }
    }
  }
  &__n2 {
    height: 50px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 0;
  }
}
</style>
