/* *@description:物业服务 *@author: 龚俊溢 *@date: 2022-05-15 */
<template>
  <div class="pg">
    <div class="wrapper">
      <WdNavbar title="物业服务" />
    </div>

    <router-link :to="{ name: 'PropertyCost' }">
      <div class="cont1">
        <div class="bg">
          <div><img class="pic" src="/src/assets/images/commercial_service_06.png" alt="" /></div>
        </div>
        <div class="abg">
          <p class="words">物业缴费</p>
          <p class="words1">在线缴费</p>
        </div>
      </div>
    </router-link>

    <router-link :to="{ name: 'OnlineRepair' }">
      <div class="cont2">
        <div class="bg1">
          <div><img class="pic" src="/src/assets/images/commercial_service_03.png" alt="" /></div>
        </div>
        <div class="abg">
          <p class="words">在线报修</p>
          <p class="words1">快速报修</p>
        </div>
      </div>
    </router-link>

    <router-link :to="{ name: 'CommunityActivity' }">
      <div class="cont3">
        <div class="bg2">
          <div><img class="pic" src="/src/assets/images/commercial_service_11.png" alt="" /></div>
        </div>
        <div class="abg">
          <p class="words">社区活动</p>
          <p class="words1">活动投票</p>
        </div>
      </div>
    </router-link>

    <router-link :to="{ name: 'SuggestView' }">
      <div class="cont4">
        <div class="bg3">
          <div><img class="pic" src="/src/assets/images/commercial_service_10.png" alt="" /></div>
        </div>
        <div class="abg">
          <p class="words">投诉建议</p>
          <p class="words1">意见反馈</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import WdNavbar from '../../../components/WdNavbar.vue'
</script>

<style lang="scss" scoped>
.pg {
  background-color: #f1f2f4;
  width: 414px;
  height: 736px;
}
.cont1 {
  position: absolute;
  width: 190px;
  height: 86px;
  background: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 3px;
  left: 12px;
  top: 77px;
}
.cont2 {
  position: absolute;
  width: 190px;
  height: 86px;
  background: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 3px;
  left: 210px;
  top: 77px;
}
.cont3 {
  position: absolute;
  width: 190px;
  height: 86px;
  background: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 3px;
  left: 12px;
  top: 175px;
}
.cont4 {
  position: absolute;
  width: 190px;
  height: 86px;
  background: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 3px;
  left: 210px;
  top: 175px;
}
.bg {
  width: 5px;
  height: 86px;
  background: #4776e7;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.bg1 {
  width: 5px;
  height: 86px;
  background: #f75353;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.bg2 {
  width: 5px;
  height: 86px;
  background: #66c746;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.bg3 {
  width: 5px;
  height: 86px;
  background: #3598dc;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.abg {
  position: relative;
  background: #ffffff;
  width: 80px;
  height: 40px;
  left: 80px;
  bottom: 55px;
}
.pic {
  position: relative;
  width: 45px;
  height: 32px;
  left: 19px;
  top: 27px;
}
.words {
  position: relative;
  height: 17px;
  font-size: 18px;
  font-family: PingFang;
  font-weight: 500;
  color: #333333;
  bottom: 10px;
}
.words1 {
  height: 12px;
  font-size: 13px;
  font-family: PingFang;
  font-weight: 400;
  color: #666666;
}
</style>
