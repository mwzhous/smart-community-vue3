<template>
  <div class="all">
    <!-- navbar -->
    <WdNavbar title="意见反馈" />
    <textarea
      v-model="isshow.content"
      placeholder="请您填写遇到的问题与建议，我们会第一时间处理"
    ></textarea>
    <input v-model="isshow.phone" type="text" placeholder="手机号码" />
    <button @click="tijiao">提交</button>
  </div>
</template>

<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import { reactive } from 'vue'
import { Toast } from 'vant'
import { api1, post } from '@/utils/request.js'
const isshow = reactive({
  content: '',
  phone: '',
})
const tijiao = () => {
  post(api1 + '/personal/feedback', { content: isshow.content, phone: isshow.phone }).then(
    (res) => {
      Toast('提交成功')
    },
    (err) => {
      Toast.fail('提交失败')
    },
  )
  isshow.content = ''
  isshow.phone = ''
}
</script>
<style scoped lang="scss">
.all {
  width: 100%;
  height: 100vh;
  background-color: #f3f4f6;
}
textarea {
  rows: 10;
  resize: none;
  width: 100%;
  height: 242px;
  margin-top: 12px;
  background-color: #fff;
  border: none;
  font-size: 16px;
  padding-top: 15px;
  text-indent: 30px;
}
input {
  width: 100%;
  height: 58px;
  margin-top: 12px;
  background-color: #fff;
  border: none;
  font-size: 16px;
  text-indent: 30px;
  line-height: 58px;
}
button {
  margin: 29px 0 0 20px;
  width: 374px;
  height: 52px;
  color: #fff;
  font-size: 20px;
  font-weight: 500;
  background-color: #fff;
  border: 1.5px solid #d5d5d5;
  border-radius: 7px;
  left: 20px;
  background-color: #f37c12;
}
</style>
