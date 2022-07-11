/* *@description:商品购物信息组件 *@author: 王浩南 *@date: 2022-05-15 */ >
<template>
  <div class="container" @click="$emit('change')">
    <img :src="url" alt="" class="container--img" />
    <div class="info">
      <div class="info__left">
        <div class="info__left--title">{{ name }}</div>
        <div class="info__left--shopNum">月销售{{ sales }}</div>
        <div class="info__left--send">
          <span>起送¥{{ minprice }}</span>
          <span>配送{{ shipping }}</span>
        </div>
      </div>
      <div class="info__right">
        <div class="info__right--status">{{ status ? '营业中' : '暂停营业' }}</div>
        <div class="info__right--distance">
          <span>{{ distance }}KM</span>
          <span>{{ time }}分钟</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  url: String,
  name: String,
  sales: Number,
  shipping: { type: Number, default: 5 },
  minprice: { type: Number, default: 20 },
  distance: { type: Number, default: 5.3 },
  time: { type: Number, default: 30 },
  status: Number,
})
defineEmits(['change'])
</script>
<style lang="scss" scoped>
@use '@/styles/mixin' as m;
.container {
  border-radius: 5px;
  box-shadow: 0 2px 2px #88888843;
  margin: 0px 10px 10px 10px;
  display: flex;
  background-color: $cf;
  // border-bottom: 1px solid rgba(51, 51, 51, 0.488);
  height: 87px;
  &--img {
    width: 87px;
    height: 87px;
    border-radius: 5px;
  }
  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex: 1;
    &__left {
      margin-left: 11px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      &--title {
        // margin-top: 3px;
        font-size: 17px;
        font-weight: bold;
        color: #333333;
      }
      &--shopNum {
        margin: 5px 0px;
        font-size: 13px;
        font-weight: 500;
        color: $c8;
      }
      &--send {
        font-size: 13px;
        font-weight: 500;
        color: $c8;
        span {
          margin-right: 20px;
        }
      }
    }
    &__right {
      margin-right: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: end;
      &--status {
        border: 1px solid $wd-primary;
        border-radius: 17px;
        font-size: 12px;
        padding: 3px 12px;
        line-height: 12px;
      }
      &--distance {
        margin-top: 10px;
        font-size: 13px;
        font-weight: 500;
        color: $c8;
        span {
          margin: 0px 7px;
        }
      }
    }
  }
}
</style>
