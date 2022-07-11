/* *@description:停车场信息组件 *@author: 王浩南 *@date: 2022-05-15 */ >
<template>
  <div class="park animate__backInUp">
    <div class="park__num">
      <span class="park__num--title">{{surpule}}</span>
      <span class="park__num--content">剩余车位</span>
    </div>
    <div class="info">
      <div class="content">
        <div class="content__name">
          <span class="content__name--title">{{title}}</span>
          <span class="content__name--distance">{{(distance).toFixed(0)}}千米</span>
        </div>
        <div class="content--total">
          <span>总车位数</span>
          <span>{{total}}</span>
        </div>
      </div>
      <img src="@/assets/whn/icon_dinwei.png" alt="" class="info--icon" @click.stop @click="navigatTo(eword,longitude,latitude)"/>
    </div>
  </div>
</template>
<script setup>
defineProps({
  // 停车场名称
  title:String,
  // 剩余车位数
  surpule:Number,
  // 车位总数
  total:Number,
  // 距离
  distance:Number,
  // 目的地名称
  eword:String,
  // 经度
  longitude:Number,
  // 纬度
  latitude:Number
})
// 导航跳转
const navigatTo=(eword,longitude,latitude)=>{
window.location.href='https://apis.map.qq.com/tools/routeplan/eword='+eword+'&epointx='+longitude+'&epointy='+latitude+'?referer=myapp&key=27VBZ-ZWQCW-BQ7RX-R3JOJ-MJBFV-Y2BPL'
}
</script>
<style lang="scss" scoped>
.park {
  display: flex;
  height: 92px;
  border-radius: 6px;
  background: #fff;
  overflow: hidden;
  margin: 12px;
  box-shadow: 0 3px 5px #3333332e;
  &__num {
    color: #fff;
    width: 104px;
    height: 92px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: linear-gradient(0deg, #28b779, #51c494);
    // border-radius: 6px 0 0 6px;
    &--title {
      font-size: 35px;
      line-height: 35px;
      font-weight: bold;
      margin-bottom: 15px;
    }
    &--content {
      line-height: 14px;
      font-size: 14px;
      font-weight: 500;
    }
  }
  .info {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    .content {
      margin-left: 17px;
      &__name {
        margin-bottom: 16px;
        &--title {
          font-size: 18px;
          font-weight: bold;
          color: #333333;
          line-height: 18px;
          margin-right: 10px;
        }
        &--distance {
          border: 1px solid #aaaaaa;
          border-radius: 12px;
          padding: 3px 14px;
          font-size: 12px;
          font-weight: 500;
          color: #aaaaaa;
          line-height: 12px;
        }
      }
      &--total {
        font-size: 13px;
        font-weight: 500;
        color: $c8;
        line-height: 13px;
        span {
          margin-right: 14px;
        }
      }
    }
    &--icon {
      width: 35px;
      height: 35px;
      margin-right: 16px;
    }
  }
}
</style>
