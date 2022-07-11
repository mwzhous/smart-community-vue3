<template>
  <!-- navbar -->
  <WdNavbar title="一键开门" />
  <div class="page">
    <div class="main">
      <div class="box1">
        <img src="/src/assets/ms.png" />
        <span>东门门禁</span>
      </div>
      <div class="box2">
        <img src="/src/assets/ms.png" />
        <span>南门门禁</span>
      </div>
      <div class="box3">
        <img src="/src/assets/ms.png" />
        <span>西门门禁</span>
      </div>
      <div class="box4">
        <img src="/src/assets/ms.png" />
        <span>104</span>
      </div>
      <div class="box5">
        <img src="/src/assets/ms.png" />
        <span>401</span>
      </div>
      <div class="box6">
        <img src="/src/assets/ms.png" />
        <span>304</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
</script>
<style scoped lang="scss">
.page {
  width: 414px;
  height: 100%;
  position: fixed;
  background-color: #f3f4f6;
}

.main {
  width: 391px;
  height: 230px;
  background: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: relative;
  top: 20px;
  left: 12px;
}
.box1 {
  width: 111px;
  height: 86px;
  background: linear-gradient(0deg, rgba(215, 215, 215, 0.2), rgba(255, 255, 255, 0.2));
  border: 1px solid #cccccc;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: absolute;
  top: 20px;
  left: 17px;
  img {
    width: 35px;
    height: 35px;
    background: linear-gradient(-30deg, #f75353, #ff8585);
    border-radius: 50%;
    position: absolute;
    top: 14px;
    left: 38px;
  }
  span {
    width: 80px;
    height: 20px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 20px;
    position: absolute;
    top: 57px;
    left: 23px;
  }
}

.box2 {
  width: 111px;
  height: 86px;
  background: linear-gradient(0deg, rgba(215, 215, 215, 0.2), rgba(255, 255, 255, 0.2));
  border: 1px solid #cccccc;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: absolute;
  top: 20px;
  left: 140px;
  img {
    width: 35px;
    height: 35px;
    background: linear-gradient(-30deg, #f75353, #ff8585);
    border-radius: 50%;
    position: absolute;
    top: 14px;
    left: 38px;
  }
  span {
    width: 80px;
    height: 20px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 20px;
    position: absolute;
    top: 57px;
    left: 23px;
  }
}

.box3 {
  width: 111px;
  height: 86px;
  background: linear-gradient(0deg, rgba(215, 215, 215, 0.2), rgba(255, 255, 255, 0.2));
  border: 1px solid #cccccc;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: absolute;
  top: 20px;
  left: 263px;
  img {
    width: 35px;
    height: 35px;
    background: linear-gradient(-30deg, #f75353, #ff8585);
    border-radius: 50%;
    position: absolute;
    top: 14px;
    left: 38px;
  }
  span {
    width: 80px;
    height: 20px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 20px;
    position: absolute;
    top: 57px;
    left: 23px;
  }
}

.box4 {
  width: 111px;
  height: 86px;
  background: linear-gradient(0deg, rgba(215, 215, 215, 0.2), rgba(255, 255, 255, 0.2));
  border: 1px solid #cccccc;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: absolute;
  top: 118px;
  left: 17px;
  img {
    width: 35px;
    height: 35px;
    background: linear-gradient(-30deg, #f75353, #ff8585);
    border-radius: 50%;
    position: absolute;
    top: 14px;
    left: 38px;
  }
  span {
    width: 80px;
    height: 20px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 20px;
    position: absolute;
    top: 57px;
    left: 40px;
  }
}

.box5 {
  width: 111px;
  height: 86px;
  background: linear-gradient(0deg, rgba(215, 215, 215, 0.2), rgba(255, 255, 255, 0.2));
  border: 1px solid #cccccc;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: absolute;
  top: 118px;
  left: 140px;
  img {
    width: 35px;
    height: 35px;
    background: linear-gradient(-30deg, #f75353, #ff8585);
    border-radius: 50%;
    position: absolute;
    top: 14px;
    left: 38px;
  }
  span {
    width: 80px;
    height: 20px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 20px;
    position: absolute;
    top: 57px;
    left: 40px;
  }
}

.box6 {
  width: 111px;
  height: 86px;
  background: linear-gradient(0deg, rgba(215, 215, 215, 0.2), rgba(255, 255, 255, 0.2));
  border: 1px solid #cccccc;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: absolute;
  top: 118px;
  left: 263px;
  img {
    width: 35px;
    height: 35px;
    background: linear-gradient(-30deg, #f75353, #ff8585);
    border-radius: 50%;
    position: absolute;
    top: 14px;
    left: 38px;
  }
  span {
    width: 80px;
    height: 20px;
    font-size: 16px;
    font-family: PingFang;
    font-weight: bold;
    color: #333333;
    line-height: 20px;
    position: absolute;
    top: 57px;
    left: 40px;
  }
}
</style>
