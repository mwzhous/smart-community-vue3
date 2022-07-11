/* *@description:房产交易主页 *@author: 何明明 *@date: 2022-05-14 */
<template>
  <div class="fc">
    <WdNavbar title="房产交易" />
    <WdScroll :get-data="pullHandler">
      <div>
        <div v-for="(item, index) in items" :key="index" class="fc--news">
          <Fangchan
            :picture="item.imageUrl"
            :address="item.address"
            :title="item.title"
            :tag="item.tag"
            :price="item.price"
            :dw="item.dw"
            @click="fangchan(item.id)"
          />
        </div>
      </div>
    </WdScroll>
  </div>
</template>
<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import Fangchan from '@/components/FangChan.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { get, api7 } from '@/utils/request'
import WdScroll from '@/components/WdScroll.vue'
const router = useRouter()
const items = ref([])
const getShopData = async () => {
  const result = await get(api7 + '/estate', {
    page: 1,
    size: 8,
  })
  items.value = result
}
getShopData()
const fangchan = (index) => {
  router.push({ path: `/service/house/detail/${index}` })
}
const page = ref(1)
const pullHandler = () => {
  get('http://106.14.169.149:8087/api/estate', {
    page: ++page.value,
    size: 8,
  }).then((res) => {
    const arr = res
    arr.forEach((ele) => {
      items.value.push(ele)
    })
  })
}
</script>
<style lang="scss" scoped>
.fc {
  height: 100vh;
  background-color: #f4f5f6;
}
</style>
