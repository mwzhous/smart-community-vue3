/* *@author: 王浩南 */
<template>
  <div class="app">
    <!-- navbar -->
    <WdNavbar title="社区停车" />
    <!-- function -->
    <div class="function">
      <div
        v-for="(item, index) in functionInfo"
        :key="index"
        class="container"
        :style="'border-color:' + item.color"
        @click="goto(item.pathName)"
      >
        <img :src="item.icon" alt="" class="container--icon" />
        <div class="container__description">
          <span class="container__description--title"> {{ item.title }} </span>
          <span class="container__description--content"> {{ item.content }} </span>
        </div>
      </div>
    </div>
    <!-- 附近停车场 -->
    <span class="division">附近停车场</span>
    <!-- 停车场信息 -->
    <div v-if="show">
      <div v-for="(item, index) in parkinfo" :key="index">
        <parkInfo
          :title="item.communityName"
          :distance="item.distant"
          :surpule="item.carports"
          :total="item.totalCarports"
          :eword="item.communityName"
          :longitude="item.longitude"
          :latitude="item.latitude"
          @click="compare(item.parkingId, 'ParkingPage', item.parkingId)"
        />
      </div>
    </div>
    <img v-else class="img" src="../../../assets/whn/数据为空.png" />
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { jsonp } from 'vue-jsonp'
import { api5, get } from '@/utils/request.js'
import { useStore } from 'vuex'
import { Dialog } from 'vant'
import WdNavbar from '@/components/WdNavbar.vue'
import parkInfo from './components/parkInfo.vue'
import axios from 'axios'

const store = useStore()
const router = useRouter()
// 车位信息
const truckInfo = ref([])
// 停车场信息
const parkinfo = ref([])
// 展示车位信息状态
const show = ref()
//车位管理/贵宾邀请卡片信息
const functionInfo = reactive([
  {
    icon: 'https://wang-rich.oss-cn-hangzhou.aliyuncs.com/imgicon_chewei.png',
    color: '#FF932A',
    title: '车位管理',
    content: '管理自己的车位',
    pathName: 'ParkManage',
  },
  {
    icon: 'https://wang-rich.oss-cn-hangzhou.aliyuncs.com/imgicon_guibing.png',
    color: '#329BDD',
    title: '贵宾邀请',
    content: '邀请朋友来访',
    pathName: 'ParkInvite',
  },
])

// 获取以租凭的车位列表
get(api5 + '/park/manageCarport').then((res) => {
  truckInfo.value = res
  // console.log(res)
})

// 判断是否租聘车位
const compare = (id, pathName, parkId) => {
  // 判断在该车厂是否有租聘车位
  const temp = ref(
    truckInfo.value.find((e) => {
      return e.parkingId == id
    }),
  )
  if (JSON.stringify(temp.value) != undefined) {
    goto(pathName, parkId, 1, JSON.stringify(temp.value))
  } else {
    Dialog.confirm({
      message: '您没有可用车位是否租聘车位',
    })
      .then(() => {
        goto('RentalPark', parkId, 1)
      })
      .catch(() => {
        goto(pathName, parkId, 0)
      })
  }
}

/**
 * 获取定位
 */
let data = {
  key: '27VBZ-ZWQCW-BQ7RX-R3JOJ-MJBFV-Y2BPL', //key
}
let url = 'https://apis.map.qq.com/ws/location/v1/ip' //地理位置信息的接口
data.output = 'jsonp'
jsonp(url, data)
  .then((res) => {
    res.result.location.lat
    res.result.location.lng
    // 获取附近停车场信息
    axios({
      url: api5 + '/park/parkingList',
      method: 'POST',
      headers: { token: store.getters.token },
      params: {
        longitude: res.result.location.lng,
        latitude: res.result.location.lat,
      },
    }).then((resp) => {
      parkinfo.value = resp.data.data
      show.value = ref(Object.keys(parkinfo.value).length != 0)
    })
  })
  .catch((error) => {
    // console.log(error)
  })

// 路由跳转
const goto = (pathName, id, status, info) => {
  router.push({ name: pathName, params: { id: id, status: status, info: info } })
}
</script>
<style lang="scss" scoped>
.app {
  height: 100vh;
  background: #f3f4f5;
  position: relative;
}
.function {
  display: flex;
  .container {
    box-shadow: 0 3px 5px #3333332e;
    align-items: center;
    justify-content: center;
    width: 190px;
    height: 86px;
    background: #fff;
    border-left: 5px solid #ff932a;
    border-radius: 5px;
    margin: 10px;
    display: flex;
    &--icon {
      width: 45px;
      height: 36px;
      margin-right: 17px;
    }
    &__description {
      display: flex;
      flex-direction: column;
      &--title {
        font-size: 18px;
        font-weight: 600;
        color: #333333;
        margin-bottom: 5px;
      }
      &--content {
        font-size: 13px;
        font-weight: 400;
        color: #666666;
      }
    }
  }
}
.division {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  line-height: 16px;
  margin-left: 12px;
  display: block;
}
.img {
  position: absolute;
  width: 200px;
  height: 200px;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
}
</style>
