/* *@description:热门推荐组件 *@author: 何明明 *@date: 2022-05-13 */
<template>
  <div class="box">
    <!-- 照片 -->
    <div class="box--img" :style="'background-image:url(' + picture + ')'">
      <!-- <img :src="picture" /> -->
    </div>
    <!-- 标题，内容，价格 -->
    <div class="box__right">
      <div class="box__right__title">
        <div class="box__right__title--wz">{{ title }}</div>
        <span class="box__right__title--tag">{{ check }}</span>
      </div>
      <div class="box__right--content">{{ content }}</div>
      <div class="box__right__price">
        {{ price }}
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  picture: String,
  title: String,
  content: String,
  price: String,
  check: String,
})
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  margin-bottom: 12px;
  box-shadow: 0 4px 6px 5px rgb(231, 231, 231);
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
  &--img {
    width: 104px;
    height: 101px;
    margin-left: 10px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  &__right {
    width: 80%;
    margin-left: 19px;
    &__title {
      display: flex;
      justify-content: space-between;
      width: 100%;
      overflow: hidden;
      &--wz {
        width: 80%;
        font-size: 14px;
        font-family: PingFang;
        font-weight: bold;
        color: #333333;
        line-height: 26px;
        display: flex;
        margin-bottom: 6px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      &--tag {
        font-size: 12px;
        line-height: 25px;
        color: #1520e9;
        margin-right: 6px;
      }
    }
    &--content {
      display: block;
      font-size: 13px;
      font-family: PingFang;
      font-weight: 500;
      color: $c8;
      line-height: 17px;
      margin-right: 27px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__price {
      margin-left: 180px;
      display: block;
      font-size: 14px;
      font-family: PingFang;
      font-weight: bold;
      color: #dc3333;
      line-height: 24px;
      margin-top: 5px;
    }
  }
}
</style>
