/* *@description:物业缴费页面 *@author: 龚俊溢、陈旺 *@date: 2022-05-13 */
<template>
  <div class="page">
    <WdNavbar title="物业缴费" bg-color="transparent" :ph="false" color="#fff" />
    <div class="bg">
      <p class="money">{{ isshow.all }}</p>
      <p class="charge">代缴余额 (元)</p>
      <div class="pain">
        <div class="words" @click="ck">一键缴费</div>
      </div>
    </div>

    <div v-for="(item, index) in isshow.list" :key="index" class="bg1">
      <div class="order">
        <p class="words1">订单编号：{{ item.id }}</p>
      </div>
      <p v-if="item.createTime.substring(5, 7) == 0" class="words2">
        {{ item.createTime.substring(5, 7) }}月物业费
      </p>
      <p v-else class="words2">{{ item.createTime.substring(6, 7) }}月物业费</p>
      <p class="words3">￥{{ item.billAccount }}</p>
      <div v-if="item.status == 0">
        <p class="words4" :class="statusPay ? 'words6' : ''">
          {{ statusPay ? '已支付' : '立即支付' }}
        </p>
      </div>
      <p v-else class="words5">已支付</p>
    </div>
  </div>
</template>

<script setup>
import { get, api6 } from '@/utils/request.js'
import { reactive, ref } from 'vue'
import WdNavbar from '@/components/WdNavbar.vue'
import { post } from '../../../utils/request'
const param = ref([])
const isshow = reactive({
  all: 0.0,
  list: [],
})
const result = () => {
  get(api6 + '/household/bill/list', {
    page: 1,
    size: 20,
    communityId: 1,
  }).then((res) => {
    isshow.list = res.records
    for (let i in res.records) {
      if (res.records[i].status == 0) {
        param.value.push(res.records[i].id)
        isshow.all += parseInt(res.records[i].billAccount)
      }
    }
    isshow.all = parseFloat(isshow.all).toFixed(2)
  })
}
result()
const statusPay = ref(false)

// 一键缴费
const ck = () => {
  isshow.all = 0
  isshow.all = parseFloat(isshow.all).toFixed(2)
  statusPay.value = true
  post(api6 + '/household/bill/payment', param.value).then((res) => {
    // console.log(res)
  })
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #f1f2f4;
  width: 414px;
  height: 100%;
  padding-bottom: 20px;
  text-align: center;
}
.bg {
  position: relative;
  background-image: url('/src/assets/images/property_payment.png');
  background-size: 100% 100%;
  height: 265px;
}
.bg1 {
  position: relative;
  width: 374px;
  height: 92px;
  background: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 5px;
  top: 10px;
  right: 10px;
  margin: 30px 0 0 30px;
}
.bg2 {
  position: absolute;
  width: 86px;
  height: 35px;
  background: #ededed;
  border: 1px solid #d8d8d8;
  border-radius: 6px;
  right: 17px;
  bottom: 14px;
}
.bg3 {
  position: absolute;
  width: 374px;
  height: 92px;
  background: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 5px;
  top: 407px;
  right: 20px;
}
.left {
  position: relative;
  width: 18px;
  height: 16px;
  bottom: 235px;
  left: 23px;
}
.money {
  height: 39px;

  font-size: 52px;
  font-family: PingFang;
  font-weight: bold;
  color: #ffffff;
  margin: auto;
  padding-top: 65px;
}
.charge {
  width: 110px;
  height: 16px;
  font-size: 17px;
  font-family: PingFang;
  font-weight: 400;
  color: #ffffff;
  margin: auto;
  padding-top: 75px;
  padding-left: -1px;
}
.pain {
  position: absolute;
  width: 190px;
  height: 49px;
  background: linear-gradient(0deg, #fa8e07, #f17716);
  border: 1px solid #ffffff;
  border-radius: 24px;
  left: 118px;
  bottom: -3px;
}

.words {
  width: 90px;
  height: 20px;
  font-size: 21px;
  font-family: PingFang;
  font-weight: bold;
  color: #ffffff;
  margin: auto;
  padding-top: 8px;
}
.words1 {
  position: absolute;
  width: 145px;
  height: 12px;
  font-size: 13px;
  font-family: PingFang;
  font-weight: 400;
  color: #666666;
  line-height: 24px;
  bottom: 77px;
  right: 16px;
}
.words2 {
  width: 115px;
  height: 16px;
  font-size: 17px;
  font-family: PingFang;
  font-weight: 500;
  color: #444444;
  padding-top: 20px;
  padding-left: 26px;
}
.words3 {
  width: 46px;
  height: 17px;
  font-size: 23px;
  font-family: PingFang;
  font-weight: bold;
  color: #f67e00;
  padding-top: 32px;
  padding-left: 26px;
}
.words4 {
  position: absolute;
  width: 65px;
  height: 15px;
  font-size: 16px;
  font-family: PingFang;
  font-weight: 500;
  color: #666666;
  line-height: 20px;
  right: 12px;
  top: 53px;
}
.words5 {
  position: absolute;
  width: 48px;
  height: 15px;
  font-size: 16px;
  font-family: PingFang;
  font-weight: 500;
  color: #f27914;
  line-height: 20px;
  right: 30px;
  top: 53px;
}
.words6 {
  position: absolute;
  width: 48px;
  height: 15px;
  font-size: 16px;
  font-family: PingFang;
  font-weight: 500;
  color: #f27914;
  line-height: 20px;
  right: 30px;
  top: 53px;
}
.order {
  width: 193px;
  height: 29px;
  background: #e7e7e7;
  border-top: 30px solid transparent;
  border-left: 10px solid #ffffff;
  float: right;
}
</style>
