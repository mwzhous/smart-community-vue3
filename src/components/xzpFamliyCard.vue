/* *@description: 联系人组件 *@author: 肖展鹏 *@date: 2022-05-14 */
<template>
  <div class="family">
    <div style="width: 300px">
      <div v-for="(item, index) in isshow.familyList" :key="index" class="mycard">
        <div class="mycard__fonts">
          <div class="mycard__fonts__name">{{ item.name }}</div>
          <br />
          <div class="mycard__fonts__phone">{{ item.phone }}</div>
        </div>
        <div class="mycard__icons">
          <Pen class="mycard__icons__pen" @click="gochange(item.id)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Pen } from '@vicons/fa'
import { get, api1 } from '@/utils/request'
import { reactive } from 'vue'
// import { Toast } from 'vant'
import { useRouter } from 'vue-router'
// import WdScroll from '@/components/WdScroll.vue'
const router = useRouter()
const isshow = reactive({
  familyList: [],
})

get(api1 + '/personal/family', {
  page: 1,
  size: 30,
}).then((res) => {
  const arr = res
  arr.forEach((ele) => {
    isshow.familyList.push(ele)
  })
})

const gochange = (index) => {
  router.push({
    path: `/person/familychange/${index}`,
  })
}
</script>

<style lang="scss" scoped>
.family {
  height: calc(100vh - 44px);
  padding-bottom: 20px;
}
.mycard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 390px;
  height: 77px;
  margin-left: 12px;
  margin-top: 12px;
  border: 1px solid #ececec;
  border-radius: 10px;
  background-color: #fff;
  padding: 0 26px 0 26px;
  &__fonts {
    &__name {
      display: inline-block;
      height: 20px;
      color: #444444;
      font-size: 17px;
      margin-bottom: 10px;
    }
    &__phone {
      display: inline-block;
      height: 20px;
      color: #aaaaaa;
      font-size: 15px;
      margin: 0;
    }
  }
  &__icons {
    &__pen {
      height: 21px;
      width: 20px;
    }
  }
}
</style>
