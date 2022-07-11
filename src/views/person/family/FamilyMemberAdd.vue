<template>
  <div class="all">
    <!-- navbar -->
    <WdNavbar title="家庭成员添加" />
    <div style="width: 100%; height: 119px; background-color: #fff; margin-top: 12px">
      <div class="familyform">
        <div class="familyform__name">
          <label class="familyform__name__lab">姓名：</label>
          <input
            v-model="isshow.name"
            type="text"
            class="familyform__name__val"
            placeholder="请输入姓名"
          />
        </div>
        <div class="familyform__phone">
          <label class="familyform__name__lab">电话：</label>
          <input
            v-model="isshow.phone"
            type="text"
            class="familyform__name__val"
            placeholder="请输入手机号"
          />
        </div>
      </div>
      <button class="button" @click="fadd">添加</button>
    </div>
  </div>
</template>

<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import { Toast } from 'vant'
import { reactive } from 'vue'
import { useStore } from 'vuex'
import { post, api1 } from '@/utils/request.js'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()
const isshow = reactive({
  name: '',
  phone: '',
})

const fadd = () => {
  // console.log(store.state.user.userInfo.familyId)
  post(api1 + '/personal/family', {
    name: isshow.name,
    phone: isshow.phone,
    familyId: store.state.user.userInfo.familyId,
  }).then(
    () => {
      Toast('添加成功')
    },
    () => {
      Toast.fail('添加失败')
    },
  )
  setTimeout(() => {
    router.push('/person/family')
  }, 1500)
}
</script>
<style scoped lang="scss">
.all {
  width: 100%;
  height: 100vh;
  background-color: #f3f4f6;
}
.button {
  width: 391px;
  height: 52px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  background-color: #f48010;
  border: 1.5px solid #d5d5d5;
  border-radius: 7px;
  margin: 58px 0 0 12px;
}
.familyform {
  &__name {
    width: 414px;
    height: 58px;
    line-height: 58px;
    &__lab {
      font-size: 16px;
      margin-left: 22px;
    }
    &__val {
      font-size: 16px;
      width: 300px;
      border: 0;
      margin-left: 33px;
    }
  }
  &__phone {
    width: 414px;
    height: 58px;
    line-height: 58px;
    &__lab {
      font-size: 16px;
      margin-left: 22px;
    }
    &__val {
      font-size: 16px;
      width: 300px;
      border: 0;
      margin-left: 33px;
    }
  }
}
</style>
