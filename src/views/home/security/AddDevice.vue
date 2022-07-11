<template>
  <WdNavbar title="添加设备" />
  <div class="wrapper">
    <div class="data__cell">
      <span>设备分类</span>
      <div class="right">
        <NPopselect v-model:value="type" :options="options" trigger="click" width="large">
          <span>{{ type }}</span>
        </NPopselect>
        <AngleRight class="right-icon" />
      </div>
    </div>
    <div class="data__cell">
      <span>设备名称</span>
      <div class="right">
        <input v-model="equipmentName" type="text" placeholder="请输入设备名称" />
      </div>
    </div>
    <div class="data__cell">
      <span>设备序列号</span>
      <div class="right">
        <input v-model="deviceSerial" type="text" placeholder="请输入设备序列号" />
      </div>
    </div>
    <div class="data__cell">
      <span>设备验证码</span>
      <div class="right">
        <input v-model="validateCode" type="text" placeholder="请输入设备验证码" />
      </div>
    </div>
  </div>
  <NButton @click="submit">添加设备</NButton>
</template>
<script setup>
import { ref } from '@vue/reactivity'
import WdNavbar from '@/components/WdNavbar.vue'
import { AngleRight } from '@vicons/fa'
import { NPopselect } from 'naive-ui'
import { computed } from '@vue/runtime-core'
import { post, api4 } from '@/utils/request'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
const router = useRouter()
const equipmentName = ref('')
const deviceSerial = ref('')
const validateCode = ref('')
const type = ref('插座')
const options = [
  {
    label: '开关',
    value: '开关',
  },
  {
    label: '插座',
    value: '插座',
  },
  {
    label: '灯',
    value: '灯',
  },
]
const typeValue = computed(() => {
  switch (type.value) {
    case '开关':
      return 0
    case '插座':
      return 1
    case '灯':
      return 2
  }
})
const submit = () => {
  post(api4 + '/smartHome/add', {
    deviceSerial: deviceSerial.value,
    validateCode: validateCode.value,
    deviceName: equipmentName.value,
    type: typeValue.value,
  })
    .then((res) => {
      // console.log(res)
      Toast.success('添加成功')
      router.back()
    })
    .catch(() => {
      Toast.fail('添加失败，请重试')
    })
}
</script>
<style lang="scss" scoped>
.data__cell {
  height: 58px;
  width: 100%;
  @include px(22px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.5px solid #f1f1f1;
  span,
  input {
    font-size: $fs-m;
    color: $c4;
  }
  input {
    text-align: right;
    outline: none;
    border: none;
    background: none;
    width: 100%;
    &:focus {
      background: #f1f1f1;
    }
  }
  .right {
    display: flex;
    align-items: center;
  }
}
.right-icon {
  height: 20px;
  color: $cb;
  padding-left: 15px;
}
button {
  height: 52px;
  width: 374px;
  margin: 30px 20px 0 20px;
  background: $primary-lg;
  color: $cf;
  font-size: 20px;
  border-radius: 8px;
}
</style>
