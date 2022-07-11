/* **@author: 王浩南 */
<template>
  <div class="app" @click="getParkStatus">
    <!-- navbar -->
    <WdNavbar
      title="停车界面"
      show-slot
      bg-color="#f59331"
      color="#fff"
      icon-url="info-o"
      :on-click-right="OverlayClick"
    />
    <Form>
      <div class="info">
        <span class="info--parkName">{{ parkName }}</span>
        <div v-if="route.params.status == 1">
          <div class="info__location">
            <Field
              v-model="section_num"
              readonly
              is-link
              label="选择区号"
              :placeholder="info.section.split('-')[0]"
            />
          </div>
          <div class="info__location">
            <Field
              v-model="localtion_num"
              readonly
              is-link
              label="选择位号"
              :placeholder="info.section.split('-')[1]"
            />
          </div>
          <div class="info__carlocal">
            <Field
              v-model="car_num"
              label="输入车牌号:"
              readonly
              :placeholder="info.carNumber"
              :blur="getParkStatus"
            />
          </div>
        </div>
        <div v-else>
          <div class="info__location">
            <Field
              v-model="section_num"
              readonly
              is-link
              label="选择区号"
              placeholder="请选择"
              @click="showPi(1)"
            />
          </div>
          <div class="info__location">
            <Field
              v-model="localtion_num"
              readonly
              is-link
              label="选择位号"
              placeholder="请选择"
              @click="showPi(2)"
            />
          </div>
          <div class="info__carlocal">
            <Field
              v-model="car_num"
              label="输入车牌号:"
              placeholder="请输入"
              @blur="getParkStatus"
            />
          </div>
        </div>
      </div>
      <div v-if="route.params.status == 1" class="btn">
        <Button v-if="!parkingStatus" type="primary" @click="Parking"> 停车 </Button>
        <Button v-else type="primary" @click="getCar"> 取车 </Button>
        <Button plain type="primary" @click="goto('RentalPark')"> 续费 </Button>
      </div>
      <div v-else class="btn">
        <Button v-if="!parkingStatus" type="primary" @click="Parking"> 临时停车 </Button>
        <Button v-else type="primary" @click="getCar"> 取车 </Button>
        <Button plain type="primary" @click="goto('RentalPark')"> 租聘 </Button>
      </div>
    </Form>
    <Overlay :show="show">
      <div class="wrapper" @click="OverlayClick">
        <OverlayShow
          :name="parkRule.name"
          :free-time="parkRule.freeTime"
          :update-time="parkRule.updateTime"
          :first-period="parkRule.firstPeriod"
          :first-amount="parkRule.firstAmount"
          :unit-amount="parkRule.unitAmount"
          :capping-amount="parkRule.cappingAmount"
        />
      </div>
    </Overlay>
    <Popup v-model:show="showPicker" round position="bottom">
      <Picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
    </Popup>
  </div>
</template>

<script setup>
import { Form, Field, Button, Overlay, Popup, Picker, Notify, Dialog } from 'vant'
import { ref } from 'vue'
import { api5, get, post } from '@/utils/request.js'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
import OverlayShow from './components/OverlayShow.vue'
import WdNavbar from '@/components/WdNavbar.vue'
const store = useStore()
const route = useRoute()
const router = useRouter()
const show = ref(false)
//选项卡显示
const showPicker = ref(false)
// 选项卡信息
const columns = ref([])
// 车位号数组
const carportNo = ref([])
// 区位号数组
const section = ref([])
// 获取该停车场名字
const parkName = ref()
// 停车规则
const parkRule = ref()
// 停车场信息
const parkInfo = ref()
// 开始时间
const startTime = ref(localStorage.startTime ? localStorage.startTime : 0)
// 结束时间
const endTime = ref()
// 提交得车位号
const localtion_num = ref()
// 提交的区位号
const section_num = ref()
// 车牌号
const car_num = ref()
// 当前是否有车在车库true有车false无车
const parkingStatus = ref(false)
// 当车主有车位的时候的信息
const info = ref(route.params.info ? JSON.parse(route.params.info) : '')
// 停车类型
const type1 = ref(info.value ? '1' : '2')

// 获取停车场规则和名称
get(api5 + '/parkingRule/select', { parkingId: route.params.id }).then((res) => {
  parkName.value = res.name
  parkRule.value = res
})

// 获取可停车接口
post(api5 + '/parkingRule/ableParking', { parkingId: route.params.id }).then((res) => {
  carportNo.value = []
  parkInfo.value = res.selectParking
  const tempinfo = ref(Object.getOwnPropertyNames(res.selectParking))
  tempinfo.value.forEach((element) => {
    carportNo.value.push({ text: element, status: 1 })
  })
})

// 当用户有组租聘的车辆的时候就会自动赋值
if (info.value) {
  localtion_num.value = info.value.section.split('-')[1]
  section_num.value = info.value.section.split('-')[0]
  car_num.value = info.value.carNumber
}

// 遮罩层事件
const OverlayClick = () => {
  show.value = !show.value
}

// 获取区号
const getSection = () => {
  const tempinfo = ref(parkInfo.value[section_num.value])
  section.value = []
  tempinfo.value.forEach((element) => {
    section.value.push({ text: element, status: 2 })
  })
}

// 选项卡显示事件
const showPi = (index) => {
  switch (index) {
    case 1:
      columns.value = carportNo.value
      showPicker.value = true
      break
    case 2:
      if (section_num.value) {
        getSection()
        columns.value = section.value
        showPicker.value = true
        break
      } else {
        Notify({ type: 'warning', message: '请先选择之前选择信息' })
        break
      }
  }
}

// 弹出框确认事件
const onConfirm = (selectedOptions) => {
  showPicker.value = false
  if (selectedOptions.status == 1) {
    section_num.value = ''
    localtion_num.value = ''
    // 区号
    section_num.value = selectedOptions.text
    getParkStatus()
  } else {
    //区位号
    localtion_num.value = selectedOptions.text
    getParkStatus()
  }
}
// 路由跳转
const goto = (pathName) => {
  router.push({ name: pathName })
}

// 时间转换
Date.prototype.Format = function (fmt) {
  // author: meizz
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      )
  return fmt
}

//停车
const Parking = () => {
  startTime.value = new Date().Format('yyyy-MM-dd hh:mm:ss')
  post(api5 + '/parkingRule/firstParking', {
    parkingId: route.params.id,
    section: section_num.value + '-' + localtion_num.value,
    carNumber: car_num.value,
    startTime: startTime.value,
  }).then((res) => {
    if (res == '开始停车成功') {
      // 停车开始时间
      getParkStatus()
      localStorage.startTime = startTime.value
    }
    Dialog.alert({
      title: '停车状态',
      message: res,
    })
  })
}

// 判断时候有停车状态
const getParkStatus = () => {
  if (localtion_num.value && section_num.value && car_num.value) {
    post(api5 + '/parkingRule/isExisting', {
      parkingId: route.params.id,
      section: section_num.value + '-' + localtion_num.value,
      carNumber: car_num.value,
      startTime: startTime.value,
    })
      .then((res) => {
        if (res == true) {
          parkingStatus.value = true
        } else {
          parkingStatus.value = false
        }
      })
      .catch(() => {
        Notify({ type: 'warning', message: '出现错误' })
      })
  }
}

// 取车
const getCar = () => {
  endTime.value = new Date().valueOf()
  axios({
    url: api5 + '/parkingRule/totalPrice',
    method: 'POST',
    headers: { token: store.getters.token },
    params: {
      parkingId: parseInt(route.params.id),

      parkingTime: parseInt(
        (
          (new Date(endTime.value).valueOf() - new Date(startTime.value).valueOf()) /
          1000 /
          60
        ).toFixed(0),
      ),
    },
  }).then((res) => {
    // console.log(res)
    let price = type1.value == '1' ? 0 : res.data.data
    Dialog.confirm({
      title: '停车详情',
      message:
        '停车用时:' +
        (
          (new Date(endTime.value).valueOf() - new Date(startTime.value).valueOf()) /
          1000 /
          60
        ).toFixed(0) +
        '.费用:' +
        price +
        '元',
    })
      .then(() => {
        post(api5 + '/parkingRule/parking', {
          parkingId: route.params.id,
          parkingNo: section_num.value + '-' + localtion_num.value,
          carNumber: car_num.value,
          type: type1.value,
          amount: price,
          payType: 3,
          state: 1,
          startTime: startTime.value,
          endTime: endTime.value,
          payTime: endTime.value,
        }).then((res) => {
          if (res.message) {
            Notify({ type: 'warning', message: res.message })
          } else {
            localStorage.removeItem('startTime')
            getParkStatus()
            Notify({ type: 'warning', message: res })
          }
        })
      })
      .catch(() => {
        Notify({ type: 'warning', message: '停止取车' })
      })
  })
}
// 调用时间查看是否有车辆停泊
getParkStatus()
</script>

<style lang="scss" scoped>
// feil vant样式修改
.van-field {
  height: 58px;
  display: flex;
  align-items: center;
  padding: 20px;
  // border: 1px solid #000;
}
.van-cell-group {
  background: #f3f4f5;
  // border: 1px solid rgb(170, 36, 36);
}
.app {
  height: 100vh;
  background: #f3f4f5;
  .info {
    margin: 10px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 5px 3px #bcbdbe39;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    &--parkName {
      font-size: 20px;
    }
    &__carlocal {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
// 按钮
.btn {
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  button {
    width: 200px;
  }
}
// 遮罩层
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
