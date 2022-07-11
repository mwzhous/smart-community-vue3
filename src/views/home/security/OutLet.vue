<template>
  <WdNavbar
    title="插座"
    :show-slot="true"
    icon-url="https://riddler.oss-cn-shanghai.aliyuncs.com/upload/community_busine_05.png"
    :on-click-right="onClickRight"
  />
  <div class="wrapper">
    <div
      v-for="(item, index) in deviceList"
      :key="index"
      class="item"
      @click="toOption(item.deviceSerial)"
    >
      <img src="https://riddler.oss-cn-shanghai.aliyuncs.com/upload/outlet.png" />
      <p>{{ item.equipmentName }}</p>
    </div>
  </div>
</template>
<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import { useRouter } from 'vue-router'
import { reactive } from '@vue/reactivity'
import { get, api4 } from '@/utils/request'
const router = useRouter()
const onClickRight = () => {
  router.push({ name: 'AddDevice' })
}
const toOption = (val) => {
  router.push({ name: 'OutletOption', params: { deviceSerial: val } })
}
const deviceList = reactive([])
const getData = () => {
  get(api4 + '/smartHome/deviceList').then((val) => {
    val.forEach((ele) => {
      deviceList.push(ele)
    })
  })
}
getData()
</script>
<style lang="scss" scoped>
.wrapper {
  background-color: #f3f4f6;
  height: calc(100vh - 44px);
  overflow: hidden;
  padding: 15px 15px;
  .item {
    @include wh(250px, 100px);
    background-color: #fff;
    box-shadow: 0 12px 5px -10px rgba(0, 0, 0, 0.1), 0 0 4px 0 rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 0 12px 5px -10px rgba(0, 0, 0, 0.1), 0 0 4px 0 rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    @include px(10px);
    margin-bottom: 15px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;

    img {
      @include wh(100px, 50px);
      margin-top: 25px;
    }
    p {
      line-height: 100px;
    }
  }
}
</style>
