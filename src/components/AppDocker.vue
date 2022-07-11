/* *@description:Tabbar标签栏 *@author: 陈旺 *@date: 2022-05-13 */
<template>
  <div class="docker">
    <div class="docker__item">
      <router-link :to="{ name: 'HomeLayout' }">
        <div class="docker__item--icon">
          <Home />
        </div>
        <div class="docker__item--title">首页</div>
      </router-link>
    </div>
    <div class="docker__item">
      <router-link :to="{ name: 'ServiceLayout' }">
        <div class="docker__item--icon">
          <Heartbeat />
        </div>
        <div class="docker__item--title">社区服务</div>
      </router-link>
    </div>
    <div class="docker__item">
      <router-link :to="{ name: 'CommuView' }">
        <div class="docker__item--icon">
          <Chatbubbles />
        </div>
        <div class="docker__item--title">社区交流</div>
      </router-link>
    </div>
    <div class="docker__item">
      <router-link :to="{ name: 'PersonView' }">
        <div class="docker__item--icon">
          <UserAlt />
        </div>
        <div class="docker__item--title">个人中心</div>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { UserAlt, Home, Heartbeat } from '@vicons/fa'
import { Chatbubbles } from '@vicons/ionicons5'
defineProps({
  currentIndex: Number,
})
</script>

<style lang="scss" scoped>
.docker {
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 54px;
  padding-top: 8px;
  background-color: #fff;
  box-shadow: 0px 0px 6px 0px #e9e9e9;

  &__item {
    flex: 1;
    text-align: center;
    &--icon {
      width: 22px;
      height: 22px;
      margin: auto;
    }
    &--title {
      font-size: 11px;
      line-height: 20px;
    }
  }
}
a {
  color: $c8;
}
.router-link-active {
  color: $wd-primary;
}
</style>
