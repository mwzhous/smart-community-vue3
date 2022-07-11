/* *@description:停车位信息组件 *@author: 王浩南 *@date: 2022-05-16 */ >
<template>
  <!-- 盒子 -->
  <div class="box" :class="status ? '':'bg' ">
    <!-- 第一排车位信息 -->
    <div class="box__info" >
      <div class="box__info__address">
        <!-- 车位号 -->
        <span class="box__info__address--num">{{ num }}</span>
        <!-- 停车场位置 -->
        <span class="box__info__address--name"  >{{ parkName }}</span>
      </div>
      <!-- 车牌号 -->
      <span class="box__info--plateNum" :class="status ? '':'expire'">{{ carNumber }}</span>
    </div>
    <!-- 第二排时间信息 -->
    <div class="box__data">
      <!-- 到期时间 -->
      <span class="box__data--time">到期时间 {{ endTime }}</span>
      <!-- 剩余时间 -->
      <span v-if="status" class="box__data--remaining">{{ remaining }} 天到期</span>
      <span v-else class="box__data--remaining fontColor">以到期</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  // 车位号
  num: String,
  // 停车场位置
  parkName: String,
  // 车牌号
  carNumber: String,
  //到期时间
  endTime: String,
})
const remaining = computed(
  () => parseInt((Date.parse(props.endTime) - Date.parse(new Date())) / 1000 / 60 / 60 / 24)
)
const status = computed(() => remaining.value > 0)
</script>
<style lang="scss" scoped>
.box:hover {
  background: rgba(218, 215, 215, 0.385);
}
.box {
  margin-bottom: 10px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 3px 5px rgba(51, 51, 51, 0.24);
  padding: 21px 13px 23px 13px;
  &__info {
    display: flex;
    justify-content: space-between;
    &__address {
      &--num {
        font-size: 21px;
        line-height: 21px;
        font-weight: bold;
        color: #444444;
      }
      &--name {
        font-size: 14px;
        font-weight: 500;
        color: #666666;
        line-height: 14px;
      }
    }
    &--plateNum {
      background: linear-gradient(90deg, #fa8e07, #f17716);
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 13px;
      font-weight: bold;
      color: #ffffff;
      line-height: 13px;
    }
  }
  &__data {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    &--time {
      font-size: 13px;
      font-weight: 500;
      color: #aaaaaa;
      line-height: 13px;
    }
    &--remaining {
      font-size: 13px;
      font-weight: bold;
      color: #f67e00;
    }
  }
}
.bg{
  background: #E3E3E3;;
}
.expire{
  background: #fff;
  color: #888888;
}
.fontColor{
  color: #666666;
}
</style>
