<template>
  <WdNavbar :title="thisAccount ? '解除绑定' : '绑定' + bindType" />
  <div class="wrapper">
    <img :src="store.getters.userInfo.avatar" alt="" />
    <p>{{ thisAccount ? '已绑定' : '未绑定' }}{{ bindType }}</p>
    <p v-show="thisAccount">{{ thisAccount }}</p>
    <ol class="wrapper__tips">
      <li>您可以点击下方按钮解除与当前{{ bindType }}的绑定，或绑定新的{{ bindType }}账号</li>
    </ol>
    <NButton v-if="thisAccount" @click="unbind">解除绑定</NButton>
    <NButton v-else @click="toBind">去绑定</NButton>
  </div>
</template>
<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import { useStore } from 'vuex'
import { get, put, api1 } from '@/utils/request'
import { useRoute } from 'vue-router'
import { computed } from '@vue/runtime-core'
import { Toast } from 'vant'
const route = useRoute()
const bindType = route.query.type
const store = useStore()
const ddAccount = store.getters.userInfo.ddAccount
const githubAccount = store.getters.userInfo.githubAccount
const thisAccount = computed(() => {
  return bindType == 'GitHub' ? githubAccount : ddAccount
})
// 账号绑定
const toBind = () => {
  if (bindType == '钉钉') {
    get('/dd/render').then((res) => {
      // console.log(res)
      window.location.href = res
    })
  } else if (bindType == 'GitHub') {
    get('/github/render').then((res) => {
      // console.log(res)
      window.location.href = res
    })
  } else {
    // console.log('错误')
  }
}
// 解除绑定
const unbind = () => {
  if (bindType == '钉钉') {
    put(api1 + '/personal', {
      id: store.getters.userInfo.id,
      gender: store.getters.userInfo.gender,
      ddAccount: '',
    })
      .then(() => {
        Toast.success('解绑成功')
      })
      .catch(() => {
        Toast.fail('解绑失败')
      })
  }
  if (bindType == 'GitHub') {
    put(api1 + '/personal', {
      id: store.getters.userInfo.id,
      gender: store.getters.userInfo.gender,
      githubAccount: '',
    })
      .then(() => {
        Toast.success('解绑成功')
      })
      .catch(() => {
        Toast.fail('解绑失败')
      })
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  background-color: #f3f4f6;
  height: calc(100vh - 44px);
  padding-top: 37px;

  img {
    display: block;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    margin: 0 auto 27px;
  }
  p {
    text-align: center;
    font-size: 21px;
    margin-bottom: 16px;
  }
  &__tips {
    color: $c8;
    @include px(30px);
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
}
</style>
