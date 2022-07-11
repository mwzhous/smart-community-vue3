/* **@author: 王浩南  */
<template>
  <div class="main">
    <!-- navbar -->
    <WdNavbar
      title="贵宾邀请"
      show-slot
      bg-color="#f59331"
      color="$cf"
      icon-url="clock"
      :on-click-right="goto"
    />
    <div class="container">
      <Form>
        <CellGroup inset>
          <Field
            v-model="sumbInfo.contact"
            name="contact"
            label="联系人"
            placeholder="请输入姓名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <Field
            v-model="sumbInfo.phone"
            name="phone"
            label="联系电话"
            placeholder="请输入手机号"
            :rules="[{ pattern: PHONE, message: '请正确输入手机号' }]"
          />
          <Field
            v-model="sumbInfo.carNumber"
            class="gap"
            name="carNumber"
            label="车牌号"
            placeholder="请输入车牌号"
            :rules="[{ pattern: CAR, message: '请输入正确的车牌号' }]"
          />
          <Field
            v-model="showCommunity"
            readonly
            is-link
            label="选择小区"
            placeholder="请选择"
            @click="showPicker = true"
          />
          <div class="box">
            <span>选择开始时间</span>
            <n-date-picker
              type="date"
              format="yyyy/MM/dd"
              size="large"
              clearable
              placement="top-end"
              placeholder="选择开始时间"
              @update:value="start"
            />
          </div>
          <div class="box">
            <span>选择结束时间</span>
            <n-date-picker
              type="date"
              format="yyyy/MM/dd"
              size="large"
              clearable
              placement="top-end"
              placeholder="选择结束时间"
              @update:value="end"
            />
          </div>

          <Field v-model="sumbInfo.remark" placeholder="备注（选填）" />
        </CellGroup>

        <div style="margin: 16px">
          <Button round block type="primary" native-type="submit" @click="submit"> 提交 </Button>
        </div>
      </Form>
      <Popup v-model:show="showPicker" round position="bottom">
        <Picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
      </Popup>
    </div>
  </div>
</template>

<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import { Form, Field, CellGroup, Button, Popup, Picker } from 'vant'
import { NDatePicker } from 'naive-ui'
import { ref, reactive } from 'vue'
import { api5, get } from '@/utils/request.js'
import { useRouter } from 'vue-router'
import { CAR, PHONE } from '@/constant/rules.js'
import { submitTip } from '@/utils/submit.js'

const router = useRouter()
  //选择器显示状态
  const showPicker = ref(false)
  // 商品信息
  const showCommunity = ref()
  // 小区
  const columns = ref([])
  // 请求提交对象
  const sumbInfo = reactive({
  // 姓名
  contact: '',
  // 手机号
  phone: '',
  // 车牌号
  carNumber: '苏BWH630',
  // 小区
  communityId: '1',
  // 开始时间
  startTime: '',
  // 结束时间
  endTime: '',
  // 备注
  remark: '',
})

get(api5 + '/park/parkName').then((res) => {
  columns.value = res
})
// 路由跳转
const goto = () => {
  router.push({ name: 'InvitedRecord' })
}

// 街道选择弹窗
const onConfirm = (selectedOptions) => {
  showPicker.value = false
  showCommunity.value = selectedOptions.text
  sumbInfo.communityId = selectedOptions.communityId
}

// 开始时间获取
const start = (msg) => {
  sumbInfo.startTime = msg
}

// 结束时间获取
const end = (msg) => {
  sumbInfo.endTime = msg
}

// 提交请求
const submit = () => {
  submitTip(api5 + '/invitation/add', sumbInfo)
  sumbInfo.communityId = '1'
}

</script>

<style scoped lang="scss">
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
.gap {
  margin-bottom: 10px;
}
.main {
  height: 100vh;
  background: #f3f4f5;
}
.box {
  span {
    margin: 0 10px 0 20px;
    color: #646566;
  }
  display: flex;
  align-items: center;
  background: $cf;
  .n-date-picker {
    border: none;
    flex: 1;
  }
}
</style>
