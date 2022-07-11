/* *@description:广场/互助/二手/拼车发布页 *@author: 王 *@date: 2022-05-15 */
<template>
  <div class="page">
    <div class="wrapper">
      <WdNavbar title="发布" />
    </div>
    <div class="btnout">
      <div
        v-for="(item, index) in data.list"
        :key="index"
        class="list"
        :class="{ actives: index == data.active }"
        @click="choseone(index)"
      >
        {{ item.name }}
        <div :class="{ badgeActives: index == data.active }"></div>
      </div>
    </div>

    <div>
      <!-- 广场发布 -->
      <template v-if="data.active == 0">
        <Form>
          <div class="container">
            <div class="textbox">
              <Field
                v-model="content1"
                rows="5"
                autosize
                type="textarea"
                maxlength="255"
                placeholder="分享点新鲜事吧"
                show-word-limit
                class="text1"
                :rules="[{ required: true, message: '请输入内容' }]"
              />
            </div>
            <div>
              <Uploader
                v-model="fileList1"
                :after-read="afterRead"
                multiple
                :max-count="6"
                class="inputpic"
              />
            </div>
          </div>

          <button
            class="postbut"
            @click="
              hadneSumbot();
              save()
            "
          >
            发布
          </button>
        </Form>
      </template>
      <!-- 互助发布 -->
      <template v-if="data.active == 1">
        <Form>
          <div class="container">
            <div class="textbox">
              <Field
                v-model="content2"
                rows="5"
                autosize
                type="textarea"
                maxlength="255"
                placeholder="请输入需要互助内容"
                show-word-limit
                class="text1"
                :rules="[{ required: true, message: '请输入内容' }]"
              />
            </div>
            <div>
              <Uploader v-model="fileList2" :after-read="afterRead1" multiple class="inputpic" />
            </div>
          </div>
          <button
            class="postbut"
            @click="
              hadneSumbot1();
              save()
            "
          >
            发布
          </button>
        </Form>
      </template>
      <!-- 二手发布 -->
      <template v-if="data.active == 2">
        <Form>
          <div class="inputbox">
            <div class="inputbox__container1">
              <span class="inputbox__yuanjia--name">原价</span>
              <span class="inputbox__yuanjia--icon">￥</span>
              <input
                v-model="ori_price"
                textbox
                type="text"
                placeholder="请输入原价"
                class="inputbox__yuanjia--input"
              />
            </div>
            <div class="inputbox__container2">
              <span class="inputbox__xianjia--name">现价</span>
              <span class="inputbox__xianjia--icon">￥</span>
              <input
                v-model="now_price"
                textbox
                type="text"
                placeholder="请输入现价"
                class="inputbox__xianjia--input"
              />
            </div>
          </div>
          <div class="container">
            <div class="textbox">
              <Field
                v-model="content3"
                rows="5"
                autosize
                type="textarea"
                maxlength="255"
                placeholder="请输入内容"
                show-word-limit
                class="text1"
                :rules="[{ required: true, message: '请输入内容' }]"
              />
            </div>
            <div>
              <Uploader v-model="fileList3" :after-read="afterRead2" multiple class="inputpic" />
            </div>
          </div>
          <button
            class="postbut"
            @click="
              hadneSumbot2();
              save()
            "
          >
            发布
          </button>
        </Form>
      </template>
      <!-- 拼车发布 -->
      <template v-if="data.active == 3">
        <Form>
          <div class="carpooling-box">
            <CellGroup inset>
              <Field name="switch" label="是否有车" class="field-box">
                <template #input>
                  <div class="switch-box">
                    <Switch
                      v-model="checked1"
                      size="20"
                      active-color="#44b44e"
                      inactive-color="#dcdee0"
                    />
                  </div>
                </template>
              </Field>
              <Field
                v-model="resultDate"
                class="field-box"
                is-link
                readonly
                name="datetimePicker"
                label="出发时间"
                input-align="right"
                placeholder="请选择"
                :rules="[{ required: true, message: '请选择出发时间' }]"
                @click="showPicker = true"
              />
              <Popup v-model:show="showPicker" position="bottom">
                <DatetimePicker
                  v-model="currentDate"
                  type="datetime"
                  title="选择完整时间"
                  @confirm="confirmTime"
                  @cancel="showPicker = false"
                />
              </Popup>
              <Field
                v-model="resultStart"
                class="field-box"
                is-link
                readonly
                name="picker"
                label="起点"
                input-align="right"
                placeholder="请选择"
                :rules="[{ required: true, message: '请选择起点' }]"
                @click="showAreaStart = true"
              />
              <Popup v-model:show="showAreaStart" position="bottom">
                <Area
                  :area-list="areaList"
                  value="320125"
                  @confirm="confirmStart"
                  @cancel="showAreaStart = false"
                />
              </Popup>
              <Field
                v-model="resultEnd"
                class="field-box"
                is-link
                readonly
                name="picker"
                label="终点"
                input-align="right"
                placeholder="请选择"
                :rules="[{ required: true, message: '请选择终点' }]"
                @click="showAreaEnd = true"
              />
              <Popup v-model:show="showAreaEnd" position="bottom">
                <Area
                  value="320125"
                  :area-list="areaList"
                  @confirm="confirmEnd"
                  @cancel="showAreaEnd = false"
                />
              </Popup>
            </CellGroup>
          </div>
          <div class="container">
            <div class="textbox">
              <Field
                v-model="content4"
                rows="5"
                autosize
                type="textarea"
                maxlength="255"
                placeholder="请输入内容"
                show-word-limit
                class="text1"
                :rules="[{ required: true, message: '请输入内容' }]"
              />
            </div>
            <div>
              <Uploader v-model="fileList4" :after-read="afterRead3" multiple class="inputpic" />
            </div>
          </div>
          <button
            class="postbut"
            @click="
              hadneSumbot3();
              save()
            "
          >
            发布
          </button>
        </Form>
      </template>
    </div>
  </div>
</template>
<script setup>
import { areaList } from '@vant/area-data'
import WdNavbar from '../../components/WdNavbar.vue'
import { Uploader, Form, Field, CellGroup, Switch, DatetimePicker, Popup, Toast, Area } from 'vant'
import { api2, post } from '@/utils/request.js'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
let data = reactive({
  list: [{ name: '广场' }, { name: '互助' }, { name: '二手' }, { name: '拼车' }],
  active: 0,
  // showPicker:false,
})
const router = useRouter()
let save = () => {
  const toast = Toast.loading({
    duration: 0,
    forbidClick: true,
    type: 'success',
    message: '发布成功',
  })

  let second = 2
  const timer = setInterval(() => {
    second--
    if (second) {
      toast.message = `发布成功`
    } else {
      clearInterval(timer)
      Toast.clear()
      router.push('/commu')
    }
  }, 1000)
}
let showPicker = ref(false)
let showAreaStart = ref(false)
let showAreaEnd = ref(false)
let currentDate = ref(new Date())
let resultDate = ref('')
let resultStart = ref('')
let resultEnd = ref('')

const confirmStart = (areaValues) => {
  resultStart.value = areaValues
    .filter((item) => !!item)
    .map((item) => item.name)
    .join('-')
  showAreaStart.value = false
  // console.log(resultStart)
}

const confirmEnd = (areaValues) => {
  resultEnd.value = areaValues
    .filter((item) => !!item)
    .map((item) => item.name)
    .join('-')
  showAreaEnd.value = false
}

const fileList1 = ref([])
const fileList2 = ref([])
const fileList3 = ref([])
const fileList4 = ref([])

const content1 = ref('')
const title1 = ref('')
const content2 = ref('')
const title2 = ref('')
const content3 = ref('')
const title3 = ref('')
const now_price = ref('')
const ori_price = ref('')
const content4 = ref('')
const title4 = ref('')
const checked1 = ref(false)

let choseone = (e) => {
  data.active = e
}
let file1 = ref([])
const afterRead = (file) => {
  file1.value.push(file)
  // console.log(file)
}
let file2 = ref([])
const afterRead1 = (file) => {
  file2.value.push(file)
}
let file3 = ref([])
const afterRead2 = (file) => {
  file3.value.push(file)
}
let file4 = ref([])
const afterRead3 = (file) => {
  file4.value.push(file)
}
const getdate = () => {
  var now = new Date(),
    y = now.getFullYear(),
    m = now.getMonth() + 1,
    d = now.getDate()
  return (
    y +
    '-' +
    (m < 10 ? '0' + m : m) +
    '-' +
    (d < 10 ? '0' + d : d) +
    ' ' +
    now.toTimeString().substr(0, 8)
  )
}

const hadneSumbot = () => {
  // console.log(file1)
  const formData = new FormData()
  if (file1.value[0].length > 1) {
    for (let i = 0; i < file1.value[0].length; i++) {
      formData.append('imgs', file1.value[0][i].file)
    }
  } else {
    formData.append('imgs', file1.value[0].file)
  }
  formData.append('content', content1.value)
  formData.append('title', title1.value)
  formData.append('createTime', getdate())
  post(api2 + '/community/add', formData).then((res) => {
    // console.log(res)
  })
}
const hadneSumbot1 = () => {
  // console.log(file2)
  const formData = new FormData()
  if (file2.value[0].length > 1) {
    for (let i = 0; i < file2.value[0].length; i++) {
      formData.append('imgs', file2.value[0][i].file)
    }
  } else {
    formData.append('imgs', file2.value[0].file)
  }
  formData.append('content', content2.value)
  formData.append('title', title2.value)
  formData.append('createTime', getdate())
  post(api2 + '/community/interact/add', formData).then((res) => {
    // console.log(res)
  })
}
const hadneSumbot2 = () => {
  // console.log(file3)
  const formData = new FormData()
  if (file3.value[0].length > 1) {
    for (let i = 0; i < file3.value[0].length; i++) {
      formData.append('imgs', file3.value[0][i].file)
    }
  } else {
    formData.append('imgs', file3.value[0].file)
  }
  formData.append('content', content3.value)
  formData.append('title', title3.value)
  formData.append('ori_price', ori_price.value)
  formData.append('now_price', now_price.value)
  formData.append('createTime', getdate())
  post(api2 + '/community/sechand/add', formData).then((res) => {
    // console.log(res)
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

const hadneSumbot3 = () => {
  // console.log(file4)
  const formData = new FormData()

  if (file4.value[0].length > 1) {
    for (let i = 0; i < file4.value[0].length; i++) {
      formData.append('imgs', file4.value[0][i].file)
    }
  } else {
    formData.append('imgs', file4.value[0].file)
  }
  formData.append('content', content4.value)
  formData.append('title', title4.value)
  formData.append('status', checked1.value)
  formData.append('origin', resultStart.value)
  formData.append('destination', resultEnd.value)
  formData.append('createtime', getdate())
  formData.append('time', resultDate.value + ':00')
  post(api2 + '/community/car/add', formData).then((res) => {
    // console.log(res)
  })
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #f3f4f6;
  height: 100%;
  width: 100%;
  position: fixed;
  overflow-x: hidden;
  overflow-y: scroll;
}

.container {
  width: 391px;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  margin: 17px auto;
}

.text1 {
  resize: none;
  border: 0px solid;
  width: 354px;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 0px 0px 0px rgba(209, 209, 209, 0.5);
  margin-left: -3px;
  position: relative;
  top: 10px;
}

.textbox {
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
  margin: 0px 21px;
}

.inputpic {
  margin-left: 17px;
  margin-top: 14px;
}

.postbut {
  width: 391px;
  height: 52px;
  background: linear-gradient(90deg, #fa8e07, #f17716);
  border-radius: 6px;
  border: none;
  font-size: 20px;
  font-family: PingFang;
  font-weight: 500;
  color: #ffffff;
  // margin-top: 29px;
  margin-left: 12px;
  position: relative;
  top: 20px;
}

.inputbox {
  height: 116px;
  background: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  margin-top: 17px;
}

.inputbox__container1 {
  height: 58px;
  border-bottom: 1px solid #e8e8e8;
}

.inputbox__container2 {
  height: 58px;
}

.inputbox__yuanjia--name {
  margin-left: 28px;
  line-height: 58px;
  color: #303030;
}

.inputbox__xianjia--name {
  margin-left: 28px;
  line-height: 58px;
  color: #303030;
}

.inputbox__yuanjia--icon {
  margin-left: 18px;
  color: #ababab;
  text-decoration: line-through;
}

.inputbox__xianjia--icon {
  margin-left: 18px;
  color: #db3632;
}

.inputbox__yuanjia--input {
  border: 0px;
  text-decoration: line-through;
  color: #ababab;
}

.inputbox__xianjia--input {
  border: 0px;
  color: #db3632;
}

.inputbox__yuanjia--input::-webkit-input-placeholder {
  color: #aaaaaa;
  text-decoration: line-through;
}

.inputbox__xianjia--input::-webkit-input-placeholder {
  color: #aaaaaa;
}

.switchcar {
  width: 414px;
  height: 58px;
  background: #ffffff;
  margin: 17px auto;
  border-bottom: 1px solid #e8e8e8;
}

.cartext {
  margin-left: 22px;
  line-height: 58px;
}

.switchbutton {
  margin-left: 275px;
}

.actives {
  border: 2px solid #f26c00;
  color: #f26c00;
}

.badgeActives {
  background: #ffffff url('../../assets/wl/chose.png') 100% 100% no-repeat !important;
  background-size: 100% !important;
  border-radius: 50%;
  position: absolute;
  right: -5px;
  bottom: -5px;
  width: 20px;
  height: 20px;
}

.btnout {
  display: flex;
  justify-content: space-between;
  margin: 14px 12px;
}

.list {
  width: 89px;
  height: 46px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  border-radius: 6px;
  font-weight: bold;
  position: relative;
}

.titlebox {
  height: 60px;
  margin: 20px;
  border-bottom: 1px solid #e8e8e8;

  input {
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
    width: 351px;
    height: 40px;
    border: 0;
  }
}

.badge-icon {
  display: block;
  font-size: 10px;
  line-height: 16px;
}

.content {
  padding: 16px 16px 160px;
}

.carpooling-box {
  background-color: #fff;
}

.field-box {
  padding: 15px;
}

.switch-box {
  width: 100%;
  width: 100%;
  display: flex;
  justify-content: right;
}

:deep(.van-field__body) {
  textarea {
    height: 200px !important;
  }
}

:deep(.van-field__word-limit) {
  font-size: 15px;
}

:deep(.van-field__error-message) {
  font-size: 16px;
  margin-left: 138px;
}
</style>
