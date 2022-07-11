<template>
  <div class="all">
    <!-- navbar -->
    <WdNavbar title="家庭成员修改" />

    <div
      class="familyform"
      style="width: 100%; height: 119px; background-color: #fff; margin-top: 12px"
    >
      <div class="familyform__name">
        <span class="familyform__name__lab">姓名：</span>
        <input v-model="isshow.name" type="text" class="familyform__name__val" />
      </div>
      <div class="familyform__phone">
        <span class="familyform__name__lab">电话：</span>
        <input v-model="isshow.phone" type="text" class="familyform__name__val" />
      </div>
      <button class="button" @click="gochange">修改</button>
    </div>
  </div>
</template>

<script setup>
import WdNavbar from '@/components/WdNavbar.vue'
import { useRoute, useRouter } from 'vue-router'
import { get, put } from '@/utils/request.js'
import { Toast } from 'vant'
import { reactive } from 'vue'
const route = useRoute()
const router = useRouter()
const isshow = reactive({
  name: '',
  phone: '',
})
const id = route.params.id
get('http://106.14.169.149:8081/api/personal/family').then((res) => {
  for (let i in res) {
    if (res[i].id == id) {
      isshow.name = res[i].name
      isshow.phone = res[i].phone
    }
  }
})

const gochange = () => {
  put('http://106.14.169.149:8081/api/personal/family', {
    id: id,
    name: isshow.name,
    phone: isshow.phone,
  }).then(
    () => {
      Toast('修改成功')
    },
    () => {
      Toast.fail('修改失败')
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
  overflow: hidden;
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
