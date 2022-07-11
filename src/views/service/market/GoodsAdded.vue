/* *@description:跳蚤市场---上架商品页面 *@author: 何明明 *@date: 2022-05-23 */
<template>
  <div>
    <WdNavbar title="上架" />
    <div class="box">
      <div class="box__n1">
        <Uploader
          v-model="fileList"
          :after-read="afterRead"
          multiple
          class="box__n1--sc"
          :max-count="1"
        />
        <Cell-group inset>
          <Field v-model="value" placeholder="商品标题" class="box__n1--title" />
          <Field
            v-model="message"
            rows="5"
            autosize
            type="textarea"
            maxlength="150"
            placeholder="商品详情描述"
            show-word-limit
            class="box__n1--content"
          />
        </Cell-group>
      </div>
      <div class="box__n2">
        <div class="box__n2--info">
          <Field
            v-model="result1"
            is-link
            readonly
            label="地点"
            placeholder="选择小区"
            @click="showPicker1 = true"
          />
          <Popup v-model:show="showPicker1" round position="bottom" :style="{ height: '30%' }">
            <Picker
              title="选择小区"
              :columns="column1"
              :default-index="2"
              @cancel="showPicker1 = false"
              @confirm="onConfirm1"
            />
          </Popup>
        </div>
        <div class="box__n2--info">
          <Field
            v-model="result2"
            is-link
            readonly
            label="分类"
            placeholder="请选择"
            @click="showPicker2 = true"
          />
          <Popup v-model:show="showPicker2" round position="bottom" :style="{ height: '30%' }">
            <Picker
              title="请选择"
              :columns="column2"
              :default-index="2"
              @cancel="showPicker2 = false"
              @confirm="onConfirm2"
            />
          </Popup>
        </div>
        <div class="box__n2--info">
          <Cell-group inset>
            <Field v-model="number" type="number" label="价格" placeholder="请输入价格" />
          </Cell-group>
        </div>
      </div>
      <div class="box__n3">
        <Button color="#f17716" block round @click="uploadImgs">发布</Button>
      </div>
    </div>
  </div>
</template>
<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import { Uploader } from 'vant'
import { Field, CellGroup } from 'vant'
import { Popup } from 'vant'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { Button } from 'vant'
import { jsonp } from 'vue-jsonp'
import { Picker } from 'vant'
import { ref } from 'vue'
import { get, post, api3 } from '@/utils/request'
const value = ref('')
const number = ref('')
const message = ref('')
const communityList = ref([])
const result1 = ref('')
const res1 = ref('')
const res2 = ref('')
const showPicker1 = ref(false)
const column1 = ref([])
const router = useRouter()
const address = ref('')
const column2 = ref([])
const result2 = ref('')
const latitude = ref('')
const longitude = ref('')
//经纬度获取地址
const Geolocation = () => {
  jsonp('https://apis.map.qq.com/ws/location/v1/ip?', {
    key: '27VBZ-ZWQCW-BQ7RX-R3JOJ-MJBFV-Y2BPL',
    output: 'jsonp', // output必须jsonp   不然会超时
  }).then((res) => {
    latitude.value = res.result.location.lat
    longitude.value = res.result.location.lng
    jsonp('https://apis.map.qq.com/ws/geocoder/v1/?', {
      location: `${latitude.value},${longitude.value}`, // 经纬度
      key: '27VBZ-ZWQCW-BQ7RX-R3JOJ-MJBFV-Y2BPL',
      output: 'jsonp', // output必须jsonp   不然会超时
    }).then((res) => {
      address.value = res.result.address
    })
  })
}
Geolocation()
// 小区确定
const onConfirm1 = (value) => {
  result1.value = value.text
  res1.value = value.id
  showPicker1.value = false
}
const showPicker2 = ref(false)
const onConfirm2 = (value) => {
  result2.value = value.text
  res2.value = value.id
  showPicker2.value = false
}

// 获取社区列表方法
const getCommunityList = () => {
  get(api3 + '/allCommunity').then((res) => {
    communityList.value = res
    column1.value = []
    res.forEach((element) => {
      column1.value.push({ text: element.name, id: element.id })
    })
  })
}
// 获取社区列表
getCommunityList()

//获取分类
const getTypeList = () => {
  get(api3 + '/fleaGoodsType').then((res) => {
    column2.value = []
    res.forEach((element) => {
      column2.value.push({ text: element.title, id: element.id })
    })
  })
}
getTypeList()

// 上传图片数组
const fileList = ref([])
let file1 = ref('')
const afterRead = (file) => {
  file1 = file.file
}

const uploadImgs = () => {
  const formData = new FormData()
  formData.append('uploadFiles', file1)
  formData.append('price', number.value)
  formData.append('name', value.value)
  formData.append('content', message.value)
  formData.append('address', address.value)
  formData.append('communityId', res1.value)
  formData.append('typeId', res2.value)
  post(api3 + '/fleaMarket', formData).then((res) => {
    console.log(res)
  })
  if (
    !result1.value ||
    !result2.value ||
    !message.value ||
    !value.value ||
    !number.value ||
    !address.value
  ) {
    Toast.fail('信息没填完偶，亲亲~')
  } else {
    //价格校验
    if (number.value <= 0) {
      Toast.fail('请填写正确的价格,啾咪~')
    }
    router.push({ name: 'AddedRecord' })
  }
}
</script>
<style lang="scss" scoped>
.box {
  background-color: #f3f4f5;
  border: 1px solid #f3f4f5;
  height: calc(100vh - 44px);
  &__n1 {
    margin: 12px;
    height: 345px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 1px 6px 3px rgb(231, 231, 231);
    border-radius: 6px;
    &--sc {
      margin: 18px;
    }
    &--title {
      margin: 0px 0 5px 21px;
    }
    &--content {
      padding: 16px;
      margin-left: 4px;
    }
  }
  &__n2 {
    background-color: #fff;
    box-shadow: 0 1px 6px 3px rgb(231, 231, 231);
    border-radius: 6px;
    @include mx(15px);
    &--info {
      padding: 22px;
    }
  }
  &__n3 {
    margin-top: 10px;
    margin-left: 12px;
    margin-right: 12px;
  }
}
</style>
