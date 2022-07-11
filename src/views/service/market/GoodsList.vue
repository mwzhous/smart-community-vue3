/* *@description:跳蚤市场--类型页面(手机，工具，数码等) *@author: 何明明 *@date: 2022-05-16 */
<template>
  <WdNavbar :title="type" />
  <div class="box">
    <div class="box__n1">
      <dropdown-menu>
        <dropdown-item v-model="value1" :options="option1" @change="dj0" />
        <dropdown-item v-model="value2" :options="option2" @change="dj1" />
        <dropdown-item v-model="value3" :options="option3" />
      </dropdown-menu>
    </div>
    <PullRefresh v-model="loading" @refresh="onRefresh">
      <List
        v-model:loading="xialoading"
        :finished="finished"
        :offset="10"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(item, index) in items" :key="index" class="box__n2">
          <Remen
            :picture="item.thumbnail"
            :title="item.name"
            :content="item.content"
            :price="item.price"
            @click="xiangqing(item.id)"
          />
        </div>
      </List>
    </PullRefresh>
  </div>
</template>
<script setup>
import { PullRefresh, List } from 'vant'
import WdNavbar from '@/components/WdNavbar.vue'
import Remen from '@/components/ReMen.vue'
import { DropdownMenu, DropdownItem } from 'vant'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { get, api3 } from '@/utils/request'
import { ref } from 'vue'
const router = useRouter()
const route = useRoute()
const type = route.params.type
const items = ref([])
const page = ref(0)
const loading = ref(false)
const xialoading = ref(false)
const finished = ref(false)
//rank判断，0降序，1升序
const rank = ref(0)
//判断时间，0降序，1升序
const time = ref(0)

const value1 = ref('0')
const value2 = ref('0')
const value3 = ref('0')
const option1 = [
  { text: '默认', value: '0' },
  { text: '最新', value: '1' },
  { text: '最近', value: '2' },
]
const option2 = [
  { text: '升序', value: '1' },
  { text: '降序', value: '0' },
]
const option3 = [
  { text: '筛选', value: '0' },
  { text: 'title', value: '1' },
  { text: '内容', value: '2' },
]

const dj1 = (value) => {
  rank.value = value
  onRefresh()
}
const dj0 = (value) => {
  time.value = value
  onRefresh()
}
const onRefresh = () => {
  page.value = 1
  finished.value = false
  const getShopData = () => {
    if (type == '手机') {
      get(api3 + '/fleaMarket/filter?typeId=1&price=' + rank.value, {
        Index: page.value,
        size: 6,
      }).then((res) => {
        items.value = res
        loading.value = false
      })
    } else if (type == '电脑') {
      get(api3 + '/fleaMarket/filter?typeId=2&price=' + rank.value, {
        Index: page.value,
        size: 6,
      }).then((res) => {
        items.value = res
        loading.value = false
      })
    } else if (type == '游戏') {
      get(api3 + '/fleaMarket/filter?typeId=3&price=' + rank.value, {
        Index: page.value,
        size: 6,
      }).then((res) => {
        items.value = res
        loading.value = false
      })
    } else if (type == '数码') {
      get(api3 + '/fleaMarket/filter?typeId=4&price=' + rank.value, {
        Index: page.value,
        size: 6,
      }).then((res) => {
        items.value = res
        loading.value = false
      })
    } else if (type == '工具') {
      get(api3 + '/fleaMarket/filter?typeId=5&price=' + rank.value, {
        Index: page.value,
        size: 6,
      }).then((res) => {
        items.value = res
        loading.value = false
      })
    }
  }
  const getData = async () => {
    if (type == '手机') {
      get(api3 + '/fleaMarket/filter?typeId=1&last=' + time.value, {
        Index: page.value,
        size: 6,
      }).then((res) => {
        items.value = res
        loading.value = false
      })
    } else if (type == '电脑') {
      get(api3 + '/fleaMarket/filter?typeId=2&last=' + time.value, {
        Index: page.value,
        size: 6,
      }).then((res) => {
        items.value = res
        loading.value = false
      })
    } else if (type == '游戏') {
      get(api3 + '/fleaMarket/filter?typeId=3&last=' + time.value, {
        Index: page.value,
        size: 6,
      }).then((res) => {
        items.value = res
        loading.value = false
      })
    } else if (type == '数码') {
      get(api3 + '/fleaMarket/filter?typeId=4&last=' + time.value, {
        Index: page.value,
        size: 6,
      }).then((res) => {
        items.value = res
        loading.value = false
      })
    } else if (type == '工具') {
      get(api3 + '/fleaMarket/filter?typeId=5&last=' + time.value, {
        Index: page.value,
        size: 6,
      }).then((res) => {
        items.value = res
        loading.value = false
      })
    }
  }
  getShopData()
  getData()
}
const onLoad = () => {
  page.value++
  const getShopData = () => {
    if (type == '手机') {
      get(api3 + '/fleaMarket/filter?typeId=1&price=' + rank.value, {
        Index: page.value,
        size: 6,
      })
        .then((res) => {
          if (res.length > 0) {
            res.forEach((element) => {
              items.value.push(element)
            })
            xialoading.value = false
          } else {
            finished.value = true
          }
          // console.log(items.value)
        })
        .catch(() => {
          finished.value = true
        })
    } else if (type == '电脑') {
      get(api3 + '/fleaMarket/filter?typeId=2&price=' + rank.value, {
        Index: page.value,
        size: 6,
      })
        .then((res) => {
          if (res.length > 0) {
            res.forEach((element) => {
              items.value.push(element)
            })
            xialoading.value = false
          } else {
            finished.value = true
          }
          // console.log(items.value)
        })
        .catch(() => {
          finished.value = true
        })
    } else if (type == '游戏') {
      get(api3 + '/fleaMarket/filter?typeId=3&price=' + rank.value, {
        Index: page.value,
        size: 6,
      })
        .then((res) => {
          if (res.length > 0) {
            res.forEach((element) => {
              items.value.push(element)
            })
            xialoading.value = false
          } else {
            finished.value = true
          }
          // console.log(items.value)
        })
        .catch(() => {
          finished.value = true
        })
    } else if (type == '数码') {
      get(api3 + '/fleaMarket/filter?typeId=4&price=' + rank.value, {
        Index: page.value,
        size: 6,
      })
        .then((res) => {
          if (res.length > 0) {
            res.forEach((element) => {
              items.value.push(element)
            })
            xialoading.value = false
          } else {
            finished.value = true
          }
          // console.log(items.value)
        })
        .catch(() => {
          finished.value = true
        })
    } else if (type == '工具') {
      get(api3 + '/fleaMarket/filter?typeId=5&price=' + rank.value, {
        Index: page.value,
        size: 6,
      })
        .then((res) => {
          if (res.length > 0) {
            res.forEach((element) => {
              items.value.push(element)
            })
            xialoading.value = false
          } else {
            finished.value = true
          }
          // console.log(items.value)
        })
        .catch(() => {
          finished.value = true
        })
    }
  }
  const getData = async () => {
    if (type == '手机') {
      get(api3 + '/fleaMarket/filter?typeId=1&last=' + time.value, {
        Index: page.value,
        size: 6,
      })
        .then((res) => {
          if (res.length > 0) {
            res.forEach((element) => {
              items.value.push(element)
            })
            xialoading.value = false
          } else {
            finished.value = true
          }
          // console.log(items.value)
        })
        .catch(() => {
          finished.value = true
        })
    } else if (type == '电脑') {
      get(api3 + '/fleaMarket/filter?typeId=2&last=' + time.value, {
        Index: page.value,
        size: 6,
      })
        .then((res) => {
          if (res.length > 0) {
            res.forEach((element) => {
              items.value.push(element)
            })
            xialoading.value = false
          } else {
            finished.value = true
          }
          // console.log(items.value)
        })
        .catch(() => {
          finished.value = true
        })
    } else if (type == '游戏') {
      get(api3 + '/fleaMarket/filter?typeId=3&last=' + time.value, {
        Index: page.value,
        size: 6,
      })
        .then((res) => {
          if (res.length > 0) {
            res.forEach((element) => {
              items.value.push(element)
            })
            xialoading.value = false
          } else {
            finished.value = true
          }
          // console.log(items.value)
        })
        .catch(() => {
          finished.value = true
        })
    } else if (type == '数码') {
      get(api3 + '/fleaMarket/filter?typeId=4&last=' + time.value, {
        Index: page.value,
        size: 6,
      })
        .then((res) => {
          if (res.length > 0) {
            res.forEach((element) => {
              items.value.push(element)
            })
            xialoading.value = false
          } else {
            finished.value = true
          }
          // console.log(items.value)
        })
        .catch(() => {
          finished.value = true
        })
    } else if (type == '工具') {
      get(api3 + '/fleaMarket/filter?typeId=5&last=' + time.value, {
        Index: page.value,
        size: 6,
      })
        .then((res) => {
          if (res.length > 0) {
            res.forEach((element) => {
              items.value.push(element)
            })
            xialoading.value = false
          } else {
            finished.value = true
          }
          // console.log(items.value)
        })
        .catch(() => {
          finished.value = true
        })
    }
  }
  getShopData()
  getData()
}
const xiangqing = (index) => {
  router.push({ path: `/service/market/list/detail/${index}` })
  get(api3 + '/fleaMarket/' + index).then((res) => {
    // console.log(res)
  })
}
onRefresh()
</script>
<style lang="scss" scoped>
.box {
  &__n2 {
    margin-top: 15px;
  }
}
</style>
