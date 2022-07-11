@author: 陈旺
<template>
  <div ref="wrap" class="wd-scorll">
    <slot />
  </div>
</template>
<script setup>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import MouseWheel from '@better-scroll/mouse-wheel'
import { getCurrentInstance, onMounted } from 'vue'
// 注册插件
BScroll.use(Pullup).use(MouseWheel)
var bscroll
const props = defineProps({
  // 上拉加载新数据的方法
  getData: {
    type: Function,
    default: () => {},
  },
  // 指定 wd-scorll 的某一个 children 作为 content，0是第一个子元素
  index: {
    type: Number,
    default: 0,
  },
})
const { proxy } = getCurrentInstance()

onMounted(() => {
  initBscroll()
})

const initBscroll = () => {
  bscroll = new BScroll(proxy.$refs.wrap, {
    specifiedIndexAsContent: props.index,
    mouseWheel: true,
    pullUpLoad: {
      threshold: 30,
    },
    click: true,
    taps: true,
  })

  bscroll.on('pullingUp', pullingUpHandler)
}
// 上拉加载
const pullingUpHandler = async () => {
  await props.getData()
  bscroll.finishPullUp()
  bscroll.refresh()
}
</script>
<style lang="scss" scoped>
.wd-scorll {
  height: 100%;
  overflow: hidden;
}
</style>
