/* *@description:社区活动 *@author: 徐杰文 *@date: 2022-05-15 */
<template>
  <div class="wrapper">
    <WdNavbar title="智能家居" bg-color="transparent" :fix="false" color="#fff" />
    <p class="hi">Hi，{{ store.getters.userInfo.username }}</p>
    <div class="device">
      <div class="device__item outlet" @click="toOutlet">
        <LightbulbRegular class="device__item--icon" />
        <p>Smart</p>
        <p>Outlet</p>
      </div>
      <div class="device__item">
        <Snowflake class="device__item--icon" />
        <p>Air</p>
        <p>Conditioner</p>
      </div>
      <div class="device__item">
        <Tv class="device__item--icon" />
        <p>Smart</p>
        <p>TV</p>
      </div>
      <div class="device__item">
        <Wifi class="device__item--icon" />
        <p>Wi-Fi</p>
        <p>Router</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import WdNavbar from '../../../components/WdNavbar.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { LightbulbRegular, Snowflake, Tv, Wifi } from '@vicons/fa'
const store = useStore()
const router = useRouter()
const toOutlet = () => {
  router.push({ name: 'OutLet' })
}
</script>
<style lang="scss" scoped>
.wrapper {
  background: linear-gradient(180deg, #d9a7c7, #fffcdc);
  height: 100vh;
  .hi {
    font-size: 30px;
    padding: 20px 20px;
    color: #fff;
    font-weight: bold;
  }
  .device {
    float: right;
    background-color: #fff;
    width: 350px;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(2, 155px);
    gap: 20px 20px;
    border-radius: 10px;
    &__item {
      height: 180px;
      border: 1px solid #bbb;
      border-radius: 10px;
      padding: 10px;
      &--icon {
        color: rgb(197, 69, 112);
        @include wh(70px, 70px);
        margin-bottom: 10px;
      }
      p {
        font-size: 20px;
        line-height: 30px;
      }
    }
  }
}
.outlet {
  background-image: linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%);
  color: #fff;
}
</style>
