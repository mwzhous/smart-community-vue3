<template>
  <div class="page">
    <ConfigProvider :theme-vars="themeVars">
      <Dropdown-menu class="page__top-menu" :style="{ 'background-color': bgMenu }">
        <Dropdown-item
          v-model="value1"
          :options="options"
          @change="change"
          @open="openMenu"
          @close="closeMenu"
        />
      </Dropdown-menu>
      <Swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <swipe-item v-for="(item, index) in imgList" :key="index">
          <img :src="item.imageUrl" />
        </swipe-item>
      </Swipe>
      <div class="main">
        <div class="tongzhi">
          <NoticeBar left-icon="volume-o" :scrollable="false">
            <swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
              <swipe-item>三更灯火五更鸡，正是青年备考时</swipe-item>
              <swipe-item>年轻不知考公早，中年方悔无编迟</swipe-item>
              <swipe-item>他坚持了考公八年多，他改善了全家生活</swipe-item>
              <swipe-item>喜报：本小区新增两亿灵活就业居民</swipe-item>
            </swipe>
          </NoticeBar>
        </div>

        <div class="sy1">
          <router-link :to="{ name: 'OpenDoor' }">
            <img src="/src/assets/sy1.png" />
          </router-link>
          <span>智慧开门</span>
          <p>手机控制门锁</p>
        </div>
        <div class="sy2">
          <router-link :to="{ name: 'SecurityView' }">
            <img src="/src/assets/sy2.png" />
          </router-link>
          <span>智能家居</span>
          <p>科技掌控生活</p>
        </div>
        <div class="sy3">
          <router-link :to="{ name: 'ParkView' }">
            <img src="/src/assets/sy3.png" />
          </router-link>
          <span>社区停车</span>
          <p>快速寻找车位</p>
        </div>
        <div class="sy4">
          <router-link :to="{ name: 'PropertyService' }">
            <img src="/src/assets/sy4.png" />
          </router-link>
          <span>物业服务</span>
          <p>物业保修缴费</p>
        </div>
      </div>
      <span class="text1">民生资讯</span>
      <router-link :to="{ name: 'MessageInfo' }">
        <span class="text2">查看全部</span>
      </router-link>

      <div v-for="(item, index) in isshow" :key="index" class="zx" @click="detail(item.id)">
        <img :src="item.imageUrl" />
        <span>{{ item.title }}</span>
      </div>
    </ConfigProvider>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { Swipe, SwipeItem } from 'vant'
import { DropdownMenu, DropdownItem, ConfigProvider } from 'vant'
import { get, api4, api1, put } from '@/utils/request'
import { NoticeBar } from 'vant'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const store = useStore()
const imgList = ref([])
const isshow = ref([])
const value1 = ref(0)
const options = ref([])
// 保存Token
const route = useRoute()
const setToken = () => {
  const token = route.query.token
  if (token) {
    store.commit('user/setToken', token)
  }
}
setToken()

const getnews = () => {
  get(api4 + '/index/news', {
    page_number: 1,
    size: 6,
  })
    .then((res) => {
      isshow.value = res.records
    })
    .catch((err) => {
      // console.log('err', err)
    })
}
getnews()
get(api4 + '/index/advertising/0')
  .then((value) => {
    imgList.value = value
  })
  .catch((err) => {
    // console.log('err', err)
  })

get(api1 + '/personal/community', {
  page: 1,
  size: 30,
}).then((res) => {
  const arr = res.communityList
  arr.forEach((ele) => {
    options.value.push({ text: ele.name, value: ele.id })
  })
  value1.value = res.currentCommunity.id
})

const findName = computed(() => {
  const target = options.value.find((e) => {
    return (e.value = value1.value)
  })
  return target.text
})
const change = (val) => {
  put(api1 + '/personal/community', {
    communityId: val,
    name: findName.value,
  }).then(() => {
    value1.value = val
    getnews()
  })
}

const bgMenu = ref('')
// 打开/关闭 菜单栏
const openMenu = () => {
  bgMenu.value = '#fff'
}
const closeMenu = () => {
  bgMenu.value = 'transparent'
}
// 自定义vant主题
const themeVars = {
  noticeBarBackgroundColor: '#fff',
  dropdownMenuBackgroundColor: 'transparent',
  dropdownMenuBoxShadow: 'none',
}
// 跳转到详情页
const detail = (val1) => {
  store.state.ArticleId = val1
  router.push({ path: '/home/detail', query: { id: val1 } })
}
</script>
<style lang="scss" scoped>
.page {
  width: 414px;
  height: 100%;
  background-color: #f3f4f6;
  position: relative;
  padding-bottom: 80px;
  position: relative;
  &__top-menu {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }
}
.top {
  width: 414px;
  height: 208px;
  position: absolute;
  top: 0;
}
.my-swipe .van-swipe-item {
  color: #fff;
  height: 208px;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #fff;
  img {
    width: 414px;
    height: 208px;
  }
}

.main {
  width: 391px;
  height: 230px;
  background: #ffffff;
  border-radius: 6px;
  position: relative;
  top: 10px;
  left: 12px;
  .tongzhi {
    padding-left: 10px;
  }
  .notice-swipe {
    height: 40px;
    line-height: 40px;
    background-color: #fff;
  }

  span {
    height: 25px;
    line-height: 25px;
    position: absolute;
    left: 35px;
  }
  .sy1 {
    width: 160px;
    height: 58px;
    border-radius: 50%;
    position: absolute;
    top: 70px;
    left: 19px;
    img {
      width: 58px;
      height: 58px;
    }
    span {
      width: 70px;
      height: 15px;
      font-size: 16px;
      font-family: PingFang;
      font-weight: 500;
      color: #333333;
      position: absolute;
      top: 5px;
      left: 75px;
    }
    p {
      width: 80px;
      height: 12px;
      font-size: 13px;
      font-family: PingFang;
      font-weight: 400;
      color: #666666;
      position: absolute;
      top: 35px;
      left: 75px;
    }
  }
  .sy2 {
    width: 160px;
    height: 58px;
    border-radius: 50%;
    position: absolute;
    top: 70px;
    left: 214px;
    img {
      width: 58px;
      height: 58px;
    }
    span {
      width: 70px;
      height: 15px;
      font-size: 16px;
      font-family: PingFang;
      font-weight: 500;
      color: #333333;
      position: absolute;
      top: 5px;
      left: 75px;
    }
    p {
      width: 80px;
      height: 12px;
      font-size: 13px;
      font-family: PingFang;
      font-weight: 400;
      color: #666666;
      position: absolute;
      top: 35px;
      left: 75px;
    }
  }
  .sy3 {
    width: 160px;
    height: 58px;
    border-radius: 50%;
    position: absolute;
    top: 150px;
    left: 19px;
    img {
      width: 58px;
      height: 58px;
    }
    span {
      width: 70px;
      height: 15px;
      font-size: 16px;
      font-family: PingFang;
      font-weight: 500;
      color: #333333;
      position: absolute;
      top: 5px;
      left: 75px;
    }
    p {
      width: 80px;
      height: 12px;
      font-size: 13px;
      font-family: PingFang;
      font-weight: 400;
      color: #666666;
      position: absolute;
      top: 35px;
      left: 75px;
    }
  }
  .sy4 {
    width: 160px;
    height: 58px;
    border-radius: 50%;
    position: absolute;
    top: 150px;
    left: 214px;
    img {
      width: 58px;
      height: 58px;
    }
    span {
      width: 70px;
      height: 15px;
      font-size: 16px;
      font-family: PingFang;
      font-weight: 500;
      color: #333333;
      position: absolute;
      top: 5px;
      left: 75px;
    }
    p {
      width: 80px;
      height: 12px;
      font-size: 13px;
      font-family: PingFang;
      font-weight: 400;
      color: #666666;
      position: absolute;
      top: 35px;
      left: 75px;
    }
  }
}

.text1 {
  width: 70px;
  height: 15px;
  font-size: 16px;
  font-family: PingFang;
  font-weight: bold;
  color: #333333;
  position: relative;
  top: 25px;
  left: 20px;
}

.text2 {
  width: 70px;
  height: 13px;
  font-size: 14px;
  font-family: PingFang;
  font-weight: 400;
  color: #888888;
  position: relative;
  top: 25px;
  left: 260px;
}

.zx {
  width: 391px;
  height: 92px;
  background: #ffffff;
  box-shadow: 0px 3px 6px 0px rgba(222, 222, 222, 0.3);
  border-radius: 6px;
  position: relative;
  left: 12px;
  top: 25px;
  margin: 5px 0 5px 0;
  span {
    width: 248px;
    height: 40px;
    font-size: 15px;
    font-family: PingFang;
    font-weight: 500;
    color: #333333;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    position: absolute;
    top: 20px;
    left: 123px;
  }
  img {
    width: 104px;
    height: 92px;
    border-radius: 6px 0 0 6px;
  }
}
</style>
