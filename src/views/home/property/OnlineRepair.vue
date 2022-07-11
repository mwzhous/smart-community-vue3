/* *@description:在线报修页面 *@author: 龚俊溢 *@date: 2022-05-13 */
<template>
  <WdNavbar
    :show-slot="true"
    title="在线报修"
    icon-url="clock"
    :on-click-right="onClickRight"
  />
  <div class="page">
    <div class="cont">
      <p class="words">联系人</p>
      <div>
        <textarea v-model="suggest1" placeholder="请输入姓名" class="words1"></textarea>
      </div>
    </div>

    <div class="cont1">
      <p class="words">联系电话</p>
      <div>
        <textarea v-model="suggest2" placeholder="请输入手机号" class="words1"></textarea>
      </div>
    </div>

    <div class="cont2">
      <Field
        v-model="resultAddress"
        class="field-box"
        is-link
        readonly
        name="datetimePicker"
        label="小区单元"
        input-align="right"
        placeholder="请选择小区单元"
        @click="showPicker2 = true"
      />
      <Popup v-model:show="showPicker2" position="bottom">
        <Picker
          ref="picker"
          v-model="resultAddress"
          :columns="columns1"
          @change="onChange1"
          @cancel="showPicker2 = false"
          @confirm="confirmAddress"
        />
      </Popup>
    </div>

    <div class="cont3">
      <Field
        v-model="resultDate"
        class="field-box"
        is-link
        readonly
        name="datetimePicker"
        label="预约时间"
        input-align="right"
        placeholder="请选择预约时间"
        @click="showPicker = true"
      />
      <Popup v-model:show="showPicker" position="bottom">
        <DatetimePicker
          type="datetime"
          title="选择完整时间"
          @confirm="confirmTime"
          @cancel="showPicker = false"
        />
      </Popup>
    </div>

    <div class="cont4">
      <Field
        v-model="resultType"
        class="field-box"
        is-link
        readonly
        name="datetimePicker"
        label="报修类型"
        input-align="right"
        placeholder="请选择报修类型"
        @click="showPicker1 = true"
      />
      <Popup v-model:show="showPicker1" position="bottom">
        <Picker
          title="报修类型"
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker1 = false"
          @change="onChange"
        />
      </Popup>
    </div>

    <div class="cont7">
      <p class="words">报修标题</p>
      <div>
        <textarea v-model="suggest7" placeholder="报修标题" class="words2"></textarea>
      </div>
    </div>

    <div class="cont5">
      <div class="bg">
        <textarea v-model="suggest6" class="words3" placeholder="请输入内容"></textarea>
      </div>
      <div>
        <Uploader v-model="fileList" multiple :after-read="afterRead" :max-count="3" class="pic" />
      </div>
    </div>

    <div class="cont6">
      <p class="words4" @click="send">提交</p>
    </div>
  </div>
</template>

<script setup>
import WdNavbar from '../../../../src/components/WdNavbar.vue'
import { Uploader, Field, DatetimePicker, Popup, Toast, Picker } from 'vant'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { post, api6 } from '../../../utils/request'
let resultDate = ref('')
let resultType = ref('')
let resultType1 = ref('')
let resultAddress = ref('')
let showPicker = ref(false)
let showPicker1 = ref(false)
let showPicker2 = ref(false)
// const fileList = ref([])
const router = useRouter()
const suggest1 = ref('')
const suggest2 = ref('')
const suggest6 = ref('')
const suggest7 = ref('')
const onClickRight = () => {
  router.push('/home/property/complain')
}

// let file1 = ref([])
// const afterRead = (file) => {
//   // 此时可以自行将文件上传至服务器
//   file1.value.push(file)
// }

const fileList = reactive([])
const afterRead = (file) => {
  // 此时可以自行将文件上传至服务器
  fileList.push(file)
}

const flatten = (arr) => {
  return [].concat(...arr.map((x) => (Array.isArray(x) ? flatten(x) : x)))
}

const send = () => {
  const formData = new FormData()
  const newFileList = flatten(fileList)
  for (let i = 0; i < newFileList.length; i++) {
    formData.append('imgs', newFileList[i].file)
  }
  formData.append('username', suggest1.value)
  formData.append('phone', suggest2.value)
  formData.append('address', resultAddress.value)
  formData.append('orderTime', resultDate.value + ':00')
  formData.append('repairType', parseInt(resultType1.value))
  formData.append('repairContent', suggest6.value)
  formData.append('repairTitle', suggest7.value)
  post(api6 + '/household/repair/add', formData)
    .then(() => {
      Toast.success('提交成功')
      router.back()
    })
    .catch(() => {
      Toast.fail('提交失败')
    })
}

const confirmTime = (e) => {
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
  showPicker.value = false
}

const columns = ['居家报修', '公共报修']

const onConfirm = (value, index) => {
  //Toast(`当前值: ${value}, 当前索引: ${index}`)
  resultType.value = value
  resultType1.value = index
  showPicker1.value = false
}
const onChange = (value, index) => {
  //Toast(`当前值: ${value}, 当前索引: ${index}`)
  resultType.value = value
  resultType1.value = index
  showPicker1.value = false
}

const picker = ref(null)

const cities = {
  一单元: ['101', '102', '103', '104', '105', '106'],
  二单元: ['201', '202', '203', '204', '205', '206'],
  三单元: ['301', '302', '303', '304', '305', '306'],
  四单元: ['401', '402', '403', '404', '405', '406'],
  五单元: ['501', '502', '503', '504', '505', '506'],
  六单元: ['601', '602', '603', '604', '605', '606'],
}
const columns1 = [{ values: Object.keys(cities) }, { values: cities['一单元'] }]

const onChange1 = (values) => {
  picker.value.setColumnValues(1, cities[values[0]])
  //resultAddress.value = values
}
const confirmAddress = (values) => {
  resultAddress.value = values
  showPicker2.value = false
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #f1f2f4;
  width: 414px;
  height: 100vh;
}
.cont {
  position: absolute;
  width: 414px;
  height: 58px;
  background: #ffffff;
  box-shadow: 0px 0px 0px 0px rgba(209, 209, 209, 0.5);
  margin-top: 10px;
}
.cont1 {
  position: absolute;
  width: 414px;
  height: 58px;
  background: #ffffff;
  box-shadow: 0px 0px 0px 0px rgba(209, 209, 209, 0.5);
  margin-top: 69px;
}
.cont2 {
  position: absolute;
  width: 414px;
  height: 58px;
  background: #ffffff;
  box-shadow: 0px 0px 0px 0px rgba(209, 209, 209, 0.5);
  margin-top: 128px;
}
.cont3 {
  position: absolute;
  width: 414px;
  height: 65px;
  background: #ffffff;
  margin-top: 200px;
}
.cont4 {
  position: absolute;
  width: 414px;
  height: 58px;
  background: #ffffff;
  margin-top: 239px;
}
.cont7 {
  position: absolute;
  width: 414px;
  height: 58px;
  background: #ffffff;
  margin-top: 280px;
}
.cont5 {
  position: absolute;
  width: 391px;
  height: 288px;
  background: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  left: 12px;
  top: 390px;
}
.cont6 {
  position: absolute;
  width: 391px;
  height: 52px;
  background: linear-gradient(90deg, #fa8e07, #f17716);
  border-radius: 6px;
  left: 12px;
  top: 690px;
}
.bg {
  position: relative;
  width: 362px;
  height: 144px;
  background: #ffffff;
  box-shadow: 0px 0px 0px 0px rgba(209, 209, 209, 0.5);
  border-bottom: 1px solid rgb(163, 157, 157);
  left: 14px;
}
.words {
  position: relative;
  height: 15px;
  font-size: 16px;
  font-family: PingFang;
  font-weight: 400;
  color: #333333;
  left: 11px;
  top: 18px;
}
.words1 {
  position: relative;
  width: 110px;
  height: 42px;
  left: 280px;
  border: 0px solid;
  resize: none;
}
.words2 {
  position: relative;
  width: 110px;
  height: 42px;
  left: 300px;
  border: 0px solid;
  resize: none;
}
.words3 {
  position: relative;
  width: 350px;
  height: 130px;
  left: 7px;
  top: 12px;
  border: 0px solid;
  resize: none;
}
.words4 {
  position: relative;
  height: 18px;
  font-size: 20px;
  font-family: PingFang;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  top: 10px;
}
.pic {
  position: relative;
  //width: 111px;
  height: 111px;
  left: 17px;
  top: 22px;
}
.field-box {
  font-size: 16px;
  font-family: PingFang;
  font-weight: 545;
  padding: 18.5px;
  left: -9px;
}
</style>
