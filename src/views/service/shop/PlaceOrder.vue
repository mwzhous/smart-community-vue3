/* *@description:小区商家订单 *@author: 王浩南 *@date: 2022-05-18 */
<template>
  <div class="app">
    <!-- navbar -->
    <WdNavbar title="下单" />
    <div class="container" @click="goto('ShipAddress')">
      <!-- 收货地址 -->
      <AddressInfo
        v-if="deliveryAdd"
        :name="deliveryAdd.username"
        :avatar="deliveryAdd.avatar"
        :address="deliveryAdd.address"
        :phone="deliveryAdd.phone"
        :status="deliveryAdd.status == 1"
      />
    </div>

    <!-- 购物信息及支付方式 -->
    <div class="content">
      <!-- 购物信息 -->
      <div v-for="(item, index) in shopCar" :key="index" class="card">
        <!-- 商店 -->
        <div class="card__store">
          <!-- 商店图标 -->
          <Store class="card__store--icon" />
          <!-- 商店名称 -->
          <span
            class="card__store--name"
            @touchstart="start(item.shopId)"
            @touchend="end"
            @touchmove="end"
            @click="goshop(item.shopId)"
            >{{ item.shopName }}</span
          >
        </div>
        <!-- 物品信息 -->
        <div
          v-for="(items, indexs) in item.productList"
          :key="indexs"
          @touchstart="start(item.shopId, items.id)"
          @touchend="end"
          @touchmove="end"
        >
          <ShoppingInfo
            :img-url="items.imgurl"
            :img-name="items.name"
            :shop-num="items.counter"
            :shop-price="items.price"
          />
        </div>
        <!-- 总金额 -->
        <div class="card__total">
          <span>小计</span>
          <span class="card__total--price">¥{{ item.total }}</span>
        </div>
      </div>

      <!-- 支付方式提示 -->
      <span class="tip">请选择支付方式</span>

      <!-- 支付选择大卡片 -->
      <div class="pay">
        <!-- 支付card -->
        <RadioGroup v-model="status">
          <div v-for="(item, index) in payWayInfo" :key="index" class="pay__card">
            <!-- 支付描述信息 -->
            <div class="pay__card__content">
              <!-- 支付信息描述icon -->
              <img :src="item.payIcon" alt="" class="icon" />
              <!-- 支付信息文字描述 -->
              <span class="characters">{{ item.msg }}</span>
            </div>
            <!-- 单选按钮 -->
            <Radio :name="item.name" />
          </div>
        </RadioGroup>
      </div>
    </div>

    <!-- 底部支付界面 -->
    <div class="submit">
      <div class="submit__left">
        <span class="submit__lef--price">¥ {{ total }}</span>
      </div>
      <button class="submit--submit" @click="goto('PlaceOrder')">选好了</button>
    </div>
  </div>
</template>

<script setup>
import { Store } from '@vicons/fa'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { RadioGroup, Radio, Notify } from 'vant'
import { get, api8 } from '@/utils/request'
import { useStore } from 'vuex'
import WdNavbar from '@/components/WdNavbar.vue'
import AddressInfo from './components/addressInfo.vue'
import ShoppingInfo from '@/views/service/shop/components/ShoppingInfo.vue'
const store = useStore()
const router = useRouter()
// 总价默认为0
const total = ref(0)
// 支付单选框状态选定
const status = ref(1)
// 提示显示
const showTip = ref(true)
// 购物车信息
const shopCar = ref(store.state.shop.shopList)
// 收货地址
const deliveryAdd = ref()
// 支付图标等信息
const payWayInfo = reactive([
  {
    payIcon: 'https://wang-rich.oss-cn-hangzhou.aliyuncs.com/imgicon-zfb.png',
    msg: '支付宝',
    name: 1,
  },
  {
    payIcon:
      'https://img0.baidu.com/it/u=1210664285,305400953&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
    msg: '微信',
    name: 2,
  },
])
// 获取默认收货地址
get(api8 + '/address/list', { Index: 1, size: 100 }).then((res) => {
  // console.log(res)
  if (JSON.stringify(store.state.address.address) != '{}') {
    deliveryAdd.value = store.state.address.address
  } else {
    res.forEach((element) => {
      if (element.status == 1) {
        setaddress(element)
        deliveryAdd.value = element
      }
    })
  }
})

// 自定义长按事件,长按开始
let time = ref()
const start = (shopId, commodityId) => {
  time.value = setTimeout(() => {
    store.commit('clearShopData', {
      shopId,
      commodityId,
    })
    getTotal()
  }, 1000)
}

// 长按结束事件
const end = () => {
  clearTimeout(time.value)
  if (showTip.value) {
    showTip.value = false
    Notify({ type: 'warning', message: '长按1s删除指定的商品或是商店,移动取消' })
  }
}

// 存储地址信息
const setaddress = (addressInfo) => {
  store.commit('changeAddressInfo', { addressInfo })
}
// 计算总价
const getTotal = () => {
  total.value = 0
  for (const key in store.state.shop.shopList) {
    total.value += store.state.shop.shopList[key].total
  }
}

// 路由跳转
const goto = (pathName) => {
  router.push({ name: pathName })
}
// 订单跳转商店界面
const goshop = (index) => {
  router.push({ name: 'ShopDetail', params: { id: index } })
}
// 初始化总价
getTotal()
</script>
<style scoped lang="scss">
// 整体背景设置
.app {
  background-color: #f3f4f6;
  min-height: 100vh;
  // 收货地址上下边距
  padding-bottom: 45px;
  .container {
    margin: 10px 0;
  }
  // 购物信息及支付方式
  .content {
    margin: 10px;
  }
}
.card {
  background: $cf;
  border-radius: 5px;
  box-shadow: 0 5px 3px #3333332d;
  margin-bottom: 20px;
  &__store {
    padding: 10px;
    padding-bottom: 0px;
    &--icon {
      width: 16px;
      height: 14px;
      color: $c8;
      margin-right: 8px;
    }
    &--name {
      font-size: 15px;
      font-weight: 500;
      color: #333333;
      line-height: 15px;
    }
  }
  &__total {
    display: flex;
    justify-content: end;
    border-top: 1px solid #f3f4f6;
    color: $c8;
    font-size: 14px;
    font-weight: 500;
    line-height: 14px;
    padding: 15px 18px;
    &--price {
      color: #dc3333;
      margin-left: 10px;
    }
  }
}
.tip {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
}
.pay {
  background: $cf;
  box-shadow: 0 5px 3px #3333332d;
  border-radius: 5px;
  margin-top: 14px;
  padding: 0px 23px 0px 23px;
  &__card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 17px 0;
    &__content {
      display: flex;
      align-items: center;
      .icon {
        width: 32px;
        height: 32px;
      }
      .characters {
        font-size: 17px;
        line-height: 17px;
        margin-left: 17px;
        font-weight: 400;
        color: $c4;
      }
    }
  }
}
.submit {
  background: $cf;
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
    color: #dc3333;
    &--price {
      line-height: 17px;
      font-size: 17px;
    }
  }
  &--submit {
    height: 35px;
    width: 86px;
    background: #ff8c11;
    color: $cf;
    font-size: 16px;
    border-radius: 5px;
    border: none;
  }
}
</style>
