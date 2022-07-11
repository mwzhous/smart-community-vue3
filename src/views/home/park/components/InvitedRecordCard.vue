/* *@description:贵宾邀请记录信息组件 *@author: 王浩南 *@date: 2022-05-19 */ >
<template>
  <div class="container">
    <div class="info">
      <div class="info__left">
        <span class="info__left--name">{{contact}}</span>
        <span class="info__left--phone">{{phone}}</span>
      </div>
      <span class="info--community">{{communityName}}</span>
    </div>
    <div class="carInfo">
      <span class="carInfo--data">{{startTime}}</span>
      <span class="carInfo--carNum">{{carNumber}}</span>
    </div>
    <span class="remark">{{remark}}</span>
  </div>
</template>
<script setup>
defineProps({
  contact:String,
  phone:String,
  communityName:String,
  carNumber:String,
  startTime:String,
  remark:String
})
</script>
<style lang="scss" scoped>
@use '@/styles/mixin' as m;
.container {
  overflow: hidden;
  margin: 10px 0;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 5px 3px rgba(51, 51, 51, 0.226);
  display: flex;
  flex-direction: column;
  padding: 14px 11px;
  .info {
    display: flex;
    justify-content: space-between;
    &__left {
      &--name {
        font-size: 18px;
        line-height: 18px;
        color: #333;
        font-weight: 600;
        margin-right: 10px;
        @include m.line-text-overflow;
      }
      &--phone {
        font-size: 15px;
        line-height: 15px;
        color: #888;
      }
    }
    &--community {
      font-size: 15px;
      line-height: 15px;
      color: #888;
      @include m.line-text-overflow;
    }
  }
  .carInfo {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    &--data {
      font-size: 15px;
      line-height: 15px;
      color: #888;
    }
    &--carNum {
      font-size: 18px;
      line-height: 18px;
      color: #333;
      font-weight: 600;
    }
  }
  .remark {
    margin-top: 12px;
    font-size: 15px;
    line-height: 15px;
    color: #888;
    @include m.text-overflow;
  }
}
</style>
