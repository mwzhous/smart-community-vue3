/* *@description:跳蚤市场主页 *@author: 何明明 *@date: 2022-05-15 */
<template>
  <div class="box">
    <WdNavbar title="跳蚤市场" show-slot icon-url="underway" @click="lishi()" />
    <img
      class="box--img"
      src="https://wx-login.oss-cn-shanghai.aliyuncs.com/upload/%E5%9B%BE%E6%A0%87/%E8%B7%B3%E6%A7%BD%E5%B8%82%E5%9C%BAbanner.png"
    />
    <WhnFunctionVue :function-info="functionInfo" />
    <PullRefresh v-model="loading" @refresh="onRefresh">
      <List
        v-model:loading="xialoading"
        :finished="finished"
        :offset="10"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(item, index) in item1" :key="index" class="box__phones">
          <Remen
            :picture="item.thumbnail"
            :title="item.name"
            :content="item.content"
            :price="item.price"
            class="box__phones--rm"
            @click="xiangqing(item.id)"
          />
        </div>
      </List>
    </PullRefresh>
    <div class="box__bottom">
      <img
        src="https://wx-login.oss-cn-shanghai.aliyuncs.com/upload/%E5%9B%BE%E6%A0%87/icon_shangjia.png"
        class="box__bottom--img"
        @click="shangJia()"
      />
      <span class="box__bottom--content">立刻上架</span>
    </div>
  </div>
</template>
<script setup>
import { PullRefresh, List } from 'vant'
import Remen from '@/components/ReMen.vue'
import WdNavbar from '@/components/WdNavbar.vue'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import WhnFunctionVue from '@/components/whnFunction.vue'
import { get, api3 } from '@/utils/request'
const item1 = ref([])
const page = ref(0)
const loading = ref(false)
const xialoading = ref(false)
const finished = ref(false)
const onRefresh = () => {
  page.value = 1
  finished.value = false
  get(api3 + '/fleaMarket/', { Index: page.value, size: 5 }).then((res) => {
    item1.value = res
    loading.value = false
  })
}
const onLoad = () => {
  page.value++
  get(api3 + '/fleaMarket/', { Index: page.value, size: 5 }).then((res) => {
    if (res.length > 0) {
      if (item1.value) item1.value.push(...res)
      else item1.value = res
      xialoading.value = false
    } else {
      finished.value = true
    }
    })
}
const functionInfo = reactive([
  {
    url: 'http://wang-rich.oss-cn-hangzhou.aliyuncs.com/img/flea_market_03.png',
    info: '手机',
    pathName: 'GoodsList',
  },
  {
    url: 'http://wang-rich.oss-cn-hangzhou.aliyuncs.com/img/flea_market_05.png',
    info: '电脑',
    pathName: 'GoodsList',
  },
  {
    url: 'http://wang-rich.oss-cn-hangzhou.aliyuncs.com/img/flea_market_07.png',
    info: '游戏',
    pathName: 'GoodsList',
  },
  {
    url: 'http://wang-rich.oss-cn-hangzhou.aliyuncs.com/img/flea_market_09.png',
    info: '数码',
    pathName: 'GoodsList',
  },
  {
    url: 'http://wang-rich.oss-cn-hangzhou.aliyuncs.com/img/flea_market_11.png',
    info: '工具',
    pathName: 'GoodsList',
  },
])
const router = useRouter()

const lishi = () => {
  router.push({ name: 'AddedRecord' })
}
const xiangqing = (index) => {
  router.push({ path: `/service/market/list/detail/${index}` })
  get(api3 + '/fleaMarket/' + index).then((res) => {
    // console.log(res)
  })
}
const shangJia = () => {
  router.push({ name: 'GoodsAdded' })
}
onRefresh()
onLoad()
</script>
<style lang="scss" scoped>
.box {
  &--img {
    height: 144px;
  }
  &__phones {
    &--rm {
      border-radius: 15px;
    }
  }
  &__bottom {
    position: fixed;
    width: 100%;
    bottom: 9px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    &--img {
      display: block;
      width: 52px;
      border-radius: 50%;
      box-shadow: 0 4px 6px 5px rgb(221, 209, 209);
    }
    &--content {
      font-size: 13px;
      font-family: PingFang;
      font-weight: bold;
      color: #f17716;
      line-height: 20px;
    }
  }
}
</style>
