/* *@description:房产交易组件 *@author: 何明明 *@date: 2022-05-13 */
<template>
  <div class="box">
    <!-- 照片 -->
    <img :src="picture" class="box--img" />
    <!-- 小区名字，地区，平方价格 -->
    <div class="box__info">
      <!-- 地区和小区名称 -->
      <div class="box__info__left">
        <div class="box__info__left__top">
          <div class="box__info__left__top--title">
            {{ title }}
          </div>

          <tag
            plain
            color="#C6C6C6FF"
            text-color="#AAAAAAFF"
            round
            class="box__info__left__top--tag"
          >
            {{ '超大豪宅' }}</tag
          >
        </div>

        <div class="box__info__left__add">
          <LocationOutline class="box__info__left__add--icon" />
          <div class="box__info__left__add--address">{{ address }}</div>
        </div>
      </div>

      <div class="box__info__right">
        <div class="box__info__right--price">{{ price }}</div>
        <div class="box__info__right--dw">{{ '元/㎡' }}</div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { LocationOutline } from '@vicons/ionicons5'
import { Tag } from 'vant'
defineProps({
  picture: String,
  address: String,
  title: String,
  price: Number,
  dw: String,
})
</script>
<style lang="scss" scoped>
.box {
  background-color: #fff;
  box-shadow: 0 0 7px 5px rgb(225, 223, 223);
  margin: 12px;
  display: flex;
  &--img {
    margin-right: 17px;
    width: 104px;
    height: 92px;
  }
  &__info {
    width: 42%;
    display: flex;
    &__left {
      &__top {
        // display: flex;
        margin-top: 9px;
        &--title {
          font-size: 15px;
          font-weight: bold;
          color: #333333;
          line-height: 26px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        &--tag {
          margin-left: 0px;
          font-size: 9px;
          font-weight: 500;
          color: #aaaaaa;
          line-height: 18px;
          padding: 0.5px 6px;
          background: rgb(255, 255, 255);
        }
      }
      &__add {
        display: flex;
        margin-top: 9px;
        &--icon {
          width: 12px;
          height: 14px;
          margin-right: 2px;
          margin-bottom: 10px;
          // border: 1px solid #000;
          color: #888888ff;
        }
        &--address {
          font-size: 14px;
          font-family: PingFang;
          font-weight: 500;
          color: #888888;
          line-height: 24px;
        }
      }
    }
    &__right {
      display: block;
      margin-left: 30px;
      position: fixed;
      right: 20px;
      &--price {
        font-size: 21px;
        font-family: PingFang;
        font-weight: bold;
        color: #dc3333;
        line-height: 24px;
        margin-top: 20px;
        margin-bottom: 16px;
      }
      &--dw {
        font-size: 12px;
        font-family: PingFang;
        font-weight: 400;
        color: #888888;
        line-height: 24px;
        margin-left: 31px;
      }
    }
  }
}
</style>
