<template>
  <div class="page">
    <WdNavbar title="报修记录" />
    <PullRefresh v-model="loading" @refresh="onRefresh">
      <List
        v-model:loading="xialoading"
        :finished="finished"
        :offset="10"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="page__wrapper">
          <div
            v-for="(item, index) in isshow.list"
            :key="index"
            class="cont"
            @click="prev(item.id)"
          >
            <div class="bg">
              <p v-if="item.repairType == 0" class="words">居家维修：{{ item.repairTitle }}</p>
              <p v-if="item.repairType == 1" class="words">公共维修：{{ item.repairTitle }}</p>
              <p class="words1">{{ item.createTime }}</p>
              <p class="words2">{{ item.repairContent }}</p>
              <div v-if="item.status == 1" class="text">
                <p class="words3">已处理</p>
              </div>
              <div v-else class="text">
                <p class="words4">待处理</p>
              </div>
            </div>

            <div class="bg1">
              <div><img class="pic" :src="item.repairImg[0]" alt="" /></div>
              <div>
                <img v-if="item.repairImg[1]" class="pic" :src="item.repairImg[1]" alt="" />
              </div>
              <div>
                <img v-if="item.repairImg[2]" class="pic" :src="item.repairImg[2]" alt="" />
              </div>
            </div>
          </div>
        </div>
      </List>
    </PullRefresh>
  </div>
</template>

<script setup>
import WdNavbar from '../../../components/WdNavbar.vue'
import { PullRefresh, List } from 'vant'
import { get, api6 } from '@/utils/request.js'
import { onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
onMounted(() => {
  onRefresh()
})
const loading = ref(false)
const xialoading = ref(false)
const finished = ref(false)
const page = ref(1)
const store = useStore()
const router = useRouter()

const prev = (val) => {
  store.state.ArticleId = val
  router.push({ path: '/home/property/Rdetails', query: { id: val } })
}

const isshow = reactive({
  list: [],
})

const onRefresh = () => {
  page.value = 1
  finished.value = false
  get(api6 + '/household/repair/list', { page: 1, size: 5 }).then((res) => {
    isshow.list = res.records
    loading.value = false
    xialoading.value = false
  })
}

const onLoad = () => {
  page.value++
  get(api6 + '/household/repair/list', { page: page.value, size: 5 })
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
  &__wrapper {
    // height: calc(100vh - 44px);
    height: 100%;
    padding-bottom: 30px;
  }
}
.cont {
  position: relative;
  width: 390px;
  height: 250px;
  background: #ffffff;
  border-radius: 6px;
  left: 3px;
  top: 10px;
  margin: 10px 0 0 10px;
  box-shadow: 5px 5px 10px #e5e1e1;
}
.bg {
  position: absolute;
  width: 360px;
  height: 100px;
  background: #ffffff;
  left: 15px;
  top: 10px;
}
.bg1 {
  position: absolute;
  width: 380px;
  height: 112px;
  background: #ffffff;
  left: 6px;
  top: 120px;
  display: flex;
  justify-content: space-around;
}
.text {
  margin-left: 320px;
  margin-top: -80px;
}
.pic {
  width: 111px;
  height: 111px;
}
.words {
  font-size: 17px;
  font-family: PingFang;
  font-weight: bold;
  color: #333333;
  line-height: 20px;
}
.words1 {
  font-size: 14px;
  font-family: PingFang;
  font-weight: 500;
  color: #888888;
  line-height: 35px;
}
.words2 {
  width: 370px;
  height: 38px;
  font-size: 16px;
  font-family: PingFang;
  font-weight: 400;
  color: #444444;
  line-height: 23px;
}
.words3 {
  font-size: 13px;
  font-family: PingFang;
  font-weight: 500;
  color: #f67e00;
  line-height: 26px;
}
.words4 {
  font-size: 13px;
  font-family: PingFang;
  font-weight: 500;
  color: #888888;
  line-height: 26px;
}
</style>
