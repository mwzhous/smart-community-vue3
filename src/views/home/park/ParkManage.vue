/* **@author: 王浩南  */
<template>
  <!-- navbar -->
  <WdNavbar title="车位管理" show-slot icon-url="add" :on-click-right="goRentalPark" />
  <div class="main">
    <truckSpace
      v-for="(item, index) in truckInfo"
      :key="index"
      :num="item.section"
      :car-number="item.carNumber"
      :plate-num="item.plateNum"
      :end-time="item.endTime"
    />
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { api5,get } from '@/utils/request.js'
import WdNavbar from '@/components/WdNavbar.vue'
import truckSpace from '@/views/home/park/components/truckSpace.vue'

const router = useRouter()
// 车位信息
const truckInfo = ref([])

get(api5+'/park/manageCarport').then((res) => {
  truckInfo.value = res
})

// 路由跳转
const goRentalPark = () => {
  router.push({ name: 'RentalPark' })
}

</script>
<style lang="scss" scoped>
.main {
  height: 100vh;
  background: #f3f4f5;
  padding: 10px;
}
</style>
