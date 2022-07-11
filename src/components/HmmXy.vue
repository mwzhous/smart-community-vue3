// eslint-disable-next-line vue/multi-word-component-names /* * @description:想要立刻联系组件 *
@author: 何明明 * @date: 2022-05-21 */
<template>
  <div class="box">
    <div class="box__info">
      <img class="box__info--icon" :src="arrs[isShow.a]" @click="change" />
      <div class="box__info--wz">{{ wz }}</div>
      <div class="box__info--id">{{ id }}</div>
    </div>
    <Button color="#F17716" class="box--botton">立刻联系</Button>
  </div>
</template>
<script setup>
import { Button } from 'vant'
import { ref, reactive } from 'vue'
import { post, api3, api7, del, get } from '@/utils/request'
const isShow = reactive({ a: 0 })
const arrs = ref([
  'https://wx-login.oss-cn-shanghai.aliyuncs.com/upload/%E5%9B%BE%E6%A0%87/icon_x1.png',
  'https://wx-login.oss-cn-shanghai.aliyuncs.com/upload/%E5%9B%BE%E6%A0%87/icon_wdsc.png',
])

const result = defineProps({
  wz: String,
  id: String,
})
get(api3 + '/fleaMarket/mark').then((res) => {
  const idList = res.filter(item => {
    return item.id == result.id
  })
  if(idList.length != 0) {
     isShow.a = ++isShow.a % 2
  }
})

const change = () => {
  isShow.a = ++isShow.a % 2
  if (result.wz == '想要') {
    if (isShow.a) {
      post(api3 + '/fleaMarket/mark/' + result.id).then((res) => {
        // console.log(res)
      })
    } else if (isShow.a == 0) {
      del(api3 + '/fleaMarket/mark/' + result.id).then((res) => {
        // console.log(res)
      })
    }
  } else if (result.wz == '收藏') {
    if (isShow.a) {
      post(api7 + '/estate/mark/' + result.id).then((res) => {
        // console.log(res)
      })
    } else if (isShow.a == 0) {
      del(api7 + '/estate/mark/' + result.id).then((res) => {
        // console.log(res)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  background-color: #fff;
  height: 50px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  &__info {
    display: flex;
    align-items: center;
    &--icon {
      margin-left: 24px;
      width: 18px;
      height: 17px;
      margin-right: 9px;
    }
    &--wz {
      line-height: 16px;
      font-size: 16px;
      font-weight: 500;
      color: #444444;
    }
    &--id {
      display: none;
    }
  }
  &--botton {
    margin: 7px 12px 7px 0px;
    height: 35px;
  }
}
</style>
