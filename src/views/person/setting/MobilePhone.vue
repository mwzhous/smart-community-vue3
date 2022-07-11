<template>
  <WdNavbar title="手机号" />
  <div class="wrapper">
    <img :src="store.getters.userInfo.avatar" alt="" />
    <p>您当前的手机号为</p>
    <p class="wrapper__phone">{{ phone }}</p>
    <ol class="wrapper__tips">
      <li>1.更换手机后，当前账户基础信息保持不变，部分权益将会失效</li>
      <li>2.更换成功之后，请使用新手机号进行登录</li>
      <li>3.30天内智能修改一次手机号</li>
    </ol>

    <router-link :to="{ name: 'ModifyPhone' }">
      <NButton>好了我知道了，我要更换</NButton>
    </router-link>
  </div>
</template>
<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
const phone = computed(() => {
  let phoneNumber = store.getters.userInfo.phone
  if (phoneNumber) {
    return phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  } else return '未绑定'
})
</script>
<style lang="scss" scoped>
.wrapper {
  background-color: #f3f4f6;
  height: calc(100vh - 44px);
  padding-top: 37px;

  img {
    display: block;
    height: 80px;
    width: 80px;
    border-radius: 50%;
    margin: 0 auto 27px;
  }
  p {
    text-align: center;
    font-size: 21px;
    margin-bottom: 16px;
  }
  &__phone {
    color: $wd-primary;
  }
  &__tips {
    color: $c8;
    @include px(30px);
  }
  button {
    height: 52px;
    width: 374px;
    margin: 30px 20px 0 20px;
    background: $primary-lg;
    color: $cf;
    font-size: 20px;
    border-radius: 8px;
  }
}
</style>
