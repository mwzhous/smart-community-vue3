/* *@description:社区活动 *@author: 徐杰文 *@date: 2022-05-14 */
<template>
  <div class="page">
    <div class="container">
      <div class="wrapper">
        <WdNavbar :show-slot="true" title="智慧开门" :on-click-right="onClickRight" />
      </div>

      <router-link :to="{ name: 'InviteVisitor' }">
        <div class="text">访客邀请</div>
      </router-link>
      <div class="btn1" @click="goto('FriendShake')">
        <span class="text1">摇一摇</span>
        <span class="text2">手机摇一摇开门</span>
        <img src="/src/assets/open1.png" class="pho1" />
      </div>
      <div class="btn2">
        <span class="text1">二维码</span>
        <span class="text2">扫描二维码开门</span>
        <img src="/src/assets/open2.png" class="pho1" />
      </div>
      <div class="btn3" @click="goto('ImmediatelyOpen')">
        <span class="text1">一键开门</span>
        <span class="text2">轻松一键开门</span>
        <img src="/src/assets/open3.png" class="pho3" />
      </div>
      <!-- <router-link :to="{ name: 'OpenRecord' }">
      <NButton type="info">开门记录</NButton>
    </router-link> -->
    </div>
    <div style="width: 100%; height: 36px; line-height: 36px; display: flex">
      <span
        style="display: inline-block; flex: 1; border-top: 1px solid #cccccc; margin-top: 18px"
      ></span>
      <router-link :to="{ name: 'OpenRecord' }">
        <span style="margin-left: 5px; margin-right: 5px; color: #aaaaaa">开门记录</span>
      </router-link>
      <span
        style="display: inline-block; flex: 1; border-top: 1px solid #cccccc; margin-top: 18px"
      ></span>
    </div>
    <div class="record1">
      <span class="text1">张先生</span>
      <span class="text2">2022-05-13 15:34</span>
      <span class="text3">邀请开门</span>
    </div>
    <div class="record2">
      <span class="text1">房主</span>
      <span class="text2">2022-05-13 15:34</span>
    </div>
  </div>
</template>
<script setup>
import WdNavbar from '../../../components/WdNavbar.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const goto = (pathName) => {
  router.push({ name: pathName })
}
const onClickRight = () => {
  router.push('/home/door/visitor')
}
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.page {
  width: 414px;
  height: 736px;
  background-color: #f3f4f6;
  position: fixed;
}

.container {
  width: 414px;
  height: 270px;
  background: #ffffff;
  position: flex;
  bottom: 466px;
}

.pho1 {
  width: 58px;
  height: 74px;
  position: absolute;
  left: 10px;
  top: 9px;
}

.btn1 {
  width: 181px;
  height: 83px;
  background: linear-gradient(-30deg, rgba(255, 91, 60, 0.8), rgba(255, 188, 175, 0.8));
  border-radius: 6px;
  position: absolute;
  top: 74px;
  left: 20px;
  float: left;
}

.btn1 .text1 {
  width: 54px;
  height: 17px;
  font-size: 18px;
  font-family: PingFang;
  font-weight: bold;
  color: #ffffff;
  line-height: 22px;
  position: relative;
  top: 23px;
  left: 72px;
}

.btn1 {
  .text2 {
    width: 91px;
    height: 12px;
    font-size: 13px;
    font-family: PingFang;
    font-weight: 400;
    color: #ffffff;
    position: absolute;
    top: 51px;
    left: 72px;
  }
}
.btn2 {
  width: 181px;
  height: 83px;
  background: linear-gradient(-30deg, #ffb323, #ffdfa3);
  border-radius: 6px;
  position: absolute;
  top: 169px;
  left: 20px;
  float: left;
  .text1 {
    width: 54px;
    height: 17px;
    font-size: 18px;
    font-family: PingFang;
    font-weight: bold;
    color: #ffffff;
    line-height: 22px;
    position: relative;
    top: 23px;
    left: 72px;
  }
  .text2 {
    width: 91px;
    height: 12px;
    font-size: 13px;
    font-family: PingFang;
    font-weight: 400;
    color: #ffffff;
    position: absolute;
    top: 51px;
    left: 72px;
  }
}

.btn3 {
  width: 181px;
  height: 178px;
  background: linear-gradient(-30deg, #ff9023, #ffcca3);
  border-radius: 6px;
  position: absolute;
  top: 74px;
  left: 213px;
  .pho3 {
    width: 83px;
    height: 115px;
    position: absolute;
    top: 3px;
    left: 50px;
  }
  .text1 {
    width: 71px;
    height: 18px;
    font-size: 18px;
    font-family: PingFang;
    font-weight: bold;
    color: #ffffff;
    position: relative;
    top: 115px;
    left: 55px;
  }
  .text2 {
    width: 77px;
    height: 12px;
    font-size: 13px;
    font-family: PingFang;
    font-weight: 400;
    color: #ffffff;
    position: relative;
    top: 135px;
    right: 20px;
  }
}

.xian {
  width: 374px;
  height: 1px;
  background-color: #d0d0d0;
  position: absolute;
  top: 293px;
  left: 20px;
}

.openr {
  width: 65px;
  height: 15px;
  font-size: 16px;
  font-family: PingFang;
  font-weight: 500;
  color: #888888;
  position: absolute;
  top: 280px;
  left: 173px;
}
.record1 {
  width: 374px;
  height: 78px;
  background: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-left: 6px solid #00be81;
  border-radius: 5px;
  position: absolute;
  top: 313px;
  left: 20px;
  .text1 {
    width: 50px;
    height: 16px;
    font-size: 17px;
    font-family: PingFang;
    font-weight: 500;
    color: #333333;
    position: relative;
    left: 23px;
    top: 16px;
  }
  .text2 {
    width: 159px;
    height: 12px;
    font-size: 15px;
    font-family: PingFang;
    font-weight: 400;
    color: #666666;
    line-height: 22px;
    position: relative;
    top: 48px;
    left: -30px;
  }
  .text3 {
    width: 60px;
    height: 15px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: 500;
    color: #f75353;
    position: relative;
    left: 110px;
    top: 13px;
  }
}

.record2 {
  width: 374px;
  height: 78px;
  background: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-left: 6px solid #00be81;
  border-radius: 5px;
  position: absolute;
  top: 402px;
  left: 20px;
  .text1 {
    width: 50px;
    height: 16px;
    font-size: 17px;
    font-family: PingFang;
    font-weight: 500;
    color: #333333;
    position: relative;
    left: 23px;
    top: 16px;
  }
  .text2 {
    width: 159px;
    height: 12px;
    font-size: 15px;
    font-family: PingFang;
    font-weight: 400;
    color: #666666;
    line-height: 22px;
    position: relative;
    top: 48px;
    left: -11px;
  }
}

.text {
  width: 70px;
  height: 20px;
  font-size: 16px;
  font-family: PingFang;
  font-weight: 400;
  color: #333333;
  position: absolute;
  top: 12px;
  left: 333px;
  z-index: 100;
}
</style>
