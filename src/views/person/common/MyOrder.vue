<template>
  <div style="width: 100%; height: 100vh; background-color: #f3f4f6">
    <navbar title="我的订单" />
    <tabs v-model:active="active">
      <tab class="tab" title="全部"><card :active="active" /></tab>
      <tab class="tab" title="未处理"><card :active="active" /></tab>
      <tab class="tab" title="处理中"><card :active="active" /></tab>
      <tab class="tab" title="已完成"><card :active="active" /></tab>
      <tab class="tab" title="已取消"><card :active="active" /></tab>
    </tabs>
  </div>
</template>
<script setup>
import { Tab, Tabs } from 'vant'
import navbar from '@/components/WdNavbar.vue'
import card from '@/components/xzpOrder.vue'
import { ref } from 'vue'
const active = ref(0)
</script>
<style lang="scss" scoped></style>
