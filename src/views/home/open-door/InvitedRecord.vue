<template>
  <div class="app">
    <WdNavbar :show-slot="true" title="邀请记录" icon-url="" />
    <div class="cont">
      <span class="text1">张先生</span>
      <div class="text2">1385123695</div>
      <img src="/src/assets/yqjl.png" />
      <span class="text3">2022-05-23 13:00 ~ 2022-05-24 12:00</span>
      <div class="box1">
        <span class="text4">1</span>
        <span class="text5">东门门禁</span>
      </div>
      <div class="box2">
        <span class="text4">1</span>
        <span class="text5">东门门禁</span>
      </div>
      <div class="box3">
        <span class="text4">1</span>
        <span class="text5">东门门禁</span>
      </div>
      <div class="box4">
        <span class="text4">1</span>
        <span class="text5">东门门禁</span>
      </div>
      <div class="box5">
        <span class="text4">1</span>
        <span class="text5">东门门禁</span>
      </div>
      <div class="box6">
        <span class="text4">1</span>
        <span class="text5">东门门禁</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import { api5, get } from '@/utils/request.js'
import { ref } from 'vue'
const invitedData = ref()
get(api5 + '/invitation/record').then((res) => {
  // console.log(res)
  invitedData.value = res
})
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  width: 414px;
  height: 100%;
  background: #f3f4f6;
  position: fixed;
}

.cont {
  width: 391px;
  height: 276px;
  background: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: relative;
  top: 12px;
  left: 12px;
  .text1 {
    height: 18px;
    font-size: 18px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 26px;
    position: absolute;
    top: 13px;
    left: 17px;
  }
  .text2 {
    width: 121px;
    height: 20px;
    background: #ffffff;
    border: 1px solid #f17616;
    color: #f17616;
    border-radius: 10px;
    position: absolute;
    top: 17px;
    left: 86px;
    text-align: center;
  }
  img {
    width: 16px;
    height: 16px;
    position: absolute;
    top: 47px;
    left: 17px;
  }
  .text3 {
    width: 260px;
    height: 11px;
    font-size: 12px;
    font-family: PingFang;
    font-weight: 500;
    color: #888888;
    line-height: 24px;
    position: absolute;
    top: 43px;
    left: 40px;
  }
}

.box1 {
  width: 111px;
  height: 86px;
  background: no-repeat rgba(236, 236, 236, 0) url('/src/assets/s.png') bottom;
  border: 1px solid #cccccc;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: absolute;
  top: 78px;
  left: 17px;
  .text4 {
    width: 12px;
    height: 16px;
    font-size: 21px;
    font-family: PingFang;
    font-weight: bold;
    color: #888888;
    line-height: 46px;
    position: absolute;
    left: 49px;
  }
  .text5 {
    width: 70px;
    height: 15px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 46px;
    position: absolute;
    left: 25px;
    top: 18px;
  }
}
.box2 {
  width: 111px;
  height: 86px;
  background: no-repeat rgba(236, 236, 236, 0) url('/src/assets/s.png') bottom;
  border: 1px solid #cccccc;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: absolute;
  top: 78px;
  left: 140px;
  .text4 {
    width: 12px;
    height: 16px;
    font-size: 21px;
    font-family: PingFang;
    font-weight: bold;
    color: #888888;
    line-height: 46px;
    position: absolute;
    left: 49px;
  }
  .text5 {
    width: 70px;
    height: 15px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 46px;
    position: absolute;
    left: 25px;
    top: 18px;
  }
}
.box3 {
  width: 111px;
  height: 86px;
  background: no-repeat rgba(236, 236, 236, 0) url('/src/assets/s.png') bottom;
  border: 1px solid #cccccc;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: absolute;
  top: 78px;
  left: 263px;
  .text4 {
    width: 12px;
    height: 16px;
    font-size: 21px;
    font-family: PingFang;
    font-weight: bold;
    color: #888888;
    line-height: 46px;
    position: absolute;
    left: 49px;
  }
  .text5 {
    width: 70px;
    height: 15px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 46px;
    position: absolute;
    left: 25px;
    top: 18px;
  }
}
.box4 {
  width: 111px;
  height: 86px;
  background: no-repeat rgba(236, 236, 236, 0) url('/src/assets/s.png') bottom;
  border: 1px solid #cccccc;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: absolute;
  top: 175px;
  left: 17px;
  .text4 {
    width: 12px;
    height: 16px;
    font-size: 21px;
    font-family: PingFang;
    font-weight: bold;
    color: #888888;
    line-height: 46px;
    position: absolute;
    left: 49px;
  }
  .text5 {
    width: 70px;
    height: 15px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 46px;
    position: absolute;
    left: 25px;
    top: 18px;
  }
}
.box5 {
  width: 111px;
  height: 86px;
  background: no-repeat rgba(236, 236, 236, 0) url('/src/assets/s.png') bottom;
  border: 1px solid #cccccc;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: absolute;
  top: 175px;
  left: 140px;
  .text4 {
    width: 12px;
    height: 16px;
    font-size: 21px;
    font-family: PingFang;
    font-weight: bold;
    color: #888888;
    line-height: 46px;
    position: absolute;
    left: 49px;
  }
  .text5 {
    width: 70px;
    height: 15px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 46px;
    position: absolute;
    left: 25px;
    top: 18px;
  }
}
.box6 {
  width: 111px;
  height: 86px;
  background: no-repeat rgba(236, 236, 236, 0) url('/src/assets/s.png') bottom;
  border: 1px solid #cccccc;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: absolute;
  top: 175px;
  left: 263px;
  .text4 {
    width: 12px;
    height: 16px;
    font-size: 21px;
    font-family: PingFang;
    font-weight: bold;
    color: #888888;
    line-height: 46px;
    position: absolute;
    left: 49px;
  }
  .text5 {
    width: 70px;
    height: 15px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 46px;
    position: absolute;
    left: 25px;
    top: 18px;
  }
}
</style>
