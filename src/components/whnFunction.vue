/* *@description:小区商家功能区组件 *@author: 王浩南 *@date: 2022-05-15 */
<template>
  <div>
    <!-- 功能区 -->
    <div class="function">
      <div v-for="(item,index) in functionInfo" :key="index" class="function__container" @click="goto(item.pathName,item.info)">
        <img :src="item.url" alt="" class="function__container--img" />
        <span class="function__container--content">{{ item.info }}</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

defineProps({
  // 在functionInfo数组中放入对象{ url: 图片路径, info: 功能描述,pathName: 跳转的路径名 },
  functionInfo: Array,
})
// 前往下一个界面界面
const router = useRouter()
const goto = (pathName,type) => {
  router.push({ name: pathName ,params:{ type:type}})
}
</script>

<style lang="scss" scoped>
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
</style>
