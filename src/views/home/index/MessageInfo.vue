<template>
  <WdNavbar title="民生资讯" />
  <!-- 滚动，上拉加载 -->
  <div class="wrapper">
    <PullRefresh v-model="refreshing" success-text="刷新成功" @refresh="onRefresh">
      <List
        v-model:loading="loading"
        :finished="finished"
        :offset="30"
        finished-text="没有更多了"
        @load="pullHandler"
      >
        <div class="page">
          <div v-for="(item, index) in newsList" :key="index" class="zx" @click="detail(item.id)">
            <img :src="item.imageUrl" />
            <span>{{ item.title }}</span>
          </div>
        </div>
      </List>
    </PullRefresh>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import WdNavbar from '@/components/WdNavbar.vue'
import { get, api4 } from '@/utils/request'
import { Toast, PullRefresh, List } from 'vant'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()
const loading = ref(false)
const finished = ref(false)
const refreshing = ref(false)
// 资讯列表
const newsList = reactive([])

const page = ref(1)
const pullHandler = () => {
  get(api4 + '/index/news', {
    page_number: ++page.value,
    size: 10,
  }).then((res) => {
    const arr = res.records
    loading.value = false
    if (arr.length == 0) {
      finished.value = true
      setTimeout(() => {
        Toast.fail('没有新的资讯了')
      }, 2000)
    } else {
      arr.forEach((ele) => {
        newsList.push(ele)
      })
    }
  })
}
const onRefresh = () => {
  // 清空列表数据
  finished.value = false
  newsList.length = 0
  // 重新加载数据
  get(api4 + '/index/news', {
    page_number: 1,
    size: 10,
  })
    .then((res) => {
      const arr = res.records
      arr.forEach((ele) => {
        newsList.push(ele)
      })
      refreshing.value = false
    })
    .catch((err) => {
      // console.log('err', err)
    })
}
const detail = (val1) => {
  store.state.ArticleId = val1
  router.push({ path: '/home/detail', query: { id: val1 } })
}
</script>
<style lang="scss" scoped>
.wrapper {
  background-color: #f3f4f6;
}
.page {
  width: 100%;
}
.zx {
  width: 391px;
  height: 92px;
  background: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(203, 202, 202, 0.3);
  border-radius: 6px;
  position: relative;
  left: 12px;
  top: 15px;
  margin: 6px 0 6px 0;
  span {
    width: 248px;
    height: 40px;
    font-size: 15px;
    font-family: PingFang;
    font-weight: 500;
    color: #333333;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    top: 20px;
    left: 123px;
  }
  img {
    width: 104px;
    height: 92px;
    border-radius: 6px 0 0 6px;
  }
}
</style>
