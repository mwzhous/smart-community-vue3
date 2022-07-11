/* *@description:下单的物品信息组件 *@author: 王浩南 *@date: 2022-05-18 */ >
<template>
  <div class="card1">
    <!-- 左边物品图片及信息 -->
    <div class="card1__info">
      <!-- 物品图标 -->
      <img :src="imgUrl" alt="" class="card1__info--img" />
      <!-- 物品描述 -->
      <div class="card1__info__content">
        <!-- 物品名称 -->
        <span class="card1__info__content--name">{{ imgName }}</span>
        <!-- 物品价格信息 -->
        <div class="card1__info__content__price">
          <!-- 物品价格 -->
          <span class="terms">¥{{ shopPrice }}</span>
          <!-- 物品单位 -->
          <span class="util">/{{ shopUntil }}</span>
        </div>
      </div>
    </div>
    <!-- 物品右边购买信息 -->
    <div class="card1__numInfo">
      <!-- 购买数量 -->
      <span class="card1__numInfo--num">x{{ shopNum }}</span>
      <!-- 物品价格 -->
      <span class="card1__numInfo--price">¥{{ shopPrice }}</span>
    </div>
  </div>
</template>
<script setup>
defineProps({
  imgUrl: String,
  shopNum: Number,
  shopPrice: Number,
  shopName: String,
  imgName: String,
  shopUntil: {
    type: String,
    default: '份',
  },
})
</script>

<style lang="scss" scoped>
.card1 {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 8px 14px;
  &__info {
    display: flex;
    align-items: center;
    &--img {
      width: 61px;
      height: 61px;
      margin-right: 8px;
      border: 1px solid rgba(136, 136, 136, 0.1);
      border-radius: 5px;
    }
    &__content {
      &--name {
        font-size: 17px;
        font-weight: bold;
        color: #333333;
        line-height: 17px;
      }
      &__price {
        margin-top: 10px;
        font-size: 14px;
        font-weight: 500;
        line-height: 14px;
        .terms {
          color: #dc3333;
        }
        .util {
          color: $c8;
        }
      }
    }
  }
  &__numInfo {
    font-size: 13px;
    font-weight: 500;
    color: $c8;
    line-height: 13px;
    &--num {
      margin-right: 10px;
    }
  }
}
</style>
