<template>
  <div class="page">
    <!-- navbar -->
    <WdNavbar title="投诉记录" />
    <PullRefresh v-model="loading" @refresh="onRefresh">
      <List
        v-model:loading="xialoading"
        :finished="finished"
        :offset="10"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(item, index) in isshow.list" :key="index" class="cont" @click="prev(item.id)">
          <div class="text">
            <p class="user">{{ item.username }}</p>
            <p class="words">{{ item.createTime }}</p>
            <p class="words1">{{ item.complainContent }}</p>
            <div v-if="item.status == 1" class="words5">
              <p>已处理</p>
            </div>
            <p v-else class="words6">待处理</p>
          </div>

          <div class="bg">
            <div v-if="item.complainImg">
              <!-- <img v-for="(item1, index1) in item.complainImg" :key="index1" :src="item1"> -->
              <img v-if="item.complainImg[0]" :src="item.complainImg[0]" alt="" class="pic" />
              <img v-if="item.complainImg[1]" :src="item.complainImg[1]" alt="" class="pic" />
              <img v-if="item.complainImg[2]" :src="item.complainImg[2]" alt="" class="pic" />
            </div>
          </div>
        </div>
      </List>
    </PullRefresh>
  </div>
</template>

<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import { PullRefresh, List } from 'vant'
import { get, api6 } from '@/utils/request.js'
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
onMounted(() => {
  onRefresh()
})
const loading = ref(false)
const xialoading = ref(false)
const finished = ref(false)
const page = ref(1)
const router = useRouter()
const store = useStore()

const prev = (val) => {
  // console.log(val)
  store.state.ArticleId = val
  router.push({ path: '/home/property/Cdetails', query: { id: val } })
}

const isshow = reactive({
  list: [],
})

const onRefresh = () => {
  page.value = 1
  finished.value = false
  get(api6 + '/household/complain/list', { page: 1, size: 5 }).then((res) => {
    isshow.list = res.records
    loading.value = false
    xialoading.value = false
  })
}

const onLoad = () => {
  page.value++
  get(api6 + '/household/complain/list', { page: page.value, size: 5 })
    .then((res) => {
      if (res.records.length > 0) {
        res.records.forEach((element) => {
          isshow.list.push(element)
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
</script>

<style scoped lang="scss">
.page {
  background-color: #f1f2f4;
  width: 414px;
  // height: calc(100vh - 44px);
  height: 100%;
  padding-bottom: 30px;
}
.cont {
  position: relative;
  width: 391px;
  height: 230px;
  background: #ffffff;
  border-radius: 6px;
  margin: 10px 0 0 10px;
  box-shadow: 5px 5px 10px #e5e1e1;
}
.text {
  position: absolute;
  width: 360px;
  height: 85px;
  background: #ffffff;
  left: 17px;
  top: 15px;
}
.text1 {
  width: 130px;
  height: 20px;
  position: absolute;
  left: 210px;
  top: 13px;
}
.bg {
  position: absolute;
  width: 390px;
  height: 111px;
  background: #ffffff;
  top: 99px;
  display: flex;
  justify-content: space-around;
}
.pic {
  width: 111px;
  height: 111px;
}
.words {
  width: 150px;
  height: 10px;
  font-size: 13px;
  font-family: PingFang;
  font-weight: 400;
  color: #aaaaaa;
  line-height: 20px;
  padding-top: 5px;
}
.words1 {
  width: 356px;
  font-size: 16px;
  font-family: PingFang;
  font-weight: 400;
  color: #444444;
  line-height: 23px;
  margin-top: 20px;
}
.words5 {
  position: absolute;
  font-size: 16px;
  font-family: PingFang;
  font-weight: 400;
  color: red;
  left: 300px;
  top: 2px;
}
.words6 {
  position: absolute;
  font-size: 16px;
  font-family: PingFang;
  font-weight: 400;
  color: #888888;
  left: 300px;
  top: 2px;
}
</style>
