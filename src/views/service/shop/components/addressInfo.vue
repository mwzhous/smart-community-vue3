/* *@description: 收货地址卡片 *@author: 王浩南 *@date: 2022-05-15 */
<template>
  <div class="box">
    <!-- 头像 -->
    <img class="box--avatar" :src="avatar" />
    <!-- 姓名电话等信息 -->
    <div class="box__info">
      <!-- 姓名 -->
      <div class="box__info__nameNum">
        <div class="box__info__nameNum--name">{{ name }}</div>
        <!-- 电话 -->
        <div class="box__info__nameNum--num">{{ phone }}</div>
        <!-- 默认地址显示框 -->
        <div v-if="status" class="box__info__nameNum--default">默认</div>
      </div>
      <!-- 地址信息 -->
      <div class="box__info__address">{{ address }}</div>
    </div>
    <!-- 右侧箭头 -->
    <img class="box--detail" src="@/assets/whn/back_top.png" />
  </div>
</template>
<script setup>
defineProps({
  status: {
    type: Boolean,
    default: false,
  },
  name: String,
  address: String,
  phone: String,
  avatar: String,
})
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: row;
  padding: 20px 26px;
  border-bottom: 2px solid #aaaaaa29;
  height: 75px;
  background: $cf;
  &--avatar {
    width: 41px;
    height: 41px;
    margin-right: 11px;
    border-radius: 50%;
  }
  &__info {
    display: flex;
    flex-direction: column;
    padding: 11px 5px;
    width: 80%;
    &__nameNum {
      display: flex;
      flex-direction: row;
      &--name {
        color: #333333;
        font-weight: 500;
        margin-right: 13px;
        font-size: 16px;
        line-height: 20px;
      }
      &--num {
        font-size: 13px;
        font-weight: 400;
        color: #aaa;
        line-height: 20px;
        padding-right: 13px;
      }
      &--default {
        padding: 0 10px;
        border: 2px solid $wd-primary;
        border-radius: 30px;
        font-size: 12px;
        color: $wd-primary;
      }
    }
    &__address {
      font-size: 13px;
      font-weight: 400;
      color: $c4;
      line-height: 17px;
    }
  }
  &--detail {
    transform: rotate(180deg);
    height: 18px;
  }
}
.box:hover{
  background: $ce8;
}
</style>
