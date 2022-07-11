/* *@description: 收藏卡片组件 *@author: 肖展鹏 *@date: 2022-05-14 */
<template>
  <div v-for="(item, index) in isshow.list" :key="index" class="mycard">
    <router-link :to="item.go">
      <div class="mycard__pic">
        <img :src="item.img" />
      </div>
      <div class="mycard__tit">{{ item.tit }}</div>
    </router-link>
  </div>
</template>

<script setup>
import { api1, api3, api7, get } from '@/utils/request'
import { reactive } from 'vue'
const isshow = reactive({
  list: [],
})
const a = defineProps({
  active: Number,
})
if (a.active == 0) {
  get(api1 + '/personal/collection', { tab: 0 }).then((res) => {
    for (let i in res) {
      isshow.list.push({ img: res[i].newsCover, tit: res[i].newsTitle, go: '/person/collect' })
    }
  })
} else if (a.active == 1) {
  get(api1 + '/personal/collection', { tab: 1 }).then((res) => {
    for (let i in res) {
      isshow.list.push({ img: res[i].newsCover, tit: res[i].newsTitle, go: '/person/collect' })
    }
  })
} else if (a.active == 2) {
  get(api7 + '/estate/marks/').then((res) => {
    for (let i in res) {
      isshow.list.push({
        img: res[i].imageUrl,
        tit: res[i].title,
        go: '/service/house/detail/' + res[i].id,
      })
    }
  })
} else {
  get(api3 + '/fleaMarket/mark').then((res) => {
    for (let i in res) {
      isshow.list.push({
        img: res[i].thumbnail,
        tit: res[i].name,
        go: '/service/market/list/detail/' + res[i].id,
      })
    }
  })
}
</script>

<style lang="scss" scoped>
a {
  color: #222;
}
.mycard {
  width: 391px;
  height: 110px;
  margin-top: 17px;
  margin-top: 12px;
  border: 1px solic #fcfcfc;
  border-radius: 10px;
  overflow: hidden;
  margin-left: 12px;
  &__pic {
    display: inline-block;
    width: 104px;
    height: 110px;
  }
  &__pic img {
    display: inline-block;
    width: 104px;
    height: 110px;
  }
  &__tit {
    width: 286px;
    height: 110px;
    padding: 26px;
    float: right;
    background-color: #fff;
  }
}
</style>
