/* *@description:添加收获地址 *@author: 王浩南 *@date: 2022-05-19 */
<template>
  <div class="app">
    <!-- navbar -->
    <WdNavbar show-slot title="添加收货地址" />
    <div class="main">
      <Form @failed="onFailed">
        <CellGroup inset>
          <!-- 通过 pattern 进行正则校验 -->
          <Field v-model="subInfo.username" name="pattern" label="收货人" input-align="right">
            <template #button>
              <img style="width: 19px" src="../../../assets/whn/矢量智能对象2.png" />
            </template>
          </Field>
          <!-- 通过 validator 进行函数校验 -->
          <Field
            v-model="subInfo.phone"
            is-link
            name="validator"
            label="手机号"
            placeholder="+86"
            input-align="right"
            :rules="[{ pattern: PHONE, message: '请正确输入手机号' }]"
          />
          <!-- 通过 validator 返回错误提示 -->
          <Field
            v-model="subInfo.address"
            input-align="right"
            is-link
            label="所在地区"
            readonly
            name="validatorMessage"
            @click="addressShow = true"
          />
          <Field
            v-model="subInfo.address_detail"
            label="详情地址"
            placeholder="如道路,门牌号,小区,楼栋号,单元室等"
            autosize
            rows="3"
            type="textarea"
          />
          <div class="padding"></div>
          <Field
            v-model="subInfo.tag"
            label="地址标签"
            readonly
            input-align="right"
            name="asyncValidator"
            placeholder="请选择"
            is-link
            @click="show = true"
          />
          <Field name="switch" label="设为默认地址" input-align="right">
            <template #input>
              <Switch v-model="subInfo.status" size="20" />
            </template>
          </Field>
        </CellGroup>
        <div style="margin: 16px">
          <Button round block type="primary" native-type="submit" @click="submit"> 提交 </Button>
        </div>
      </Form>
    </div>
    <ActionSheet v-model:show="show" :actions="actions" @select="onSelect" />
    <Area
      v-show="addressShow"
      title="标题"
      :area-list="areaList"
      @cancel="addressShow = false"
      @confirm="onConfirm"
    />
  </div>
</template>

<script setup>
import { areaList } from '@vant/area-data'
import WdNavbar from '@/components/WdNavbar.vue'
import { Form, Field, CellGroup, Button, Switch, Area, ActionSheet, Dialog } from 'vant'
import { ref, reactive } from 'vue'
import { api8 } from '@/utils/request.js'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { PHONE } from '@/constant/rules.js'
import axios from 'axios'
const router = useRouter()
const store = useStore()
// 地址标签状态
const show = ref(false)
// 地址选择器显示状态
const addressShow = ref(false)
// 地址标签
const actions = reactive([{ name: '学校' }, { name: '公司' }, { name: '家' }])
// 提交对象
const subInfo = reactive({
  username: '',
  phone: '',
  address: '',
  status: false,
  address_detail: '',
  tag: '',
})

//地址标签点击事件
const onSelect = (item) => {
  // 默认情况下点击选项时不会自动收起
  subInfo.tag = item.name
  show.value = false
}

//地址选择器确认事件
const onConfirm = (item) => {
  subInfo.address = item[0].name + item[1].name + item[2].name
  addressShow.value = false
}

//提交方法
const submit = () => {
  axios({
    url: api8 + '/address/add',
    method: 'post',
    params: subInfo,
    headers: { 'Content-Type': 'multipart/form-data', token: store.getters.token },
  }).then((res) => {
    // console.log(res.data)
    if (res.code == 200) {
      ;(subInfo.username = ''),
        (subInfo.phone = ''),
        (subInfo.address = ''),
        (subInfo.status = false),
        (subInfo.address_detail = ''),
        (subInfo.tag = ''),
        Dialog.alert({
          message: '添加成功,是否继续添加?',
          confirmButtonText: '继续添加',
          showCancelButton: true,
        })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
            router.back()
          })
    } else {
      Dialog.alert({
        message: '添加失败',
      })
    }
  })
}

// 表单提交失败
const onFailed = (errorInfo) => {
  console.log('failed', errorInfo)
}
</script>
<style scoped lang="scss">
.app {
  min-height: 100vh;
  background: #f3f4f5;
}
.main {
  padding: 10px 0;
  padding-bottom: 0;
}
// feil vant样式修改
.van-field,
.van-cell__title {
  min-height: 58px;
  display: flex;
  align-items: center;
  padding: 10px 20px;
}
:deep(.van-field__control) {
  // border: 1px solid #000;
  min-height: 20px;
  line-height: 20px;
}
.van-cell {
  min-height: 58px;
  display: flex;
  align-items: center;
  padding: 10px 20px;
}
.area {
  width: 100vw;
  position: fixed;
  bottom: 0;
}
.padding {
  // margin-top:10px;
  padding-top: 20px;
  background: #f3f4f5;
}
</style>
