/* **@author: 王浩南  */
<template>
  <div class="m">
    <!-- navbar -->
    <WdNavbar title="租凭车位" bg-color="#fff" />
    <div class="n">
      <Form>
        <Field
          v-model="showInfo.parkingId"
          readonly
          is-link
          label="停车场"
          placeholder="请选择"
          :rules="[{ required: true, message: '请填写信息' }]"
          @click="show(1)"
        />
        <Field
          v-model="showInfo.section"
          readonly
          is-link
          label="区位号"
          placeholder="请选择"
          :rules="[{ required: true, message: '请填写信息' }]"
          @click="show(2)"
        />
        <Field
          v-model="showInfo.carportNo"
          readonly
          is-link
          label="车位号"
          placeholder="请选择"
          :rules="[{ required: true, message: '请填写信息' }]"
          @click="show(3)"
        />
        <Field
          v-model="showInfo.cardName"
          readonly
          is-link
          label="卡类"
          placeholder="月卡"
          :rules="[{ required: true, message: '请填写信息' }]"
          @click="show(4)"
        />
        <Field
          v-model="sumbInfo.carNumber"
          name="carNumber"
          label="车牌号"
          placeholder="请输入车牌号"
          :rules="[{ pattern: CAR, message: '请输入正确的车牌号' }]"
        />
        <div class="pay">
          <div class="pay__left">
            <span class="pay__left--content">总金额:</span>
            <span class="pay__left--price">¥ {{ showInfo.total }}</span>
          </div>
          <button class="pay--submit" @click="submitClick">选好了</button>
        </div>
      </Form>
      <Popup v-model:show="showPicker" round position="bottom">
        <Picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
      </Popup>
      <!-- 底部支付界面 -->
    </div>
  </div>
</template>
<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import { Picker, Popup, Field, Form, Notify} from 'vant'
import { reactive, ref } from 'vue'
import { api5, get } from '@/utils/request.js'
import {CAR} from '@/constant/rules.js'
import {submitTip} from '@/utils/submit.js'

// 可使用车位信息
const Rentinfo = ref({})
// 选项卡信息
const columns = ref([])
// 获取停车场信息
const parkingInfo = ref([])
// 弹出框状态
const showPicker = ref(false)
// 月卡
const cardName = reactive([
  { text: '月卡', id: '1', status: 4 },
  { text: '季卡', id: '2', status: 4 },
  { text: '年卡', id: '3', status: 4 },
])
// 显示参数
const showInfo = reactive({
  parkingId: '',
  section: '',
  carportNo: '',
  cardName: '',
  total: '',
})
const sumbInfo = reactive({
  parkingId: '',
  section: '',
  carportNo: '',
  cardName: '月卡',
  carNumber: '',
})



// 选项卡设置位车场id
const parkingId = () => {
  columns.value = parkingInfo.value
}

// 选项卡设置车位区号信息
const section = () => {
  const tempinfo = ref(Object.getOwnPropertyNames(Rentinfo.value.selectRentals[sumbInfo.parkingId]))
  // console.log(tempinfo.value);
  columns.value = []
  tempinfo.value.forEach((element) => {
    columns.value.push({ text: element, status: 2 })
  })
}
// 选项卡设置车位号信息
const carportNo = () => {
  const tempinfo = ref(Rentinfo.value.selectRentals[sumbInfo.parkingId][sumbInfo.section])
  columns.value = []
  for (const i = ref(0); i.value <= tempinfo.value.length; i.value++) {
    columns.value.push({ text: tempinfo.value[i.value], status: 3 })
  }
}

// 弹出事件选择弹出框的信息
const show = (index) => {
  switch (index) {
    case 1:
      showPicker.value = true
      parkingId()
      break
    case 2:
      if (sumbInfo.parkingId) {
        showPicker.value = true
        section()
        break
      } else {
        Notify({ type: 'warning', message: '请先选择之前选择信息' })
        break
      }
    case 3:
      if (sumbInfo.section) {
        showPicker.value = true
        carportNo()
        break
      } else {
        Notify({ type: 'warning', message: '请先选择之前选择信息' })
        break
      }
    case 4:
      showPicker.value = true
      columns.value = cardName
      break
  }
}

// 弹出框确认事件
const onConfirm = (selectedOptions) => {
  showPicker.value = false
  if (selectedOptions.communityId) {
    showInfo.section = ''
    showInfo.carportNo = ''
    // 车场id
    showInfo.parkingId = selectedOptions.text
    sumbInfo.parkingId = selectedOptions.communityId
  } else if (selectedOptions.status === 2) {
    //区位号
    showInfo.section = selectedOptions.text
    sumbInfo.section = selectedOptions.text
  } else if (selectedOptions.status === 3) {
    //车牌号
    // console.log(selectedOptions.text)
    showInfo.carportNo = selectedOptions.text
    sumbInfo.carportNo = selectedOptions.text
  } else {
    //卡类
    showInfo.cardName = selectedOptions.text
    sumbInfo.cardName = selectedOptions.text
    getPrice(selectedOptions.id)
  }
}

// 获取价格
const getPrice = (index) => {
  get(api5 + '/park/card', { parkingId: index }).then((res) => {
    showInfo.total = res[index].price
  })
}

// 提交
const submitClick = () => {
  submitTip(api5 + '/park/carRental',sumbInfo)
  sumbInfo.carNumber='月卡'
}

// 获取停车长名字信息
get(api5 + '/park/parkName').then((res) => {
  parkingInfo.value = res
})
// 获取可租聘的车位信息
get(api5 + '/park/ableRental').then((res) => {
  Rentinfo.value = res
})
// 初始化获取月卡价格
getPrice(1)
</script>

<style scoped lang="scss">
// feil vant样式修改
.van-cell {
  height: 58px;
  display: flex;
  align-items: center;
  padding: 20px;
}
.m {
  height: 100vh;
  background: #f3f4f5;
}
.n {
  margin-top: 12px;
}
.pay {
  background: #fff;
  display: flex;
  padding: 5px 13px;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  bottom: 10px;
  align-items: center;
  &__left {
    display: flex;
    align-items: center;
    padding-left: 15px;
    &--content {
      line-height: 17px;
      font-size: 16px;
      font-weight: bold;
      color: #444444;
      margin-right: 15px;
    }
    &--price {
      line-height: 17px;
      font-size: 17px;
      color: #ff8c11;
    }
  }
  &--submit {
    height: 35px;
    width: 86px;
    background: #ff8c11;
    color: #fff;
    font-size: 16px;
    border-radius: 5px;
    border: none;
  }
}
</style>
