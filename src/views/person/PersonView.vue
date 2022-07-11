/* *@description: 个人中心页面 *@author: 肖展鹏 *@date: 2022-05-14 */
<template>
  <div class="all">
    <ConfigProvider :theme-vars="themeVars">
      <NavBar title="个人中心" left-arrow fixed placeholder @click-right="onClickRight">
        <template #left>
          <Bell class="icons" />
        </template>
        <template #right>
          <Cog class="icons" />
        </template>
      </NavBar>

      <div class="personal">
        <router-link :to="{ name: 'SignIn' }">
          <div class="sign-in">签到</div>
        </router-link>

        <div class="personal__head">
          <img :src="$store.getters.userInfo.avatar || DefaultAvatar" class="personal__head__pic" />
          <p>{{ $store.getters.userInfo.username }}</p>
        </div>
        <div class="personal__option-one">
          <div class="personal__option-one__content">
            <router-link :to="{ name: 'ChangeCommu' }">
              <div class="personal__option-one__content__item line">
                <City class="icon" style="color: #ffb700" /><span>切换小区</span
                ><AngleRight class="iconfont" />
              </div>
            </router-link>
            <router-link :to="{ name: 'FamilyMember' }">
              <div class="personal__option-one__content__item line">
                <UserFriends class="icon" style="color: #fb6e52" /><span>家庭成员</span
                ><AngleRight class="iconfont" />
              </div>
            </router-link>

            <router-link :to="{ name: 'CollectView' }">
              <div class="personal__option-one__content__item">
                <Star class="icon" style="color: #fb6e52" /><span>我的收藏</span
                ><AngleRight class="iconfont" />
              </div>
            </router-link>
          </div>
        </div>
        <div class="personal__option-two">
          <div class="personal__option-one__content">
            <router-link :to="{ name: 'MyWallet' }">
              <div class="personal__option-one__content__item line">
                <Wallet class="icon" style="color: #fb6e52" /><span>我的钱包</span
                ><AngleRight class="iconfont" />
              </div>
            </router-link>

            <router-link :to="{ name: 'MyIntegral' }">
              <div class="personal__option-one__content__item line">
                <YenSign class="icon" style="color: #8fc31f" /><span>积分</span
                ><AngleRight class="iconfont" />
              </div>
            </router-link>

            <router-link :to="{ name: 'MyOrder' }">
              <div class="personal__option-one__content__item line">
                <Coins class="icon" style="color: #ff8e43" /><span>我的订单</span
                ><AngleRight class="iconfont" />
              </div>
            </router-link>

            <router-link :to="{ name: 'MyCoupon' }">
              <div class="personal__option-one__content__item">
                <ClipboardList class="icon" style="color: #fb6e52" /><span>优惠券</span
                ><AngleRight class="iconfont" />
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </ConfigProvider>
  </div>
</template>
<script setup>
import DefaultAvatar from '@/assets/img/DefaultAvatar.png'
import { NavBar, ConfigProvider } from 'vant'
import { useRouter } from 'vue-router'
import {
  Bell,
  Cog,
  City,
  UserFriends,
  Star,
  Wallet,
  YenSign,
  Coins,
  ClipboardList,
  AngleRight,
} from '@vicons/fa'
const router = useRouter()
const themeVars = {
  navBarHeight: '44px',
  navBarIconColor: '#000',
  navBarArrowSize: '16px',
  navBarTitleFontSize: '19px',
}

const onClickRight = () => {
  router.push('/person/setting')
}
</script>
<style lang="scss" scoped>
.all {
  width: 100%;
  height: 100vh;
  background-color: #f3f4f6;
}
a {
  color: #222222;
}
.icons {
  width: 18px;
  height: 18px;
  color: #a1a1a1;
}
.icon {
  width: 18px;
  height: 18px;
  color: #a1a1a1;
  margin-right: 13px;
  vertical-align: middle;
}
.iconfont {
  height: 12px;
  width: 7px;
  float: right;
  margin-right: 22px;
  vertical-align: middle;
}
.line {
  border-bottom: 1px solid #e8e8e8;
}
.personal {
  position: relative;
  &__head {
    width: 100%;
    height: 147px;
    font-size: 14px;
    background-color: #fff;
    padding-top: 32px;
    text-align: center;
    &__pic {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }
    p {
      margin-top: 6px;
    }
  }

  &__option-one {
    margin-top: 26px;
    width: 100%;
    height: 173px;
    background-color: #fff;
    &__content {
      width: 403px;
      height: 173px;
      margin-left: 12px;
      &__item {
        font-size: 16px;
        height: 58px;
        padding-top: 22px;
      }
    }
  }
  &__option-two {
    margin-top: 12px;
    width: 100%;
    height: 231px;
    background-color: #fff;
  }
}

.sign-in {
  position: absolute;
  right: 0;
  top: 28px;
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  font-weight: 300px;
  color: #fff;
  background-color: #ea9d86;
  border-radius: 40px 0 0 40px;
}
</style>
