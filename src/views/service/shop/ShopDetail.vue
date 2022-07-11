/* *@description:小区商家详情 *@author: 王浩南 *@date: 2022-05-15 */
<template>
  <div class="app">
    <!-- navbar -->
    <WdNavbar title="小区商家" />
    <div class="shop">
      <!-- 商店信息 -->
      <ShopInfo
        :avatar="shopInfo.imgurl"
        :shop-name="shopInfo.name"
        :min-price="20"
        :shipping-price="5"
        :sgin="shopInfo.status"
        :detail="shopInfo.intro"
      />
    </div>
    <!-- 内容面板 -->
    <div class="box">
      <!-- 侧边栏 -->
      <div class="box__sideBar">
        <div
          v-for="(item, index) in siderBarSign"
          :key="index"
          class="box__sideBar--sign"
          :class="status === index ? 'leftBorder' : ''"
          @click="changeStatus(index)"
        >
          {{ item }}
        </div>
      </div>
      <!-- 店铺商品 -->
      <div class="box__container">
        <!-- 侧边栏文字提示 -->
        <div class="box__container--title">{{ siderBarSign[status] }}</div>
        <div v-if="showdata">
          <div v-for="(item, index) in commodityInfo[statusIndex]" :key="index">
            <Commodity
              :url="item.imgurl"
              :name="item.name"
              :sales="item.sales"
              :price="item.price"
              :counter="item.counter"
              @add="changeCounter(statusIndex, index, 1)"
              @sub="changeCounter(statusIndex, index, -1)"
            />
          </div>
        </div>
        <img
          v-else
          class="imgdata"
          src="https://wang-rich.oss-cn-hangzhou.aliyuncs.com/img数据为空.png"
          alt=""
        />
      </div>
    </div>
    <!-- 底部支付界面 -->
    <div class="pay">
      <div class="pay__left">
        <img src="@/assets/whn/community_busine_03.png" alt="" class="pay__left--icon" />
        <div class="pay__left__info">
          <span class="pay__left__info--price">¥ {{ total }}</span>
          <span class="pay__left__info--send">配送费5元</span>
        </div>
      </div>
      <button class="pay--submit" @click="goto('PlaceOrder')">选好了</button>
    </div>
  </div>
</template>

<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import ShopInfo from './components/shopInfo.vue'
import Commodity from './components/commodityInfo.vue'
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { get, api8 } from '@/utils/request.js'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
const route = useRoute()
// 侧边框默认显示
const sideStatus = ref(1)
// 文字默认显示状态栏
const status = ref(0)
// 商店信息
const shopInfo = ref({})
// 获取商店详情
const shopId = ref(route.params.id)
// 判断是否有数据显示暂无数据的状态
const showdata = ref()
// 侧边栏遍历内容
const siderBarSign = ref(['全部', '零食', '水果', '蔬菜'])
// 显示商品下标
const statusIndex = ref(0)
// 商品信息存储
const commodityInfo = reactive({ 0: [], 1: [], 2: [], 3: [] })



get(api8 + '/shop/' + shopId.value).then((res) => {
  shopInfo.value = res
})

// 获取商品详情详情,并放入数组commodityInfo中
const getInfo = () => {
  get(api8 + '/shop/goodsList/' + route.params.id, {
    size: 100,
    Index: 1,
  }).then((res) => {
    res.forEach((element) => {
      element.counter = store.state.shop.shopList[shopId.value]
        ? store.state.shop.shopList[shopId.value].productList[element.id]
          ? store.state.shop.shopList[shopId.value].productList[element.id].counter
          : 0
        : 0
    })
    commodityInfo[0] = res
    showdata.value = JSON.stringify(commodityInfo[0]) != '[]'
  })
  for (let i = 1; i < siderBarSign.value.length; i++) {
    get(api8 + '/shop/goodsList/' + route.params.id + '/' + i, {
      size: 100,
      Index: 1,
    }).then((res) => {
      for (const key in res) {
        res[key].counter = store.state.shop.shopList[shopId.value]
          ? store.state.shop.shopList[shopId.value].productList[res[key].id]
            ? store.state.shop.shopList[shopId.value].productList[res[key].id].counter
            : 0
          : 0
      }
      commodityInfo[i] = res
    })
  }
}
// 默认获取商品详情
getInfo()

// 调用全局变量
const changeShopInfo = (shopName, shopId, commodity, total) => {
  store.commit('changeShopInfo', {
    shopName,
    shopId,
    commodity,
    total,
  })
}
// 改变商品数量(commodityInfo商品信息数组下标,商品index,增加数量)
const total = ref(
  store.state.shop.shopList[shopId.value] ? store.state.shop.shopList[shopId.value].total : 0,
)
// 改变商品counter
const changeCounter = (statusIndex, index, num) => {
  // 如果商品数小于零且是减少操作时
  if (commodityInfo[statusIndex][index].counter == 0 && num == -1) {
    num = 0
  }
  // 给指定的商品添加数量
  commodityInfo[statusIndex][index].counter += num
  // 计算total
  total.value += num * commodityInfo[statusIndex][index].price
  changeShopInfo(
    shopInfo.value.name,
    route.params.id,
    commodityInfo[statusIndex][index],
    total.value,
  )
}

// 改变状态栏事件
const changeStatus = (index) => {
  sideStatus.value = index
  status.value = index
  statusIndex.value = index
  showdata.value = JSON.stringify(commodityInfo[index]) != '[]'
}

// 路由跳转
const goto = (pathName) => {
  router.push({ name: pathName })
}
</script>
<style scoped lang="scss">
// 设置背景颜色
.app {
  position: relative;
  min-height: 100vh;
  background: #f3f4f6;
  padding-bottom: 45px;
}
.shop {
  background: #fff;
  margin-bottom: -8px;
}
// 设置内容区样式
.box {
  border-top: 1px solid #e8e8e8;
  display: flex;
  &__sideBar {
    width: 86px;
    &--sign {
      color: #666666;
      height: 43px;
      text-align: center;
      line-height: 43px;
      font-size: 13px;
      border-bottom: 1px solid #e8e8e8;
    }
  }
  &__container {
    display: flex;
    flex: 1;
    flex-direction: column;
    &--title {
      height: 43px;
      line-height: 43px;
      font-size: 13px;
      font-weight: bold;
      color: #666666;
      line-height: 43px;
    }
  }
}
.leftBorder {
  border-left: 2px solid $wd-primary;
  background: #fff;
}
.pay {
  background: #fff;
  display: flex;
  padding: 5px 13px;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  bottom: 0px;
  align-items: center;
  &__left {
    display: flex;
    align-items: center;

    &--icon {
      width: 26px;
      height: 26px;
    }
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: 13px;
      &--price {
        line-height: 17px;
        font-size: 17px;
        color: #dc3333;
      }
      &--send {
        line-height: 13px;
        font-size: 13px;
        font-weight: 300;
        color: #aaaaaa;
      }
    }
  }
  &--submit {
    height: 35px;
    width: 86px;
    background: #ff8c11;
    color: #fff;
    font-size: 16px;
    border-radius: 5px;
    border: none;
  }
}
.imgdata {
  margin: 50% 25%;
  width: 50%;
  height: 50%;
}
</style>
