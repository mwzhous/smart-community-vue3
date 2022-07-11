<template>
  <div class="page">
    <!-- navbar -->
    <WdNavbar title="报修详情" />

    <div class="cont">
      <div class="bg1">
        <div class="words">{{ items.repairTitle }}</div>
        <div class="words1">{{ items.orderTime }}</div>
        <div class="words2">{{ items.repairContent }}</div>
        <div v-if="items.address != null" class="words3">
          {{ items.address.substring(0, 3) }}{{ items.address.substring(4, 7) }}
        </div>
      </div>

      <div class="bg2">
        <div v-for="(item, index) in items.repairImg" :key="index">
          <img v-if="item != null" :src="item" class="pic" />
        </div>
      </div>

      <div class="bg3">
        <div class="words4">物业回复：</div>
        <div v-if="items.status == 1" class="words6">修好了！</div>
        <div v-else class="words6">抱歉，物业繁忙中...</div>
      </div>
      <div class="words5">{{ items.createTime }}</div>

      <div class="words7">星级评价：</div>
      <div class="stars"><Rate v-model="value" /></div>
      <div class="words8">文字评价：</div>
      <textarea v-model="content" type="text" placeholder="请输入您的评价" class="bg4"></textarea>

      <div class="bg5">
        <p class="words9" @click="send">发表评价</p>
      </div>
    </div>

    <div class="cont1">
      <div class="words10">客户评价：</div>
      <div v-if="JSON.stringify(items) != '{}'" class="words11">
        {{ items.repairRecord.repairAssess }}
      </div>
      <div v-if="JSON.stringify(items) != '{}'" class="words12">
        {{ items.repairRecord.satisfaction }}星好评！
      </div>
    </div>
  </div>
</template>

<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import { get, api6, post } from '@/utils/request.js'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { Rate } from 'vant'
const route = useRoute()
const router = useRouter()
const items = ref({})
const value = ref(3)
const content = ref('')
const itemId = ref({})

const getDetailData1 = async () => {
  let url = api6 + '/household/repair/' + route.query.id
  const result = await get(url)
  // console.log(result)
  items.value = result
  itemId.value = result.userId
  // console.log('++++++++++')
  // console.log(result.id)
}
getDetailData1()

const send = () => {
  const type = route.query.id
  // console.log('+++' + type);
  const param = {
    repairId: type - 0,
    satisfaction: value.value,
    repairAssess: content.value,
  }
  console.log(param)
  post(api6 + '/household/repair/assess', param).then((res) => {
    // console.log(res)
    value.value = ''
    content.value = ''
  })
  router.go(0)
}
</script>

<style scoped>
.page {
  background-color: #f1f2f4;
  width: 414px;
  height: 780px;
  padding-bottom: 10px;
}
.cont {
  position: relative;
  width: 391px;
  height: 600px;
  background: #ffffff;
  border-radius: 6px;
  left: 12px;
  top: 15px;
}
.cont1 {
  width: 357px;
  height: 70px;
  margin-top: 30px;
  margin-left: 23px;
  background: #ffffff;
  border: 1px solid #d6d6d6;
  border-radius: 10px 10px 10px 10px;
}
.bg1 {
  position: absolute;
  width: 375px;
  height: 100px;
  background: #ffffff;
  left: 10px;
  top: 10px;
}
.bg2 {
  position: absolute;
  width: 390px;
  height: 111px;
  background: #ffffff;
  top: 125px;
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
  top: 250px;
}
.bg4 {
  position: absolute;
  width: 260px;
  height: 110px;
  margin-top: 430px;
  margin-left: 100px;
  border: 1px solid #f1f2f4;
  resize: none;
}
.bg5 {
  position: absolute;
  width: 86px;
  height: 35px;
  background: linear-gradient(90deg, #fa8e07, #f17716);
  border-radius: 6px;
  margin-top: 555px;
  margin-left: 280px;
}
.pic {
  width: 111px;
  height: 111px;
}
.stars {
  position: absolute;
  margin-top: 375px;
  margin-left: 90px;
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
  line-height: 30px;
}
.words2 {
  position: absolute;
  font-size: 16px;
  font-family: PingFang;
  font-weight: 400;
  color: #444444;
  line-height: 23px;
  margin-top: 10px;
}
.words3 {
  position: absolute;
  font-size: 17px;
  font-family: PingFang;
  color: #fa4d09;
  line-height: 20px;
  margin-left: 280px;
  margin-top: -30px;
}
.words4 {
  font-size: 16px;
  font-family: PingFang;
  font-weight: 500;
  color: #666666;
  line-height: 26px;
  margin-left: 10px;
  margin-top: 10px;
}
.words5 {
  position: absolute;
  font-size: 14px;
  font-family: PingFang;
  font-weight: 500;
  color: #c9bfbb;
  line-height: 30px;
  margin-top: 260px;
  margin-left: 220px;
}
.words6 {
  font-size: 15px;
  font-family: PingFang;
  font-weight: bold;
  color: #444444;
  line-height: 26px;
  margin-left: 11px;
  margin-top: 15px;
}
.words11 {
  font-size: 15px;
  font-family: PingFang;
  font-weight: bold;
  color: #444444;
  line-height: 10px;
  margin-left: 8px;
}
.words7 {
  position: absolute;
  font-size: 13px;
  font-family: PingFang;
  font-weight: bold;
  color: #666666;
  line-height: 43px;
  margin-top: 365px;
  margin-left: 18px;
}
.words10 {
  font-size: 13px;
  font-family: PingFang;
  font-weight: bold;
  color: #666666;
  line-height: 40px;
  margin-left: 10px;
}
.words8 {
  position: absolute;
  font-size: 13px;
  font-family: PingFang;
  font-weight: bold;
  color: #666666;
  line-height: 43px;
  margin-top: 415px;
  margin-left: 18px;
}
.words9 {
  font-size: 16px;
  font-family: PingFang;
  font-weight: 500;
  color: #ffffff;
  line-height: 20px;
  margin-top: 7px;
  margin-left: 11px;
}
.words12 {
  font-size: 18px;
  font-family: PingFang;
  color: #e41515;
  margin-left: 270px;
  margin-top: -40px;
}
</style>
