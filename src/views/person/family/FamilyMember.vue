/* *@description: 家庭成员页面 *@author: 肖展鹏 *@date: 2022-05-14 */
<template>
  <div class="all">
    <WdNavbar
      title="家庭成员"
      :show-slot="true"
      icon-url="add"
      :on-click-right="onClickRight"
      to="PersonView"
    />
    <card />
  </div>
</template>
<script setup>
import card from '@/components/xzpFamliyCard.vue'
import { useRouter } from 'vue-router'
import WdNavbar from '@/components/WdNavbar.vue'
const router = useRouter()

const onClickRight = () => {
  router.push('/person/familyadd')
}
</script>
<style lang="scss" scoped>
.all {
  width: 100%;
  height: 100vh;
  background-color: #f3f4f6;
  padding-bottom: 50px;
  overflow: scroll;
}
.icons {
  width: 18px;
  height: 18px;
  color: #a1a1a1;
}
</style>
