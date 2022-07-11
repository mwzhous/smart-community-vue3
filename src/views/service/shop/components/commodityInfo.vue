/**@description:商品信息组件 *@author: 王浩南 *@date: 2022-05-15 */
<template>
  <div class="container">
    <img :src="url" alt="" class="container--img" />
    <div class="info">
      <div class="info__left">
        <div class="info__left--title">{{ name }}</div>
        <div class="info__left--shopNum">月销售{{ sales }}</div>
        <div class="info__left--price">
          <span style="color: red">{{ price }}</span>
          <span>{{ unit }}</span>
        </div>
      </div>
      <div class="info__right">
        <div class="info__right--surplus">库存{{ repertory }}</div>
        <div class="info__right--controller">
          <img src="@/assets/whn/icon_jianshao.png" alt="" @click="$emit('sub')" />
          <span>{{ counter }}</span>
          <img src="@/assets/whn/icon_shangjia.png" alt="" @click="$emit('add')" />
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
  unit: { type: String, default: '¥' },
  price: Number,
  repertory: { type: Number, default: 200 },
  counter: { type: Number, default: 0 },
})
defineEmits(['sub', 'add'])
</script>
<style lang="scss" scoped>
@use '@/styles/mixin' as m;
.container {
  margin-bottom: 10px;
  display: flex;
  background-color: #fff;
  // border-bottom: 1px solid rgba(51, 51, 51, 0.488);
  height: 87px;
  &--img {
    width: 87px;
    height: 87px;
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
        color: #888888;
      }
      &--price {
        font-size: 16px;
        font-weight: 500;
        color: #dc3333;
      }
    }
    &__right {
      margin-right: 12px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: end;
      &--surplus {
        font-size: 13px;
        font-weight: 500;
        color: #888888;
      }
      &--controller {
        margin-top: 30px;
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-between;
        span {
          margin: 0px 14px;
        }
        img {
          width: 21px;
          height: 21px;
        }
      }
    }
  }
}
</style>
