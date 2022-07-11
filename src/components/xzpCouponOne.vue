<template>
  <div class="couponsone">
    <div v-for="(item, index) in isshow.lists" :key="index" class="couponone">
      <div class="couponone__item">
        <div class="couponone__item__left">
          <span style="font-size: 23px">￥</span>
          <span style="font-size: 40px">{{ item.money }}</span>
          <span style="font-size: 14px; display: block">{{ item.purpose }}</span>
        </div>
        <div class="couponone__item__right">
          <span style="font-size: 13px; color: #f67e00; position: absolute; top: 12px; right: 30px"
            >{{
              parseInt(item.endTime.slice(8, 10)) - parseInt(item.startTime.slice(8, 10))
            }}天到期</span
          >
          <span style="display: inline-block; font-size: 26px; color: #f67e00; height: 45px">{{
            item.name
          }}</span>
          <br />
          <span style="font-size: 13px; color: #666"
            >{{ item.startTime.slice(0, 10) }}至{{ item.endTime.slice(0, 10) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { get, api1 } from '@/utils/request.js'
import { reactive } from 'vue'
const isshow = reactive({
  lists: [],
})

get(api1 + '/personal/coupon', { isExpired: 'true' }).then((res) => {
  isshow.lists = res
})
</script>

<style lang="scss" scoped>
.couponsone {
  width: 374px;
}
.couponone {
  width: 374px;
  height: 103px;
  background-image: url('https://xzpsjc11.oss-cn-hangzhou.aliyuncs.com/upload/bg_youhuiquan.png');
  background-size: 374px 103px;
  &__item {
    margin-left: 5px;
    &__left {
      display: inline-block;
      float: left;
      width: 121px;
      height: 96px;
      padding-top: 13px;
      padding-left: 20px;
      color: #eee;
    }
    &__right {
      position: relative;
      display: inline-block;
      padding-left: 29px;
      padding-top: 12px;
      float: left;
      width: 242px;
      height: 96px;
    }
  }
}
</style>
