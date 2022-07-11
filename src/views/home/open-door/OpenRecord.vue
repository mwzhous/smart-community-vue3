/* *@description:社区活动 *@author: 徐杰文 *@date: 2022-05-16 */
<template>
  <div class="wrapper">
    <WdNavbar
      :show-slot="true"
      title="开门记录"
    />
  </div>
  <div class="main">
    <ul class="page">
      <li class="box1">
        <p class="text1">我的世界</p>
        <p class="text2">2022-05-16</p>
        <p class="text3">远程开门</p>
      </li>
      <li class="box2">
        <p class="text1">张三</p>
        <p class="text2">2022-05-16</p>
        <p class="text3">邀请开门(远程)</p>
      </li>
    </ul>
  </div>
</template>
<script setup>
import WdNavbar from '../../../components/WdNavbar.vue'
</script>
<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  li {
    list-style: none;
    margin: 6px;
    width: 392px;
    height: 71px;
    background: #fff;
    border-radius: 6px;
    position: absolute;
    box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
    left: 5px;
}

  .main {
    width: 414px;
    height: 700px;
    background: #f0f1f4;
    position: fixed;
  }

  ul {
    /* 列表前面点的设置 */
    list-style: none;
    .box1 {
      top: 6px;
      .text1 {
        width: 80px;
        height: 16px;
        font-size: 18px;
        font-family: PingFang;
        font-weight: bold;
        position: absolute;
        top: 14px;
        left: 22px;
      }
      .text2 {
        width: 100px;
        height: 16px;
        font-size: 16px;
        font-family: PingFang;
        color: #888888;
        position: absolute;
        top: 44px;
        left: 22px;
      }
      .text3 {
        width: 100px;
        height: 16px;
        font-size: 18px;
        font-family: PingFang;
        font-weight: bold;
        color: #ff4444;
        position: absolute;
        top: 14px;
        left: 300px;
      }
    }
    .box2 {
      top: 89px;
      .text1 {
        width: 80px;
        height: 16px;
        font-size: 18px;
        font-family: PingFang;
        font-weight: bold;
        position: absolute;
        top: 14px;
        left: 22px;
      }
      .text2 {
        width: 100px;
        height: 16px;
        font-size: 16px;
        font-family: PingFang;
        color: #888888;
        position: absolute;
        top: 44px;
        left: 22px;
      }
      .text3 {
        width: 130px;
        height: 16px;
        font-size: 18px;
        font-family: PingFang;
        font-weight: bold;
        color: #ff4444;
        position: absolute;
        top: 14px;
        left: 250px;
      }
    }
  }


</style>
