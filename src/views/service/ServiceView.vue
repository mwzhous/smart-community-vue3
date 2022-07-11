/* *@description:社区服务主页 *@author: 何明明 *@date: 2022-05-12 */
<template>
  <div class="wrapper">
    <Search
      v-model="value"
      disabled
      shape="round"
      background="#ed7545"
      placeholder="关键字"
      class="sc"
      @click="search()"
    />
    <div>
      <img
        src="https://wx-login.oss-cn-shanghai.aliyuncs.com/upload/%E5%9B%BE%E6%A0%87/%E5%8D%97%E4%BA%AC%E9%93%B6%E8%A1%8Cbanner.png"
        class="img"
      />
    </div>
    <div class="tb-all">
      <div class="tb-1">
        <img
          src="https://wx-login.oss-cn-shanghai.aliyuncs.com/upload/%E5%9B%BE%E6%A0%87/community_service_03.png"
          class="tb"
          @click="fangchan"
        />
        <span class="fc">房产交易</span>
      </div>
      <div class="tb-2">
        <img
          src="https://wx-login.oss-cn-shanghai.aliyuncs.com/upload/%E5%9B%BE%E6%A0%87/community_service_05.png"
          class="tb"
          @click="tiaocao"
        />
        <span class="fc">跳蚤市场</span>
      </div>
      <div class="tb-3">
        <img
          src="https://wx-login.oss-cn-shanghai.aliyuncs.com/upload/%E5%9B%BE%E6%A0%87/community_service_07.png"
          class="tb"
          @click="shangjia"
        />
        <span class="fc">小区商家</span>
      </div>
    </div>
    <span class="rm--title">热门推荐</span>
    <div class="rm--all">
      <WdScroll :get-data="pullHandler">
        <div>
          <div v-for="(item, index) in shopList" :key="index" class="rm">
            <Remen
              :picture="item.thumbnail"
              :title="item.name"
              :content="item.content"
              :price="item.price"
              class="rm-zj"
              @click="xiangqing(item.id)"
            />
          </div>
        </div>
      </WdScroll>
    </div>
  </div>
</template>
<script setup>
import Remen from '@/components/ReMen.vue'
import { ref } from 'vue'
import { Toast } from 'vant'
import { Search } from 'vant'
import { useRouter } from 'vue-router'
import { get, api7, api3 } from '@/utils/request'
import WdScroll from '@/components/WdScroll.vue'
const value = ref('')
// 创建热门推荐列表
const shopList = ref([])
//获取推荐列表
const getShopData = async () => {
  await get(api7 + '/fleaMarket/hot', {
    page_number: 1,
    size: 6,
  }).then((res) => {
    shopList.value = res
  })
}
//执行getShopData方法
getShopData()
const router = useRouter()
const fangchan = () => {
  router.push({ name: 'HouseTrans' })
}
const tiaocao = () => {
  router.push({ name: 'MarketView' })
}
const shangjia = () => {
  router.push({ name: 'ShopView' })
}
const search = () => {
  router.push({ name: 'HotSearch' })
}
const xiangqing = (index) => {
  router.push({ path: `/service/market/list/detail/${index}` })
  get(api3 + '/fleaMarket/' + index).then((res) => {
    // console.log(res)
  })
}
// 上拉加载热门推荐
const page = ref(1)
const pullHandler = () => {
  get(api7 + '/fleaMarket/hot', {
    page_number: ++page.value,
    size: 6,
  }).then((res) => {
    const arr = res
    if (arr.length == 0) {
      setTimeout(() => {
        Toast.fail('没有更多信息了，亲亲~')
      }, 2000)
    } else {
      console.log('上拉加载热门推荐')
      arr.forEach((ele) => {
        shopList.value.push(ele)
      })
    }
  })
}
</script>
<style lang="scss" scoped>
.sc {
  position: fixed;
  top: 0;
  width: 100%;
}
.wrapper {
  padding-bottom: 54px;
}
.van-search {
  padding: 8px 14px;
}

.img {
  width: 100%;
  height: 180px;
}
.tb-all {
  margin-left: 37px;
  margin-right: 37px;
  display: flex;
  justify-content: space-between;
  /* border: 1px solid #000; */
  margin-bottom: 32px;
  margin-top: 8px;
}
.tb {
  width: 63px;
  height: 63px;
  display: block;
  margin-bottom: 14px;
}
.fc {
  font-size: 15px;
  display: block;
}
.rm--title {
  font-size: 16px;
  font-family: PingFang;
  font-weight: bold;
  color: #333333;
  margin-left: 15px;
}
.rm-zj {
  margin-top: 14px;
  border-radius: 15px;
}
.rm--all {
  height: 550px;
}
</style>
