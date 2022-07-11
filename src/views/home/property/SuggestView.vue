/* *@description:投诉建议 *@author: 龚俊溢 *@date: 2022-05-14 */
<template>
  <div class="page">
    <div class="wrapper">
      <WdNavbar
        :show-slot="true"
        title="投诉建议"
        icon-url="clock"
        :on-click-right="onClickRight"
      />
    </div>

    <div class="cont">
      <div>
        <textarea v-model="suggest" class="words" placeholder="请输入您的投诉与建议"></textarea>
      </div>
      <Uploader
        v-model="fileList"
        multiple
        :after-read="afterRead"
        :max-count="5"
        class="pic"
        :deletable="true"
      />
    </div>

    <div class="cont1">
      <p class="words1" @click="send">提交</p>
    </div>
  </div>
</template>

<script setup>
import WdNavbar from '../../../components/WdNavbar.vue'
import { useRouter } from 'vue-router'
import { Uploader, Toast } from 'vant'
import { reactive, ref } from 'vue'
import { post, api6 } from '../../../utils/request'
const router = useRouter()
const onClickRight = () => {
  router.push({ name: 'ServiceLog' })
}

const suggest = ref('')

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
  //console.log('fileList.length', fileList.length)
  const newFileList = flatten(fileList)
  //console.log('NEWfileList.length', newFileList.length)
  for (let i = 0; i < newFileList.length; i++) {
    formData.append('imgs', newFileList[i].file)
  }
  formData.append('complainContent', suggest.value)
  post(api6 + '/household/complain/add', formData)
    .then((res) => {
      console.log(res)
      Toast.success('提交成功')
      router.push('/home/property/service')
    })
    .catch(() => {
      Toast.fail('提交失败')
    })
}
</script>

<style lang="scss" scoped>
.page {
  background-color: #f1f2f4;
  width: 414px;
  height: 736px;
}
.cont {
  position: absolute;
  width: 391px;
  height: 288px;
  background: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  top: 70px;
  left: 12px;
}
.cont1 {
  position: absolute;
  width: 391px;
  height: 52px;
  background: linear-gradient(90deg, #fa8e07, #f17716);
  border-radius: 6px;
  left: 12px;
  top: 393px;
}
.pic {
  position: relative;
  // width: 111px;
  height: 111px;
  left: 27px;
  top: 0px;
}
.words {
  position: relative;
  width: 365px;
  height: 120px;
  left: 7px;
  top: 22px;
  border: 0px solid;
  resize: none;
}
.words1 {
  position: relative;
  font-size: 20px;
  font-family: PingFang;
  font-weight: 500;
  color: #ffffff;
  text-align: center;
  top: 10px;
}
</style>
