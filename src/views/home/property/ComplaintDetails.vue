<template>
  <div class="page">
    <!-- navbar -->
    <WdNavbar title="投诉详情" />

    <div class="cont">
      <div class="bg1">
        <div class="words">{{ items.createTime }}</div>
        <div class="words1">{{ items.complainContent }}</div>
      </div>

      <div class="bg2">
        <div v-for="(item, index) in items.complainImg" :key="index">
          <img v-if="item != null" :src="item" class="pic" />
        </div>
      </div>

      <div class="bg3">
        <div class="words2">物业回复：</div>
        <div v-if="items.status == 1" class="words3">{{ items.complainResult.complainResult }}</div>
        <div v-else class="words3">抱歉，稍后会给您回复！</div>
      </div>
      <div class="words4">{{ items.resultTime }}</div>
    </div>
  </div>
</template>

<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import { get, api6 } from '@/utils/request.js'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const items = ref({})

// const result = () => {
//   get(api6+'/household/complain/' + route.query.id).then((res) => {
//     console.log('++++++++++++++++')
//     console.log(res)
//     console.log('++++++++++++++++')
//     isshow.list = res
//   })
// }
// result()

const getDetailData1 = async () => {
  let url = api6 + '/household/complain/' + route.query.id
  const result = await get(url)
  // console.log(result);
  items.value = result
}
getDetailData1()
</script>

<style scoped>
.page {
  background-color: #f1f2f4;
  width: 414px;
  height: 736px;
}
.cont {
  position: relative;
  width: 391px;
  height: 345px;
  background: #ffffff;
  border-radius: 6px;
  left: 12px;
  top: 20px;
}
.bg1 {
  position: absolute;
  width: 360px;
  height: 70px;
  background: #ffffff;
  left: 10px;
  top: 10px;
}
.bg2 {
  position: absolute;
  width: 390px;
  height: 111px;
  background: #ffffff;
  top: 99px;
  display: flex;
  justify-content: space-around;
}
.bg3 {
  position: absolute;
  width: 357px;
  height: 101px;
  background: #f2f2f2;
  border: 0px solid #d6d6d6;
  border-radius: 7px 6px 6px 7px;
  left: 17px;
  top: 227px;
}
.pic {
  width: 111px;
  height: 111px;
}
.words {
  font-size: 13px;
  font-family: PingFang;
  font-weight: 400;
  color: #aaaaaa;
  line-height: 20px;
}
.words1 {
  font-size: 16px;
  font-family: PingFang;
  font-weight: 400;
  color: #444444;
  line-height: 23px;
  margin-top: 5px;
}
.words2 {
  font-size: 14px;
  font-family: PingFang;
  font-weight: 500;
  color: #666666;
  line-height: 26px;
  margin-left: 10px;
  margin-top: 10px;
}
.words3 {
  font-size: 15px;
  font-family: PingFang;
  font-weight: bold;
  color: #444444;
  line-height: 26px;
  margin-left: 10px;
  margin-top: 5px;
}
.words4 {
  position: absolute;
  font-size: 12px;
  font-family: PingFang;
  font-weight: 500;
  color: #888888;
  line-height: 26px;
  margin-left: 240px;
  margin-top: 240px;
}
</style>
