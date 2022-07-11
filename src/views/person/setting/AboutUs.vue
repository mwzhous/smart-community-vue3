<template>
  <div class="all">
    <!-- navbar -->
    <WdNavbar title="关于我们" />

    <div class="about">关于福来来</div>
    <p class="contant">
      福莱来一款专门为社区安全和物业管理服务而打造的互联网应用平台，它为业主量身定制了各种丰富多彩的移动互联网应用，为小区住户提供一个安全、舒适、和谐的现代智能生活
    </p>
    <img src="https://riddler.oss-cn-shanghai.aliyuncs.com/upload/又不是不能用.png" alt="" />
    <img src="https://riddler.oss-cn-shanghai.aliyuncs.com/upload/垃圾.png" alt="" />
  </div>
</template>

<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
</script>
<style scoped lang="scss">
.all {
  width: 100%;
  height: 100vh;
  background-color: #f3f4f6;
  img {
    display: block;
    width: 100%;
    padding-top: 10px;
  }
}
.about {
  color: #ff0000;
  height: 30px;
  line-height: 30px;
  margin: 50px 20px 50px 20px;
}
.about::before {
  content: '';
  border: 1px solid #ff0000;
}
.contant {
  margin: 0 20px 0 20px;
}
</style>
