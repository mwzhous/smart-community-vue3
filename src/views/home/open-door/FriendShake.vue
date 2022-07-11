<template>
  <div class="wrapper">
    <WdNavbar :show-slot="true" title="摇一摇" />
  </div>
  <div class="page">
    <img src="/src/assets/yyy.gif" />
    <span class="text">摇一摇开门</span>
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

img {
  width: 296px;
  height: 296px;
  position: relative;
  left: 59px;
  top: 108px;
}
.text {
  height: 20px;
  font-size: 21px;
  font-family: PingFang;
  font-weight: bold;
  color: #333333;
  position: absolute;
  top: 415px;
  left: 157px;
}
</style>
