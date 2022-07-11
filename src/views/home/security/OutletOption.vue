<template>
  <WdNavbar
    :title="deviceSerial"
    :show-slot="true"
    right-txt="删除设备"
    :on-click-right="delDevice"
  />
  <div>
    <img
      v-if="!checked"
      src="https://riddler.oss-cn-shanghai.aliyuncs.com/upload/mie.png"
      class="off"
    />
    <img v-else src="https://riddler.oss-cn-shanghai.aliyuncs.com/upload/liang.png" class="off" />
    <div class="option">
      <Switch
        v-model="checked"
        active-color="green"
        inactive-color="#dcdee0"
        size="100px"
        @change="enable"
      >
      </Switch>
    </div>
  </div>
</template>
<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import { get, api4, post } from '@/utils/request'
import { useRoute, useRouter } from 'vue-router'
import { Switch, Toast } from 'vant'
import { ref } from 'vue'
const route = useRoute()
const router = useRouter()

const deviceSerial = route.params.deviceSerial
const checked = ref(false)
const deviceInfo = () => {
  get(api4 + '/smartHome/getSocketInfo', {
    deviceSerial,
  }).then((res) => {
    if (res.data.isEnable == 1) {
      checked.value = true
    }
  })
}
deviceInfo()
const enable = (val) => {
  if (val) {
    post(api4 + '/smartHome/socket/enable', {
      deviceSerial,
      cmd: 1,
    })
      .then((res) => {
        // console.log(res)
      })
      .catch(() => {
        Toast.fail('启动失败')
        checked.value = false
      })
  } else {
    post(api4 + '/smartHome/socket/enable', {
      deviceSerial,
      cmd: 0,
    })
      .then((res) => {
        // console.log(res)
      })
      .catch(() => {
        Toast.fail('关闭失败')
        checked.value = true
      })
  }
}
// 删除设备
const delDevice = () => {
  post(api4 + '/smartHome/delete', {
    deviceSerial,
  }).then(() => {
    Toast.fail('删除成功')
    router.back()
  })
}
</script>
<style lang="scss" scoped>
.off {
  margin-top: 20px;
  @include wh(414px, 450px);
}
.option {
  display: flex;
  justify-content: center;
}
</style>
