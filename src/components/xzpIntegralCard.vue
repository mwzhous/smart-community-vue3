<template>
  <div v-for="(item, index) in isshow.lists" :key="index" class="jitem">
    <div class="jitem__left">
      <div class="jitem__left__one">{{ item.purpose }}</div>
      <div class="jitem__left__two">{{ item.updateTime }}</div>
    </div>

    <div class="jitem__right">{{ item.count }}</div>
  </div>
</template>

<script setup>
import { get, api1 } from '@/utils/request.js'
import { reactive } from 'vue'
const isshow = reactive({
  lists: [],
})

get(api1 + '/personal/integration').then((res) => {
  isshow.lists = res.integrationList
})
</script>

<style lang="scss" scoped>
.jitem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 374px;
  height: 78px;
  background-color: #fff;
  border: 0.5px solid #ded;
  border-radius: 5px;
  margin: 12px 0 0 20px;
  &__left {
    margin-left: 23px;
    &__one {
      font-size: 17px;
      color: #111111;
      margin-bottom: 10px;
    }
    &__two {
      font-size: 15px;
      color: #aaaaaa;
    }
  }
  &__right {
    margin-right: 23px;
    color: #59c535;
    font-size: 22px;
  }
}
</style>
