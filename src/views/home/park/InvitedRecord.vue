/* **@author: 王浩南  */
<template>
  <div class="app">
    <!-- navbar -->
    <WdNavbar title="邀请记录" show-slot bg-color="#f59331" color="#fff" />
    <div class="main">
      <PullRefresh v-model="isLoading" success-text="刷新成功" @refresh="onRefresh">
        <List
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div v-for="(item, index) in invitedData" :key="index" class="info">
            <InvitedRecordCard
              :contact="item.invitationRecord.contact"
              :phone="item.invitationRecord.phone"
              :community-name="item.communityName"
              :car-number="item.invitationRecord.carNumber"
              :start-time="item.invitationRecord.startTime"
              :remark="item.invitationRecord.remark"
            />
          </div>
        </List>
      </PullRefresh>
    </div>
  </div>
</template>
<script setup>
import { api5, get } from '@/utils/request.js'
import { ref } from 'vue'
import { PullRefresh, List, Toast } from 'vant'
import WdNavbar from '@/components/WdNavbar.vue'
import InvitedRecordCard from '@/views/home/park/components/InvitedRecordCard.vue'
// 下拉刷新页数
const page = ref()
// 邀请记录显示列表
const invitedData = ref([])
// 是否可以下拉状态
const loading = ref(false)
// 是否处于加载状态
const isLoading = ref(false)
//是否可以触发load
const finished = ref(false)

// 上拉加载
const onLoad = () => {
  get(api5 + '/invitation/record', {
    size: 10,
    page: page.value,
  }).then((arr) => {
    page.value++
    loading.value = false
    if (arr.length == 0) {
      finished.value = true
      setTimeout(() => {
        Toast.fail('我真的一滴都不剩了')
      }, 2000)
    } else {
      arr.forEach((ele) => {
        invitedData.value.push(ele)
      })
    }
  })
}

// 下拉刷新
const onRefresh = () => {
  get(api5 + '/invitation/record', {
    size: 10,
    page: 1,
  }).then((res) => {
    invitedData.value = res
    finished.value = false
    isLoading.value = false
    page.value = 0
  })
}

onRefresh()
</script>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  background: #f3f4f5;
}
.main {
  padding: 10px;
  padding-top: 0;
}
</style>
