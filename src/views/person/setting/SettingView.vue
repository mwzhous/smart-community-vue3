/* *@description: 设置页面 *@author: 肖展鹏 *@date: 2022-05-14 */
<template>
  <div class="all">
    <navbar title="设置" to="PersonView" />
    <div class="setting">
      <div class="setting__one">
        <div class="setting__one__item">
          <router-link :to="{ name: 'ResetView' }">
            <span>修改密码</span><AngleRight class="iconfont" />
          </router-link>
        </div>
      </div>

      <div class="setting__two">
        <div class="setting__two__item line">
          <router-link :to="{ name: 'PersonalData' }">
            <span>个人资料</span><AngleRight class="iconfont"
          /></router-link>
        </div>
        <div class="setting__two__item line">
          <router-link :to="{ name: 'AdviceFeedback' }">
            <span>意见反馈</span><AngleRight class="iconfont" />
          </router-link>
        </div>
        <div class="setting__two__item">
          <router-link :to="{ name: 'AboutUs' }">
            <span>关于我们</span><AngleRight class="iconfont" />
          </router-link>
        </div>
      </div>
    </div>
    <Button class="button" @click="logoutHandler">退出登录</Button>
  </div>
</template>
<script setup>
import { AngleRight } from '@vicons/fa'
import { Button } from 'vant'
import navbar from '@/components/WdNavbar.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

// 退出登录
const logoutHandler = () => {
  store.dispatch('user/logout').then(() => {
    router.push('/login')
  })
}
</script>
<style lang="scss" scoped>
a {
  color: #222222;
}
.all {
  width: 100%;
  height: 100vh;
  background-color: #f3f4f6;
}
.line {
  border-bottom: 1px solid #e8e8e8;
}
.setting {
  a {
    color: #000;
  }
  &__one {
    margin-top: 12px;
    &__item {
      color: #333333;
      font-size: 16px;
      height: 58px;
      width: 100%;
      line-height: 58px;
      background-color: #fff;
    }
    &__item span {
      margin-left: 22px;
    }
  }
  &__two {
    margin-top: 12px;
    &__item {
      color: #333333;
      font-size: 16px;
      height: 58px;
      width: 100%;
      line-height: 58px;
      background-color: #fff;
    }
    &__item span {
      margin-left: 22px;
    }
  }
}
.iconfont {
  height: 12px;
  width: 7px;
  margin-left: 304px;
}
.button {
  width: 374px;
  height: 52px;
  color: #000;
  font-size: 20px;
  font-weight: 500;
  background-color: #fff;
  border: 1.5px solid #d5d5d5;
  border-radius: 7px;
  left: 20px;
  margin-top: 20px;
}

.ChevronLeft {
  width: 9px;
  height: 16px;
}
.nar {
  height: 44px;
  font-size: 19px;
  text-align: center;
  padding-top: 9px;
}
</style>
