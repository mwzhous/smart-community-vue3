<template>
  <div>
    <Swipe lazy-render :show-indicators="false" :loop="false" @change="onChange">
      <SwipeItem>
        <img src="@/assets/img/ydy1.jpg" />
      </SwipeItem>
      <SwipeItem>
        <img src="@/assets/img/ydy2.jpg" />
      </SwipeItem>
      <SwipeItem>
        <img src="@/assets/img/ydy3.jpg" />
      </SwipeItem>
      <SwipeItem>
        <img src="@/assets/img/ydy4.png" />
      </SwipeItem>
    </Swipe>
    <router-link :to="{ name: 'HomeView' }">
      <NButton v-show="page == 3">立即体验</NButton>
    </router-link>
  </div>
</template>
<script setup>
import { ref } from '@vue/reactivity'
import { Swipe, SwipeItem } from 'vant'
const page = ref(0)
const onChange = (index) => {
  page.value = index
}
</script>
<style lang="scss" scoped>
img {
  width: 414px;
  height: 600px;
}
button {
  background: $primary-lg;
  width: 150px;
  height: 60px;
  border-radius: 30px;
  font-size: 20px;
  color: #fff;
  margin-left: calc(50% - 75px);
}
</style>
