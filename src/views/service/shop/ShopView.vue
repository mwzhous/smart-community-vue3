/* *@description:小区商家首页 *@author: 王浩南 *@date: 2022-05-15 */
<template>
  <div class="main">
    <!-- navbar -->
    <NavBar
      title="小区商家"
      left-arrow
      right-text="我的店铺"
      safe-area-inset-top
      placeholder
      fixed
      border
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- 轮播图 -->
    <Swipe :autoplay="3000" indicator-color="white">
      <div v-for="(item, index) in swipeImg" :key="index">
        <SwipeItem><img :src="item.photo" style="height: 144px; width: 414px" alt="" /></SwipeItem>
      </div>
    </Swipe>
    <!-- 功能区 -->
    <div class="function">
      <div
        v-for="(item, index) in functionInfo"
        :key="index"
        class="function__container"
        @click="getShopInfo(index + 1)"
      >
        <img :src="item.url" alt="" class="function__container--img" />
        <span class="function__container--content">{{ item.info }}</span>
      </div>
    </div>
    <!-- 商店信息 -->
    <div v-for="(item, index) in commodityInfo" :key="index">
      <HomeShop
        :class="item.status ? '' : 'dark'"
        :url="item.imgurl"
        :name="item.name"
        :sales="item.sales"
        :status="item.status"
        @change="goshop(item.id, item.status)"
      />
    </div>
  </div>
</template>
<script setup>
import { NavBar } from 'vant'
import { useRouter } from 'vue-router'
import { Swipe, SwipeItem } from 'vant'
import { ref, reactive } from 'vue'
import { get, api8 } from '@/utils/request.js'
import HomeShop from '@/views/service/shop/components/shopShow.vue'
const router = useRouter()
// 商品信息
const commodityInfo = ref([])

// 轮播图数据
const swipeImg = ref()
//功能区数据
// { url: 图片路径, info: 功能描述,typeId: 商店分类 },
const functionInfo = reactive([
  {
    url: 'https://riddler.oss-cn-shanghai.aliyuncs.com/upload/鲜花.png',
    info: '鲜花',
  },
  {
    url: 'http://riddler.oss-cn-shanghai.aliyuncs.com/upload/超市.png',
    info: '超市',
  },
  {
    url: 'https://riddler.oss-cn-shanghai.aliyuncs.com/upload/水果店.png',
    info: '水果',
  },
  {
    url: 'http://wang-rich.oss-cn-hangzhou.aliyuncs.com/img/flea_market_09.png',
    info: '数码',
  },
  {
    url: 'http://wang-rich.oss-cn-hangzhou.aliyuncs.com/img/flea_market_11.png',
    info: '工具',
  },
])


// 获取轮播图片
get(api8+'/photo/list').then((res)=>{
  swipeImg.value=res
})

// 获取商店信息
const getShopInfo = (index) => {
  get(api8 + '/shop/list/' + index, { Index: 1, size: 100 }).then((res) => {
    commodityInfo.value = res
  })
}
// navbar左键前往上一页
const onClickLeft = () => {
  router.back()
}

// navbar右键前往我的店铺
const onClickRight = () => {
  router.push({ name: 'MyShop' })
}

// 跳转到店铺详情
const goshop = (index, status) => {
  if (status) {
    router.push({ name: 'ShopDetail', params: { id: index } })
  }
}

// 默认获取第一分类的商店信息
getShopInfo(1)
</script>

<style lang="scss" scoped>
.main {
  min-height: 100vh;
  background: #f3f4f5;
}

.function {
  display: flex;
  justify-content: space-between;
  padding: 17px;
  &__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    &--img {
      width: 58px;
      height: 58px;
      margin-bottom: 18px;
    }
    &--content {
      font-size: 15px;
      color: #333333;
    }
  }
}
// 暂停营业状态样式
.dark {
  z-index: 999;
  background: $cb;
}
</style>
