/* *@description:跳蚤市场---历史记录页面 *@author: 何明明 *@date: 2022-05-23 */
<template>
  <div class="box">
    <WdNavbar title="上架记录" />
    <!-- <WdScroll> -->
    <PullRefresh v-model="loading" @refresh="onRefresh">
      <List
        v-model:loading="xialoading"
        :finished="finished"
        :offset="10"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(item, index) in items" :key="index" class="box__phones">
          <Remen
            :picture="item.thumbnail"
            :title="item.name"
            :content="item.content"
            :price="item.price"
            :check="item.state"
          />
        </div>
      </List>
    </PullRefresh>
    <!-- </WdScroll> -->
  </div>
</template>
<script setup>
import { PullRefresh, List } from 'vant'
import { ref } from 'vue'
import { get, api3 } from '@/utils/request'
import WdNavbar from '@/components/WdNavbar.vue'
import Remen from '@/components/ReMen.vue'
const page = ref(0)
const loading = ref(false)
const xialoading = ref(false)
const finished = ref(false)
const items = ref([])
const onRefresh = () => {
  page.value = 1
  finished.value = false
  get(api3 + '/fleaMarket/myOrder', { Index: page.value, size: 6 }).then((res) => {
    items.value = res
    loading.value = false
  })
}
const onLoad = () => {
  page.value++
  get(api3 + '/fleaMarket/', { Index: page.value, size: 6 })
    .then((res) => {
      if (res.length > 0) {
        res.forEach((element) => {
          items.value.push(element)
        })
        xialoading.value = false
      } else {
        finished.value = true
      }
      console.log(items.value)
    })
    .catch(() => {
      finished.value = true
    })
}
onRefresh()
onLoad()
</script>
<style lang="scss" scoped></style>
