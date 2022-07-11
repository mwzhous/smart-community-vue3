/* *@description:社区活动 *@author: 龚俊溢 *@date: 2022-05-14 */
<template>
  <div class="wrapper">
    <WdNavbar :show-slot="true" title="社区活动" icon-url="" :on-click-right="onClickRight" />

    <div v-for="(item, index) in isshow.list" :key="index" class="cont">
      <img class="pic" :src="item.activeImg" alt="" />
      <div class="text">{{ item.activeTitle }}</div>
      <p class="words">{{ item.activeTitle }}</p>
      <p class="words1">活动时间</p>
      <p class="words2">{{ item.startTime }}~{{ item.endTime }}</p>
    </div>
  </div>
</template>

<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import { get, api6 } from '@/utils/request.js'
import { reactive } from 'vue'
const isshow = reactive({
  list: [],
})
const onClickRight = () => {}
const result = () => {
  get(api6 + '/household/active/list').then((res) => {
    isshow.list = res
  })
}
result()
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #f1f2f4;
  width: 414px;
  height: 100%;
  padding-bottom: 15px;
}
.cont {
  position: relative;
  width: 391px;
  height: 339px;
  background: #ffffff;
  border-radius: 6px;
  // left: 12px;
  // top: 15px;
  margin: 10px 0 0 10px;
  box-shadow: 5px 5px 10px #e5e1e1;
}
.pic {
  position: absolute;
  width: 391px;
  height: 250px;
  border: 6px 6px 0px 0px;
}
.text {
  position: absolute;
  color: #333333;
  font-size: 10px;
  font-family: PingFang;
  font-weight: bold;
}
.words {
  position: absolute;
  font-size: 18px;
  font-family: PingFang;
  font-weight: bold;
  word-break: break-all;
  color: #333333;
  line-height: 20px;
  left: 12px;
  top: 270px;
}
.words1 {
  position: absolute;
  font-size: 16px;
  font-family: PingFang;
  font-weight: 500;
  color: #888888;
  line-height: 20px;
  left: 12px;
  top: 310px;
}
.words2 {
  position: absolute;
  font-size: 12px;
  font-family: PingFang;
  font-weight: 500;
  color: #888888;
  line-height: 26px;
  top: 310px;
  left: 130px;
}
</style>
