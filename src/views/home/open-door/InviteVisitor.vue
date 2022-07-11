/* *@description:社区活动 *@author: 徐杰文 *@date: 2022-05-12 */
<template>
  <div class="wrapper">
    <WdNavbar
      :show-slot="true"
      title="访客邀请"
      icon-url="/src/assets/z.png"
      :on-click-right="onClickRight"
    />
  </div>
  <div class="page">
    <div class="text">请选择门锁(多选)</div>
    <div
      class="box1"
      :style="statusPay1 ? 'border: 1px solid #f37c13' : 'border: 1px solid #cccccc'"
      @click="ck1"
    >
      <span class="text1">1</span>
      <span class="text2">东门门禁</span>
      <img
        src="/src/assets/xz.png"
        class="xz"
        :style="statusPay1 ? 'display: fixed' : 'display: none'"
      />
    </div>
    <div
      class="box2"
      :style="statusPay2 ? 'border: 1px solid #f37c13' : 'border: 1px solid #cccccc'"
      @click="ck2"
    >
      <span class="text1">1</span>
      <span class="text2">东门门禁</span>
      <img
        src="/src/assets/xz.png"
        class="xz"
        :style="statusPay2 ? 'display: fixed' : 'display: none'"
      />
    </div>
    <div
      class="box3"
      :style="statusPay3 ? 'border: 1px solid #f37c13' : 'border: 1px solid #cccccc'"
      @click="ck3"
    >
      <span class="text1">1</span>
      <span class="text2">东门门禁</span>
      <img
        src="/src/assets/xz.png"
        class="xz"
        :style="statusPay3 ? 'display: fixed' : 'display: none'"
      />
    </div>
    <div
      class="box4"
      :style="statusPay4 ? 'border: 1px solid #f37c13' : 'border: 1px solid #cccccc'"
      @click="ck4"
    >
      <span class="text1">1</span>
      <span class="text2">东门门禁</span>
      <img
        src="/src/assets/xz.png"
        class="xz"
        :style="statusPay4 ? 'display: fixed' : 'display: none'"
      />
    </div>
    <div
      class="box5"
      :style="statusPay5 ? 'border: 1px solid #f37c13' : 'border: 1px solid #cccccc'"
      @click="ck5"
    >
      <span class="text1">1</span>
      <span class="text2">东门门禁</span>
      <img
        src="/src/assets/xz.png"
        class="xz"
        :style="statusPay5 ? 'display: fixed' : 'display: none'"
      />
    </div>
    <div
      class="box6"
      :style="statusPay6 ? 'border: 1px solid #f37c13' : 'border: 1px solid #cccccc'"
      @click="ck6"
    >
      <span class="text1">1</span>
      <span class="text2">东门门禁</span>
      <img
        src="/src/assets/xz.png"
        class="xz"
        :style="statusPay6 ? 'display: fixed' : 'display: none'"
      />
    </div>

    <div class="sj1">
      <Form>
        <CellGroup inset>
          <Field
            v-model="resultDate"
            class="field-box"
            is-link
            readonly
            name="datetimePicker"
            label="开始时间"
            input-align="right"
            placeholder="请选择"
            @click="showStart = true"
          />
          <Popup v-model:show="showStart" position="bottom">
            <DatetimePicker
              v-model="currentDate"
              type="date"
              title="选择年月日"
              @confirm="confirmStart"
              @cancel="showStart = false"
            />
          </Popup>
        </CellGroup>
      </Form>
    </div>
    <div class="sj2">
      <Form>
        <CellGroup inset>
          <Field
            v-model="resultEnd"
            class="field-box"
            is-link
            readonly
            name="datetimePicker"
            label="结束时间"
            input-align="right"
            placeholder="请选择"
            @click="showEnd = true"
          />
          <Popup v-model:show="showEnd" position="bottom">
            <DatetimePicker
              v-model="currentDate"
              type="date"
              title="选择年月日"
              @confirm="confirmEnd"
              @cancel="showStart = false"
            />
          </Popup>
        </CellGroup>
      </Form>
    </div>
    <!-- <span class="blx">~</span>
    <div class="sj2">结束时间</div> -->
    <div class="xx1">
      <p>访客姓名</p>
      <input type="text" placeholder="请输入姓名" />
    </div>
    <div class="xx2">
      <p>手机号码</p>
      <input type="text" placeholder="请输入手机号" />
    </div>
    <button class="fs">发送邀请</button>
  </div>
</template>
<script setup>
import WdNavbar from '../../../components/WdNavbar.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Form, Field, CellGroup, DatetimePicker, Popup } from 'vant'
const currentDate = ref(new Date(2021, 0, 17))
let resultDate = ref('')
let resultEnd = ref('')
let showStart = ref(false)
let showEnd = ref(false)
const router = useRouter()
const onClickRight = () => {
  router.push({ name: 'InvitedRecords' })
}
const statusPay1 = ref(false)
const statusPay2 = ref(false)
const statusPay3 = ref(false)
const statusPay4 = ref(false)
const statusPay5 = ref(false)
const statusPay6 = ref(false)
const ck1 = () => {
  if (statusPay1.value == true) {
    statusPay1.value = false
  } else {
    statusPay1.value = true
  }
}
const ck2 = () => {
  if (statusPay2.value == true) {
    statusPay2.value = false
  } else {
    statusPay2.value = true
  }
}
const ck3 = () => {
  if (statusPay3.value == true) {
    statusPay3.value = false
  } else {
    statusPay3.value = true
  }
}
const ck4 = () => {
  if (statusPay4.value == true) {
    statusPay4.value = false
  } else {
    statusPay4.value = true
  }
}
const ck5 = () => {
  if (statusPay5.value == true) {
    statusPay5.value = false
  } else {
    statusPay5.value = true
  }
}
const ck6 = () => {
  if (statusPay6.value == true) {
    statusPay6.value = false
  } else {
    statusPay6.value = true
  }
}
const confirmStart = (e) => {
  resultDate.value =
    e.getFullYear() +
    '-' +
    (e.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    e.getDate() +
    ' ' +
    e.getHours().toString().padStart(2, '0') +
    ':' +
    e.getMinutes().toString().padStart(2, '0')
  showStart.value = false
}
const confirmEnd = (e) => {
  resultEnd.value =
    e.getFullYear() +
    '-' +
    (e.getMonth() + 1).toString().padStart(2, '0') +
    '-' +
    e.getDate() +
    ' ' +
    e.getHours().toString().padStart(2, '0') +
    ':' +
    e.getMinutes().toString().padStart(2, '0')
  showEnd.value = false
}
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page {
  width: 414px;
  height: 693px;
  background-color: #f3f4f6;
  position: absolute;
  top: px;
}

.text {
  width: 129px;
  height: 15px;
  font-size: 16px;
  font-family: PingFang;
  font-weight: bold;
  color: #333333;
  line-height: 46px;
  position: absolute;
  top: 20px;
  left: 26px;
}

.box1 {
  width: 111px;
  height: 86px;
  background: no-repeat rgba(236, 236, 236, 0) url('/src/assets/s.png') bottom;
  border: 1px solid #f37c13;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: absolute;
  top: 64px;
  left: 29px;
  .text1 {
    width: 12px;
    height: 16px;
    font-size: 21px;
    font-family: PingFang;
    font-weight: bold;
    color: #888888;
    line-height: 46px;
    position: relative;
    left: 49px;
  }
  .text2 {
    width: 61px;
    height: 15px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 46px;
    position: relative;
    top: 25px;
    left: 11px;
  }
  .xz {
    width: 21px;
    height: 21px;
    position: relative;
    top: 60px;
    left: 21px;
  }
}

.box2 {
  width: 111px;
  height: 86px;
  background: no-repeat rgba(236, 236, 236, 0) url('/src/assets/s.png') bottom;
  border: 1px solid #f37c13;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: absolute;
  top: 64px;
  left: 152px;
  .text1 {
    width: 12px;
    height: 16px;
    font-size: 21px;
    font-family: PingFang;
    font-weight: bold;
    color: #888888;
    line-height: 46px;
    position: relative;
    left: 49px;
  }
  .text2 {
    width: 61px;
    height: 15px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 46px;
    position: relative;
    top: 25px;
    left: 11px;
  }
  .xz {
    width: 21px;
    height: 21px;
    position: relative;
    top: 60px;
    left: 21px;
  }
}

.box3 {
  width: 111px;
  height: 86px;
  background: no-repeat rgba(236, 236, 236, 0) url('/src/assets/s.png') bottom;
  border: 1px solid #f37c13;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: absolute;
  top: 64px;
  left: 274px;
  .text1 {
    width: 12px;
    height: 16px;
    font-size: 21px;
    font-family: PingFang;
    font-weight: bold;
    color: #888888;
    line-height: 46px;
    position: relative;
    left: 49px;
  }
  .text2 {
    width: 61px;
    height: 15px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 46px;
    position: relative;
    top: 25px;
    left: 11px;
  }
  .xz {
    width: 21px;
    height: 21px;
    position: relative;
    top: 60px;
    left: 21px;
  }
}

.box4 {
  width: 111px;
  height: 86px;
  background: no-repeat rgba(236, 236, 236, 0) url('/src/assets/s.png') bottom;
  border: 1px solid #f37c13;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: absolute;
  top: 161px;
  left: 29px;
  .text1 {
    width: 12px;
    height: 16px;
    font-size: 21px;
    font-family: PingFang;
    font-weight: bold;
    color: #888888;
    line-height: 46px;
    position: relative;
    left: 49px;
  }
  .text2 {
    width: 61px;
    height: 15px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 46px;
    position: relative;
    top: 25px;
    left: 11px;
  }
  .xz {
    width: 21px;
    height: 21px;
    position: relative;
    top: 60px;
    left: 21px;
  }
}

.box5 {
  width: 111px;
  height: 86px;
  background: no-repeat rgba(236, 236, 236, 0) url('/src/assets/s.png') bottom;
  border: 1px solid #f37c13;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: absolute;
  top: 161px;
  left: 152px;
  .text1 {
    width: 12px;
    height: 16px;
    font-size: 21px;
    font-family: PingFang;
    font-weight: bold;
    color: #888888;
    line-height: 46px;
    position: relative;
    left: 49px;
  }
  .text2 {
    width: 61px;
    height: 15px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 46px;
    position: relative;
    top: 25px;
    left: 11px;
  }
  .xz {
    width: 21px;
    height: 21px;
    position: relative;
    top: 60px;
    left: 21px;
  }
}

.box6 {
  width: 111px;
  height: 86px;
  background: no-repeat rgba(236, 236, 236, 0) url('/src/assets/s.png') bottom;
  border: 1px solid #f37c13;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: absolute;
  top: 161px;
  left: 274px;
  .text1 {
    width: 12px;
    height: 16px;
    font-size: 21px;
    font-family: PingFang;
    font-weight: bold;
    color: #888888;
    line-height: 46px;
    position: relative;
    left: 49px;
  }
  .text2 {
    width: 61px;
    height: 15px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 46px;
    position: relative;
    top: 25px;
    left: 11px;
  }
  .xz {
    width: 21px;
    height: 21px;
    position: relative;
    top: 60px;
    left: 21px;
  }
}
.sj1 {
  width: 414px;
  background: #ffffff;
  padding: 5px;
  border: 1px solid #eeeeee;
  border-radius: 6px;
  // border: 1px solid #aaaaaa;
  // box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  // border-radius: 6px;
  // font-size: 17px;
  // font-family: PingFang;
  // font-weight: 400;
  // color: #888888;
  // line-height: 49px;
  // text-align: center;
  position: absolute;
  top: 260px;
}

.sj2 {
  width: 414px;
  // height: 49px;
  background: #ffffff;
  padding: 5px;
  border: 1px solid #eeeeee;
  border-radius: 6px;
  // border: 1px solid #aaaaaa;
  // box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  // border-radius: 6px;
  // font-size: 17px;
  // font-family: PingFang;
  // font-weight: 400;
  // color: #888888;
  // line-height: 49px;
  // text-align: center;
  position: absolute;
  top: 300px;
}
.blx {
  width: 10px;
  height: 3px;
  font-size: 21px;
  font-family: PingFang;
  font-weight: 400;
  color: #aaaaaa;
  line-height: 46px;
  position: absolute;
  top: 273px;
  left: 200px;
}

.xx1 {
  width: 391px;
  height: 58px;
  background: #ffffff;
  border: 1px solid #aaaaaa;
  box-shadow: 0px 0px 0px 0px rgba(209, 209, 209, 0.5);
  border-radius: 6px;
  position: absolute;
  top: 348px;
  left: 12px;
  p {
    width: 80px;
    height: 20px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: 400;
    color: #333333;
    position: absolute;
    top: 20px;
    left: 23px;
  }
  input {
    width: 100px;
    height: 25px;
    border: 1px solid #eeeeee;
    border-radius: 6px;
    position: absolute;
    top: 20px;
    left: 260px;
  }
}

.xx2 {
  width: 391px;
  height: 58px;
  background: #ffffff;
  border: 1px solid #aaaaaa;
  box-shadow: 0px 0px 0px 0px rgba(209, 209, 209, 0.5);
  border-radius: 6px;
  position: absolute;
  top: 406px;
  left: 12px;
  p {
    width: 90px;
    height: 20px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: 400;
    color: #333333;
    position: absolute;
    top: 20px;
    left: 23px;
  }
  input {
    width: 100px;
    height: 25px;
    border: 1px solid #eeeeee;
    border-radius: 6px;
    position: absolute;
    top: 20px;
    left: 260px;
  }
}

.fs {
  width: 391px;
  height: 52px;
  border: none;
  background: linear-gradient(90deg, #fa8e07, #f17716);
  border-radius: 6px;
  position: absolute;
  top: 596px;
  left: 12px;
  font-size: 20px;
  font-family: PingFang;
  font-weight: 500;
  color: #ffffff;
}
</style>
