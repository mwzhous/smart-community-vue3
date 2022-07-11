/* *@description: 我的收藏页面 *@author: 肖展鹏 *@date: 2022-05-14 */
<template>
  <div class="all">
    <WdNavBar title="我的收藏" />
    <div>
      <tabs v-model:active="active" class="all__tabs">
        <tab title="咨询" class="tt"><mycard :active="active" /></tab>
        <tab title="社区交流" class="tt"><mycard :active="active" /></tab>
        <tab title="房产详情" class="tt"><mycard :active="active" /></tab>
        <tab title="跳蚤市场" class="tt"><mycard :active="active" /></tab>
      </tabs>
    </div>
  </div>
</template>
<script setup>
import { Tab, Tabs } from 'vant'
import mycard from '@/components/xzpCard.vue'
import WdNavBar from '@/components/WdNavbar.vue'
import { ref } from 'vue'

const active = ref(0)
</script>
<style lang="scss" scoped>
.all {
  position: relative;
  &__tabs {
    position: sticky;
    top: 64px;
    left: 0;
    .tt {
      height: calc(100vh - 80px);
      overflow: scroll;
    }
  }
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
.card {
  font-size: 15px;
}
</style>
