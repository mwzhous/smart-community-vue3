/* *@description:我的店铺 *@author: 王浩南 *@date: 2022-05-15 */
<template>
  <div class="app">
    <!-- navbar -->
    <WdNavbar title="我的店铺" :on-click-right="onClickLeft" />
    <!-- 商店信息 -->
    <div v-for="(item, index) in shopInfo" :key="index" class="container">
      <ShopInfo
        :avatar="item.avatar"
        :shop-name="item.shopName"
        :min-price="item.minPrice"
        :shipping-price="item.ShippingPrice"
        :status="item.status"
        :detail="item.detail"
      />
    </div>
  </div>
</template>
<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import ShopInfo from './components/shopInfo.vue'
import WdNavbar from '@/components/WdNavbar.vue'
// 返回上一界面
const router = useRouter()
// navbar左侧点击事件
const onClickLeft = () => {
  router.back()
}
// 商店对象信息
const shopInfo = reactive([
  {
    shopName: 'wangrichshop',
    avatar: 'https://wang-rich.oss-cn-hangzhou.aliyuncs.com/md/202204251454709.png',
    minPrice: 20,
    ShippingPrice: 4,
    detail: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
    status: 0,
  },
  {
    shopName: 'wangrichshop',
    avatar: 'https://wang-rich.oss-cn-hangzhou.aliyuncs.com/md/202204251454709.png',
    minPrice: 20,
    ShippingPrice: 4,
    detail: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
    status: 1,
  },
  {
    shopName: 'wangrichshop',
    avatar: 'https://wang-rich.oss-cn-hangzhou.aliyuncs.com/md/202204251454709.png',
    minPrice: 20,
    ShippingPrice: 4,
    detail: '简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介',
    status: 2,
  },
])
</script>
<style lang="scss" scoped>
// 整体背景设置
.app {
  background-color: #f3f4f6;
  min-height: 100vh;
}
</style>
