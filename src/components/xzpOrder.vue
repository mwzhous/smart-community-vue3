<template>
  <div v-for="(item, index) in isshow.list" :key="index" class="order__item">
    <div class="order__item__top">
      <div @click="shopitem(item.shopId)">
        <span><ShoppingCart class="icons" /></span>
        <span style="margin: 0 10px 0 10px">进入商店</span>
        <span><AngleRight class="icons" /></span>
      </div>
      <div style="color: #f17716">{{ a[props.active] }}</div>
    </div>
    <div class="order__item__mid">
      <div>
        <img :src="item.imgurl" style="width: 86px; height: 77px" />
      </div>
      <div>
        <span style="display: inline-block; margin-bottom: 16px; font-size: 13px">{{
          item.name
        }}</span>
        <br />
        <span style="display: inline-block; margin-bottom: 16px; font-size: 12px; color: #aaaaaa">{{
          item.name
        }}</span>
      </div>
      <span style="width: 120px"></span>
      <div>
        <span style="display: inline-block; margin-bottom: 16px; font-size: 14px">{{
          item.price
        }}</span>
        <br />
        <span style="display: inline-block; margin-bottom: 16px; font-size: 10px; color: #aaaaaa"
          >x 1</span
        >
      </div>
    </div>

    <div class="order__item__bot">
      <button v-if="item.status == 3 || item.status == 4" class="del" @click="del(item.id)">
        删除订单
      </button>
      <button v-if="item.status == 1 || item.status == 2" class="cal">取消订单</button>
      <button v-if="item.status == 3" class="can">确认收货</button>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { AngleRight, ShoppingCart } from '@vicons/fa'
import { get, api8 } from '@/utils/request.js'
import { reactive } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()

const isshow = reactive({
  list: [],
})

const props = defineProps({
  active: Number,
})
const a = ref(['全部', '未处理', '处理中', '已完成', '已取消'])

if (props.active == 0) {
  get(api8 + '/order/list').then((res) => {
    isshow.list = res
    // console.log(isshow.list)
  })
} else if (props.active == 1) {
  get(api8 + '/order/status', { status: 1 }).then((res) => {
    isshow.list = res
    // console.log(isshow.list)
  })
} else if (props.active == 2) {
  get(api8 + '/order/status', { status: 2 }).then((res) => {
    isshow.list = res
    // console.log(isshow.list)
  })
} else if (props.active == 3) {
  get(api8 + '/order/status', { status: 3 }).then((res) => {
    isshow.list = res
    // console.log(isshow.list)
  })
} else {
  get(api8 + '/order/status').then((res) => {
    isshow.list = res
    // console.log(isshow.list)
  })
}

const shopitem = (val) => {
  router.push({ path: `/service/shop/detail/${val}` })
}

const del = (val) => {
  const formData = new FormData()
  formData.append('id', val)
  axios
    .post('http://106.14.169.149:8088/api/order/update', formData, {
      headers: {
        token: store.getters.token,
      },
    })
    .then((res) => {
      Toast('删除成功')
      router.go(0)
    })
    .catch(() => {
      Toast.fail('删除失败')
    })
}
</script>
<style lang="scss">
.order__item {
  display: flex;
  flex-direction: column;
  border: 1px solid #aaa;
  border-radius: 8px;
  background-color: #fff;
  padding: 10px 0 0 8px;
  height: 173px;
  width: 377px;
  margin-left: 19px;
  text-align: center;
  margin-top: 15px;
  &__top {
    display: flex;
    justify-content: space-between;
    width: 357px;
    height: 30px;
    // background-color: rgba(255, 100, 100, 0.1);
  }
  &__mid {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 357px;
    height: 90px;
    // background-color: rgba(100, 255, 100, 0.1);
  }
  &__bot {
    display: flex;
    justify-content: flex-end;
    width: 357px;
    height: 28px;
    // background-color: rgba(100, 100, 255, 0.1);
  }
}
.icons {
  width: 18px;
  height: 18px;
  color: #b9b9b9;
  vertical-align: middle;
}
.del {
  background-color: #fff;
  border: 1px solid #bbbbbb;
  border-radius: 5px;
  color: #666;
  margin: 0 15px 0 0;
}
.can {
  background-color: #f17815;
  border: 1px solid #ccc;
  border-radius: 5px;
  color: #fff;
  margin: 0 15px 0 0;
}
.cal {
  background-color: #ffc773;
  border: 1px solid #ddd;
  border-radius: 5px;
  color: #1c1c1c;
  margin: 0 15px 0 0;
}
</style>
