/* *@description:小区商家收货地址 *@author: 王浩南 *@date: 2022-05-15 */
<template>
  <div class="main">
    <WdNavbar show-slot title="我的店铺" icon-url="add" :on-click-right="goto" />
    <div v-for="(item, index) in people" :key="index" class="container" @click="setaddress(item)">
      <AddressInfo
        :name="item.username"
        :avatar="item.avatar"
        :address="item.address"
        :phone="item.phone"
        :status="item.status==1"
      />
    </div>
  </div>
</template>
<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import AddressInfo from './components/addressInfo.vue'
import { api8, get } from '@/utils/request.js'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
// 收货地址
const people = ref()

// 路由跳转
const goto = () => {
  router.push({ name: 'AddAddress' })
}

// 获取收货地址
get(api8 + '/address/list', { Index: 1, size: 1000 }).then((res) => {
  people.value = res
})
// 存储地址信息
const setaddress = (addressInfo) => {
  store.commit('changeAddressInfo', { addressInfo })
}
</script>
<style lang="scss" scoped>
.main {
  background-color: #f3f4f6;
  min-height: 100vh;
}
</style>
