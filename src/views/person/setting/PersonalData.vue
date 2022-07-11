<!-- @author: 陈旺 -->
<template>
  <WdNavbar title="个人资料" to="SettingView" />
  <div class="personal">
    <div class="personal__data">
      <div class="data__cell" @click="ShowAvatarChange = true">
        <span>头像</span>
        <div class="right">
          <img :src="user.avatar || DefaultAvatar" alt="" class="data__cell--avatar" />
          <AngleRight class="right-icon" />
        </div>
      </div>
      <div class="data__cell">
        <span>账号</span>
        <div class="right">
          <input v-model="account" type="text" />
          <AngleRight class="right-icon" />
        </div>
      </div>
      <div class="data__cell">
        <span>名字</span>
        <div class="right">
          <input v-model="username" type="text" />
          <AngleRight class="right-icon" />
        </div>
      </div>
      <div class="data__cell">
        <span>性别</span>
        <div class="right">
          <NPopselect v-model:value="gender" :options="options" trigger="click" width="large">
            <span>{{ gender }}</span>
          </NPopselect>

          <AngleRight class="right-icon" />
        </div>
      </div>
      <div class="data__cell">
        <span>地区</span>
        <div class="right" @click="showPopup">
          <span>{{ user.area }}</span>
          <AngleRight class="right-icon" />
        </div>
      </div>
      <div class="data__cell" @click="tobindOwner">
        <span>小区</span>
        <div class="right">
          <span></span>
          <AngleRight class="right-icon" />
        </div>
      </div>
    </div>
    <!-- 弹出层-修改地区 -->
    <Popup v-model:show="showArea" round position="bottom">
      <div class="pop">
        <Area title="地区" :area-list="areaList" @confirm="onAreaConfirm" @cancel="onAreaCancel" />
      </div>
    </Popup>
    <!-- 弹出层-修改头像 -->
    <Popup v-model:show="ShowAvatarChange" round>
      <div
        :style="{
          background: 'url(' + store.getters.userInfo.avatar + ')',
          'background-size': 'cover',
        }"
      >
        <Uploader :after-read="afterRead" :max-count="1" />
      </div>
    </Popup>
    <!-- 账号绑定 -->
    <div class="personal__bind">
      <div class="data__cell">
        <span>手机号</span>
        <div class="right">
          <router-link :to="{ name: 'MobilePhone' }">
            <span>{{ phone }}</span>
          </router-link>
          <AngleRight class="right-icon" />
        </div>
      </div>
      <div class="data__cell">
        <span>钉钉</span>
        <div class="right">
          <router-link :to="{ name: 'BindOthers', query: { type: '钉钉' } }">
            <span>{{ store.getters.userInfo.ddAccount ? '已绑定' : '未绑定' }}</span>
          </router-link>
          <AngleRight class="right-icon" />
        </div>
      </div>
      <div class="data__cell">
        <span>Github</span>
        <div class="right">
          <router-link :to="{ name: 'BindOthers', query: { type: 'GitHub' } }">
            <span>{{ store.getters.userInfo.githubAccount ? '已绑定' : '未绑定' }}</span>
          </router-link>

          <AngleRight class="right-icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DefaultAvatar from '@/assets/img/DefaultAvatar.png'
import WdNavbar from '@/components/WdNavbar.vue'
import { AngleRight } from '@vicons/fa'
import { computed, ref, watchEffect, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { NPopselect } from 'naive-ui'
import { Popup, Area, Toast, Uploader } from 'vant'
import { areaList } from '@vant/area-data'
import { put, api1 } from '@/utils/request'
import axios from 'axios'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()
const user = computed(() => {
  return store.getters.userInfo
})
const ShowAvatarChange = ref(false)
const phone = computed(() => {
  let phoneNumber = store.getters.userInfo.phone
  if (phoneNumber) {
    return phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  } else return '未绑定'
})
const username = ref(store.getters.userInfo.username)
const account = ref(store.getters.userInfo.account)
const gender = ref(store.getters.userInfo.gender)
const options = [
  {
    label: '男',
    value: '男',
  },
  {
    label: '女',
    value: '女',
  },
  {
    label: '保密',
    value: '保密',
  },
]
onUnmounted(() => {
  // 离开页面时提交修改个人信息
  savaInfo()
})
// 提交修改信息
const savaInfo = () => {
  put(api1 + '/personal', user.value)
    .then(() => {
      // Toast.success('修改成功')
    })
    .catch((err) => {
      Toast.fail('修改失败，请重试')
      // 触发获取用户信息的 action
      store.dispatch('user/getUserInfo')
      // console.log(err)
    })
}
// 地区选择
const showArea = ref(false)
const showPopup = () => {
  showArea.value = true
}
const onAreaCancel = () => {
  showArea.value = false
}
const onAreaConfirm = (val) => {
  store.getters.userInfo.area = val[0].name + '-' + val[1].name + '-' + val[2].name
  showArea.value = false
}
// 完成头像上传的回调
const afterRead = (file) => {
  file.status = 'uploading'
  file.message = '上传中...'
  const imgFile = new FormData()
  imgFile.append('avatar', file.file)
  axios
    .post('http://106.14.169.149:8081/api/avatar/upload', imgFile, {
      headers: {
        token: store.getters.token,
      },
    })
    .then((res) => {
      store.getters.userInfo.avatar = res.data.data
      Toast.success('上传成功')
    })
    .catch(() => {
      Toast.fail('上传失败，请重试')
    })
}

// 监听后回调
watchEffect(() => {
  store.getters.userInfo.gender = gender.value
  store.getters.userInfo.username = username.value
  store.getters.userInfo.account = account.value
  // store.getters.userInfo.account = account.value.split(' ').join('')
})
const tobindOwner = () => {
  router.push({ name: 'BindOwner' })
}
</script>
<style scoped lang="scss">
.personal {
  background-color: #f3f4f6;
  height: calc(100vh - 44px);
  padding-top: 12px;
  &__bind {
    background-color: #fff;
    margin-top: 12px;
    margin-left: 15px;
  }
  &__data {
    background-color: $cf;
    @at-root .data__cell {
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
          // outline: 1px solid black;
          background: #f1f1f1;
        }
      }
      .right {
        display: flex;
        align-items: center;
      }
      &--avatar {
        height: 45px;
        width: 45px;
        border-radius: 50%;
      }
    }
  }
}
.right-icon {
  height: 20px;
  color: $cb;
  padding-left: 15px;
}

.pop {
  width: 400px;
  height: 300px;
}
:deep(.van-uploader__upload) {
  background-color: transparent;
  height: 200px;
  width: 200px;
}
</style>
