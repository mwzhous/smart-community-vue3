<template>
  <div class="all">
    <WdNavbar title="优惠券" />
    <div class="mycoupons">
      <div class="one"><one /></div>
      <div class="two"><two /></div>
    </div>
  </div>
</template>
<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import one from '@/components/xzpCouponOne.vue'
import two from '@/components/xzpCouponTwo.vue'
</script>
<style lang="scss" scoped>
.all {
  width: 100%;
  height: 100vh;
  background-color: #f3f4f6;
}
.mycoupons {
  margin-top: 16px;
  margin-left: 20px;
  width: 374px;
}
</style>
