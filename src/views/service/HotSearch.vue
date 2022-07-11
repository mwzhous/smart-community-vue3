<template>
  <div class="box">
    <div class="box--top">
      <Nav-bar left-arrow fixed @click-left="onClickLeft">
        <template #title>
          <Search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            input-align="left"
            @search="onSearch"
          >
            <template #action>
              <div class="wz" @click="onClickButton">搜索</div>
            </template>
          </Search>
        </template>
      </Nav-bar>
    </div>
    <PullRefresh v-model="loading" @refresh="onRefresh">
      <List
        v-model:loading="xialoading"
        :finished="finished"
        :offset="10"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(item, index) in item1" :key="index" class="box__content">
          <Remen
            :picture="item.thumbnail"
            :title="item.name"
            :content="item.content"
            :price="item.price"
            class="box__content--jt"
            @click="xiangqing(item.id)"
          />
        </div>
      </List>
    </PullRefresh>
  </div>
</template>
<script setup>
import { PullRefresh, List } from 'vant'
import Remen from '@/components/ReMen.vue'
import { NavBar } from 'vant'
import { Toast } from 'vant'
import { Search } from 'vant'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { get, api3 } from '@/utils/request'
const page = ref(0)
const loading = ref(false)
const xialoading = ref(false)
const finished = ref(false)
const router = useRouter()
const onClickLeft = () => history.back()
const value = ref('')
const onSearch = () => {
  onClickButton()
}
const item1 = ref([])
const onClickButton = () => {
  onRefresh()
}
const onRefresh = () => {
  page.value = 1
  finished.value = false
  get(api3 + '/fleaMarket/sameGoods', { Index: page.value, size: 7, keyword: value.value }).then(
    (res) => {
      item1.value = res
      loading.value = false
      if (item1.value.length == 0) {
        Toast.fail('没有该商品偶')
      }
    },
  )
}
const onLoad = () => {
  page.value++
  get(api3 + '/fleaMarket/sameGoods', { Index: page.value, size: 7, keyword: value.value })
    .then((res) => {
      if (res.length > 0) {
        res.forEach((element) => {
          item1.value.push(element)
        })
        xialoading.value = false
      } else {
        finished.value = true
      }
    })
    .catch(() => {
      finished.value = true
    })
}
const xiangqing = (index) => {
  router.push({ path: `/service/market/list/detail/${index}` })
  get(api3 + '/fleaMarket/' + index).then((res) => {
    // console.log(res)
  })
}
</script>
<style lang="scss" scoped>
.box {
  &--top {
    margin-top: 50px;
  }
  &--content {
    border: 1px solid #000;
    &--jt {
      margin-top: 14px;
    }
  }
}
</style>
