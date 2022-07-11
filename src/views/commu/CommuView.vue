/* *@description:广场/互助/二手/拼车列表页 *@author: 王 *@date: 2022-05-15 */
<template>
  <div class="page">
    <WdNavbar
      :show-slot="true"
      title="社区交流"
      icon-url="https://riddler.oss-cn-shanghai.aliyuncs.com/upload/community_busine_05.png"
      :on-click-right="onClickRight"
    />
    <div>
      <ConfigProvider :theme-vars="themeTaps">
        <tabs v-model:active="active" animated sticky offset-top="40">
          <!-- 广场列表 -->
          <tab title="广场">
            <PullRefresh v-model="loading" @refresh="onRefresh">
              <List
                v-model:loading="xialoading"
                :finished="finished"
                :offset="10"
                finished-text="没有更多了"
                @load="onLoad"
              >
                <div v-for="(item, index) in isshow.list" :key="index" class="cardlist">
                  <div class="userinfo">
                    <img :src="item.avatar" />
                    <div class="username">
                      <span>{{ item.username }}</span>
                      <p>{{ item.date }}</p>
                    </div>
                  </div>
                  <span class="msgtext" @click="detail(item.id)">{{ item.content }}</span>
                  <div class="banner" @click="detail(item.id)">
                    <div v-if="item.banner.length == 1">
                      <img
                        v-for="(item2, index1) in item.banner"
                        :key="index1"
                        :src="item2"
                        class="img1"
                      />
                    </div>
                    <div v-else-if="item.banner.length == 2">
                      <img
                        v-for="(item2, index1) in item.banner"
                        :key="index1"
                        :src="item2"
                        class="img2"
                      />
                    </div>
                    <div v-else>
                      <img
                        v-for="(item2, index1) in item.banner"
                        :key="index1"
                        :src="item2"
                        class="img3"
                      />
                    </div>
                  </div>
                  <div class="footer">
                    <div class="viewitem">
                      <div @click="dzsumbit1(index, item)">
                        <img v-if="item.praiseStatus == 0" src="../../assets/wl/36_广场_13.png" />
                        <img
                          v-else-if="item.praiseStatus == 1"
                          src="../../assets/wl/36_广场_03.png"
                        />
                      </div>
                      <span>{{ item.favorite }}</span>
                    </div>
                    <div class="viewitem">
                      <div @click="shoucang1(index, item)">
                        <img v-if="item.vn == 0" src="../../assets/wl/36_广场_13-05.png" />
                        <img v-if="item.vn == 1" src="../../assets/wl/36_广场_05.png" />
                      </div>
                      <span>{{ item.collect }}</span>
                    </div>
                    <div class="viewitem">
                      <img src="../../assets/wl/36_广场_14.png" />
                      <span>{{ item.remark }}</span>
                    </div>
                  </div>
                </div>
              </List>
            </PullRefresh>
          </tab>
          <!-- 互助列表 -->
          <tab title="互助">
            <PullRefresh v-model="hzloading" @refresh="hzonRefresh">
              <List
                v-model:loading="hzxialoading"
                :finished="hzfinished"
                :offset="10"
                finished-text="没有更多了"
                @load="hzonLoad"
              >
                <div v-for="(item, index) in isshow.list1" :key="index" class="cardlist">
                  <div class="userinfo">
                    <img :src="item.avatar" />
                    <div class="username">
                      <span>{{ item.username }}</span>
                      <p>{{ item.date }}</p>
                    </div>
                  </div>
                  <span class="msgtext" @click="detail1(item.id)">{{ item.content }}</span>
                  <div class="banner" @click="detail1(item.id)">
                    <div v-if="item.banner.length == 1">
                      <img
                        v-for="(item2, index1) in item.banner"
                        :key="index1"
                        :src="item2"
                        class="img1"
                      />
                    </div>
                    <div v-if="item.banner.length == 2">
                      <img
                        v-for="(item2, index1) in item.banner"
                        :key="index1"
                        :src="item2"
                        class="img2"
                      />
                    </div>
                    <div v-if="item.banner.length >= 3">
                      <img
                        v-for="(item2, index1) in item.banner"
                        :key="index1"
                        :src="item2"
                        class="img3"
                      />
                    </div>
                  </div>
                  <div class="footer">
                    <div class="viewitem">
                      <div @click="dzsumbit2(index)">
                        <img v-if="item.praiseStatus == 0" src="../../assets/wl/36_广场_13.png" />
                        <img
                          v-else-if="item.praiseStatus == 1"
                          src="../../assets/wl/36_广场_03.png"
                        />
                      </div>
                      <span>{{ item.favorite }}</span>
                    </div>
                    <div class="viewitem">
                      <div @click="shoucang2(index, item)">
                        <img v-if="item.vn == 0" src="../../assets/wl/36_广场_13-05.png" />
                        <img v-if="item.vn == 1" src="../../assets/wl/36_广场_05.png" />
                      </div>
                      <span>{{ item.collect }}</span>
                    </div>
                    <div class="viewitem">
                      <img src="../../assets/wl/36_广场_14.png" />
                      <span>{{ item.remark }}</span>
                    </div>
                  </div>
                </div>
              </List>
            </PullRefresh>
          </tab>
          <!-- 二手列表 -->
          <tab title="二手">
            <PullRefresh v-model="esloading" @refresh="esonRefresh">
              <List
                v-model:loading="esxialoading"
                :finished="esfinished"
                :offset="10"
                finished-text="没有更多了"
                @load="esonLoad"
              >
                <div v-for="(item, index) in isshow.list2" :key="index" class="cardlist">
                  <div class="userinfo">
                    <img :src="item.avatar" />
                    <div class="username">
                      <span>{{ item.username }}</span>
                      <p>{{ item.date }}</p>
                    </div>
                    <div class="money">
                      <span>￥{{ item.nowPrice }}</span>
                      <p>￥{{ item.oriPrice }}</p>
                    </div>
                  </div>
                  <span class="msgtext" @click="detail2(item.id)">{{ item.content }}</span>
                  <div class="banner" @click="detail2(item.id)">
                    <div v-if="item.banner.length == 1">
                      <img
                        v-for="(item2, index1) in item.banner"
                        :key="index1"
                        :src="item2"
                        class="img1"
                      />
                    </div>
                    <div v-if="item.banner.length == 2">
                      <img
                        v-for="(item2, index1) in item.banner"
                        :key="index1"
                        :src="item2"
                        class="img2"
                      />
                    </div>
                    <div v-if="item.banner.length >= 3">
                      <img
                        v-for="(item2, index1) in item.banner"
                        :key="index1"
                        :src="item2"
                        class="img3"
                      />
                    </div>
                  </div>
                  <div class="footer">
                    <div class="viewitem">
                      <div @click="dzsumbit3(index)">
                        <img v-if="item.praiseStatus == 0" src="../../assets/wl/36_广场_13.png" />
                        <img
                          v-else-if="item.praiseStatus == 1"
                          src="../../assets/wl/36_广场_03.png"
                        />
                      </div>
                      <span>{{ item.favorite }}</span>
                    </div>
                    <div class="viewitem">
                      <div @click="shoucang3(index, item)">
                        <img v-if="item.vn == 0" src="../../assets/wl/36_广场_13-05.png" />
                        <img v-if="item.vn == 1" src="../../assets/wl/36_广场_05.png" />
                      </div>
                      <span>{{ item.collect }}</span>
                    </div>
                    <div class="viewitem">
                      <img src="../../assets/wl/36_广场_14.png" />
                      <span>{{ item.remark }}</span>
                    </div>
                  </div>
                </div>
              </List>
            </PullRefresh>
          </tab>
          <!-- 拼车列表 -->
          <tab title="拼车">
            <PullRefresh v-model="pcloading" @refresh="pconRefresh">
              <List
                v-model:loading="pcxialoading"
                :finished="pcfinished"
                :offset="10"
                finished-text="没有更多了"
                @load="pconLoad"
              >
                <div v-for="(item, index) in isshow.list3" :key="index" class="cardlist">
                  <div class="userinfo">
                    <img :src="item.avatar" />
                    <div class="username">
                      <span>{{ item.username }}</span>
                      <p>{{ item.date }}</p>
                    </div>
                  </div>
                  <div class="carinfo" @click="detail3(item.id)">
                    <div class="cartime">
                      <span class="time">{{ item.time }}</span>
                      <span v-if="item.status == true" class="status">有车</span>
                      <span v-else class="status">无车</span>
                    </div>
                    <div class="carlocation">
                      <div class="qidian">
                        <img src="../../assets/wl/39_拼车_03.png" />
                        <span>{{ item.origin }}</span>
                      </div>
                      <div class="zhongdian">
                        <img src="../../assets/wl/39_拼车_05.png" />
                        <span>{{ item.destination }}</span>
                      </div>
                    </div>
                  </div>
                  <span class="msgtext" @click="detail3(item.id)">{{ item.content }}</span>
                  <div class="banner" @click="detail3(item.id)">
                    <div v-if="item.banner.length == 1">
                      <img
                        v-for="(item2, index1) in item.banner"
                        :key="index1"
                        :src="item2"
                        class="img1"
                      />
                    </div>
                    <div v-if="item.banner.length == 2">
                      <img
                        v-for="(item2, index1) in item.banner"
                        :key="index1"
                        :src="item2"
                        class="img2"
                      />
                    </div>
                    <div v-if="item.banner.length >= 3">
                      <img
                        v-for="(item2, index1) in item.banner"
                        :key="index1"
                        :src="item2"
                        class="img3"
                      />
                    </div>
                  </div>
                  <div class="footer">
                    <div class="viewitem">
                      <div @click="dzsumbit4(index)">
                        <img v-if="item.praiseStatus == 0" src="../../assets/wl/36_广场_13.png" />
                        <img
                          v-else-if="item.praiseStatus == 1"
                          src="../../assets/wl/36_广场_03.png"
                        />
                        <span>{{ item.favorite }}</span>
                      </div>
                    </div>
                    <div class="viewitem">
                      <div @click="shoucang4(index, item)">
                        <img v-if="item.vn == 0" src="../../assets/wl/36_广场_13-05.png" />
                        <img v-if="item.vn == 1" src="../../assets/wl/36_广场_05.png" />
                      </div>
                      <span>{{ item.collect }}</span>
                    </div>
                    <div class="viewitem">
                      <img src="../../assets/wl/36_广场_14.png" />
                      <span>{{ item.remark }}</span>
                    </div>
                  </div>
                </div>
              </List>
            </PullRefresh>
          </tab>
        </tabs>
      </ConfigProvider>
    </div>
  </div>
</template>
<script setup>
import { ConfigProvider, Tab, Tabs, PullRefresh, List } from 'vant'
import WdNavbar from '../../components/WdNavbar.vue'
import { useRouter } from 'vue-router'
import { get, api2, post } from '@/utils/request.js'
import { reactive, ref } from 'vue'

const router = useRouter()
const onClickRight = () => {
  router.push('/commu/publish')
}
const active = ref(0)
const isshow = reactive({
  list: [],
  list1: [],
  list2: [],
  list3: [],
})
const themeTaps = {
  tabActiveTextColor: '#F17716',
  tabTextColor: '#888888',
  tabFontSize: '16px',
  tabsLineHeight: '43px',
  tabsBottomBarColor: '#F17716',
  tabsBottomBarWidth: '58px',
  tabsBottomBarHeight: '2px',
}

//广场列表
const loading = ref(false)
const xialoading = ref(false)
const finished = ref(false)
const page = ref(0)
//互助列表
const hzloading = ref(false)
const hzxialoading = ref(false)
const hzfinished = ref(false)
const hzpage = ref(0)
//二手列表
const esloading = ref(false)
const esxialoading = ref(false)
const esfinished = ref(false)
const espage = ref(0)
//拼车列表
const pcloading = ref(false)
const pcxialoading = ref(false)
const pcfinished = ref(false)
const pcpage = ref(0)

const detail = (val1) => {
  router.push({ path: '/commu/detail', query: { id: val1, cn: '1' } })
}
const detail1 = (val2) => {
  router.push({ path: '/commu/detail', query: { id: val2, cn: '2' } })
}
const detail2 = (val3) => {
  router.push({ path: '/commu/detail', query: { id: val3, cn: '3' } })
}
const detail3 = (val4) => {
  router.push({ path: '/commu/detail', query: { id: val4, cn: '4' } })
}
const formatDuring = (time) => {
  var days = parseInt(time / (1000 * 60 * 60 * 24))
  var hours = parseInt((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  var minutes = parseInt((time % (1000 * 60 * 60)) / (1000 * 60))
  var seconds = Math.floor((time % (1000 * 60)) / 1000)
  if (days > 0) {
    return `${days}天前`
  } else if (hours > 0) {
    return `${hours}小时前`
  } else if (minutes > 0) {
    return `${minutes}分钟前`
  } else if (seconds > 0) {
    return `${seconds}秒前`
  }
  return days + '天' + hours + '小时' + minutes + '分钟' + seconds + '秒'
}

var abb = +new Date()
//广场列表
const onRefresh = () => {
  page.value = 1
  finished.value = false
  get(api2 + '/community/Gc', { Index: 1, size: 5, id: 1 }).then((res) => {
    res.forEach((ele) => {
      ele.createTime = ele.createTime.replace(/-/g, '/')
      ele.createTime = new Date(ele.createTime).getTime()
      ele['date'] = formatDuring(abb - ele.createTime)
      ele['vn'] = 0
      ele.banner = ele.banner.slice(1, ele.banner.length - 1).split(',')
    })
    isshow.list = res
    loading.value = false
  })
}
const onLoad = () => {
  page.value++
  get(api2 + '/community/Gc', { Index: page.value, size: 5, id: 1 }).then((res) => {
    if (res.length > 0) {
      res.forEach((ele) => {
        ele.createTime = ele.createTime.replace(/-/g, '/')
        ele.createTime = new Date(ele.createTime).getTime()
        ele['date'] = formatDuring(abb - ele.createTime)
        ele['vn'] = 0
        ele.banner = ele.banner.slice(1, ele.banner.length - 1).split(',')
      })
      if (isshow.list) isshow.list.push(...res)
      else isshow.list = res
      xialoading.value = false
    } else {
      finished.value = true
    }
  })
}
//互助列表
const hzonRefresh = () => {
  hzpage.value = 1
  hzfinished.value = false
  get(api2 + '/community/interact/Hd', { Index: 1, size: 5, id: 1 }).then((res) => {
    res.forEach((ele) => {
      ele.createTime = ele.createTime.replace(/-/g, '/')
      ele.createTime = new Date(ele.createTime).getTime()
      ele['date'] = formatDuring(abb - ele.createTime)
      ele['vn'] = 0
      ele.banner = ele.banner.slice(1, ele.banner.length - 1).split(',')
    })
    isshow.list1 = res
    hzloading.value = false
  })
}
const hzonLoad = () => {
  hzpage.value++
  get(api2 + '/community/interact/Hd', { Index: hzpage.value, size: 5, id: 1 }).then((res) => {
    if (res.length > 0) {
      res.forEach((ele) => {
        ele.createTime = ele.createTime.replace(/-/g, '/')
        ele.createTime = new Date(ele.createTime).getTime()
        ele['date'] = formatDuring(abb - ele.createTime)
        ele['vn'] = 0
        ele.banner = ele.banner.slice(1, ele.banner.length - 1).split(',')
      })
      if (isshow.list1) isshow.list1.push(...res)
      else isshow.list1 = res
      hzxialoading.value = false
    } else {
      hzfinished.value = true
    }
  })
}
//二手列表
const esonRefresh = () => {
  espage.value = 1
  esfinished.value = false
  get(api2 + '/community/sechand/Es', { Index: 1, size: 5, id: 1 }).then((res) => {
    res.forEach((ele) => {
      ele.createTime = ele.createTime.replace(/-/g, '/')
      ele.createTime = new Date(ele.createTime).getTime()
      ele['date'] = formatDuring(abb - ele.createTime)
      ele['vn'] = 0
      ele.banner = ele.banner.slice(1, ele.banner.length - 1).split(',')
    })
    isshow.list2 = res
    esloading.value = false
  })
}
const esonLoad = () => {
  espage.value++
  get(api2 + '/community/sechand/Es', { Index: espage.value, size: 5, id: 1 }).then((res) => {
    if (res.length > 0) {
      res.forEach((ele) => {
        ele.createTime = ele.createTime.replace(/-/g, '/')
        ele.createTime = new Date(ele.createTime).getTime()
        ele['date'] = formatDuring(abb - ele.createTime)
        ele['vn'] = 0
        ele.banner = ele.banner.slice(1, ele.banner.length - 1).split(',')
      })
      if (isshow.list2) isshow.list2.push(...res)
      else isshow.list2 = res
      esxialoading.value = false
    } else {
      esfinished.value = true
    }
  })
}
//拼车列表
const pconRefresh = () => {
  pcpage.value = 1
  pcfinished.value = false
  get(api2 + '/community/car/Pc', { Index: 1, size: 5, id: 1 }).then((res) => {
    res.forEach((ele) => {
      ele.createtime = ele.createtime.replace(/-/g, '/')
      ele.createtime = new Date(ele.createtime).getTime()
      ele['date'] = formatDuring(abb - ele.createtime)
      ele['vn'] = 0
      ele.banner = ele.banner.slice(1, ele.banner.length - 1).split(',')
    })
    isshow.list3 = res
    pcloading.value = false
  })
}
const pconLoad = () => {
  pcpage.value++
  get(api2 + '/community/car/Pc', { Index: pcpage.value, size: 5, id: 1 }).then((res) => {
    if (res.length > 0) {
      res.forEach((ele) => {
        ele.createtime = ele.createtime.replace(/-/g, '/')
        ele.createtime = new Date(ele.createtime).getTime()
        ele['date'] = formatDuring(abb - ele.createtime)
        ele['vn'] = 0
        ele.banner = ele.banner.slice(1, ele.banner.length - 1).split(',')
      })
      if (isshow.list3) isshow.list3.push(...res)
      else isshow.list3 = res
      pcxialoading.value = false
    } else {
      pcfinished.value = true
    }
  })
}

//点赞和取消点赞
const dzsumbit1 = (index) => {
  post(api2 + '/praise/add', { article_id: isshow.list[index].id, type_id: 1 }).then(() => {
    // onRefresh()
    if (isshow.list[index].praiseStatus == 0) {
      isshow.list[index].praiseStatus = 1
      isshow.list[index].favorite = isshow.list[index].favorite + 1
    } else {
      isshow.list[index].praiseStatus = 0
      isshow.list[index].favorite = isshow.list[index].favorite - 1
    }
  })
}
const dzsumbit2 = (index) => {
  post(api2 + '/praise/add', { article_id: isshow.list1[index].id, type_id: 2 }).then(() => {
    // hzonRefresh()
    if (isshow.list1[index].praiseStatus == 0) {
      isshow.list1[index].praiseStatus = 1
      isshow.list1[index].favorite = isshow.list1[index].favorite + 1
    } else {
      isshow.list1[index].praiseStatus = 0
      isshow.list1[index].favorite = isshow.list1[index].favorite - 1
    }
  })
}
const dzsumbit3 = (index) => {
  post(api2 + '/praise/add', { article_id: isshow.list2[index].id, type_id: 3 }).then(() => {
    // esonRefresh()
    if (isshow.list2[index].praiseStatus == 0) {
      isshow.list2[index].praiseStatus = 1
      isshow.list2[index].favorite = isshow.list2[index].favorite + 1
    } else {
      isshow.list2[index].praiseStatus = 0
      isshow.list2[index].favorite = isshow.list2[index].favorite - 1
    }
  })
}
const dzsumbit4 = (index) => {
  post(api2 + '/praise/add', { article_id: isshow.list3[index].id, type_id: 4 }).then(() => {
    // pconRefresh()
    if (isshow.list3[index].praiseStatus == 0) {
      isshow.list3[index].praiseStatus = 1
      isshow.list3[index].favorite = isshow.list3[index].favorite + 1
    } else {
      isshow.list3[index].praiseStatus = 0
      isshow.list3[index].favorite = isshow.list3[index].favorite - 1
    }
  })
}

const shoucang1 = (index, item) => {
  post(api2 + '/collection/add', {
    news_id: isshow.list[index].id,
    title: isshow.list[index].content,
    banner: '[' + isshow.list[index].banner + ']',
  }).then((res) => {
    // console.log(res)
    if (item.vn == 0) {
      isshow.list[index].vn = 1
      isshow.list[index].collect = isshow.list[index].collect + 1
    } else {
      isshow.list[index].vn = 0
      isshow.list[index].collect = isshow.list[index].collect - 1
    }
  })
}
const shoucang2 = (index, item) => {
  post(api2 + '/collection/add', {
    news_id: isshow.list1[index].id,
    title: isshow.list1[index].content,
    banner: '[' + isshow.list1[index].banner + ']',
  }).then((res) => {
    // console.log(res)
    if (item.vn == 0) {
      isshow.list1[index].vn = 1
      isshow.list1[index].collect = isshow.list1[index].collect + 1
    } else {
      isshow.list1[index].vn = 0
      isshow.list1[index].collect = isshow.list1[index].collect - 1
    }
  })
}
const shoucang3 = (index, item) => {
  post(api2 + '/collection/add', {
    news_id: isshow.list2[index].id,
    title: isshow.list2[index].content,
    banner: '[' + isshow.list2[index].banner + ']',
  }).then((res) => {
    // console.log(res)
    if (item.vn == 0) {
      isshow.list2[index].vn = 1
      isshow.list2[index].collect = isshow.list2[index].collect + 1
    } else {
      isshow.list2[index].vn = 0
      isshow.list2[index].collect = isshow.list2[index].collect - 1
    }
  })
}
const shoucang4 = (index, item) => {
  post(api2 + '/collection/add', {
    news_id: isshow.list3[index].id,
    title: isshow.list3[index].content,
    banner: '[' + isshow.list3[index].banner + ']',
  }).then((res) => {
    // console.log(res)
    if (item.vn == 0) {
      isshow.list3[index].vn = 1
      isshow.list3[index].collect = isshow.list3[index].collect + 1
    } else {
      isshow.list3[index].vn = 0
      isshow.list3[index].collect = isshow.list3[index].collect - 1
    }
  })
}
</script>
<style lang="scss" scoped>
.page {
  background-color: #f1f2f4;
  height: 100%;
  width: 100%;
  position: fixed;
  overflow-x: hidden;
  overflow-y: scroll;
  padding-bottom: 50px;

  .cardlist {
    margin: 18px auto;
    display: flex;
    flex-direction: column;
    width: 394px;
    height: auto;
    background-color: #ffffff;
    border-radius: 6px;
    box-shadow: 3px 4px 4px #d4d5d8;

    .userinfo {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      margin-top: 16px;
      margin-left: 18px;

      img {
        width: 41px;
        height: 41px;
        border-radius: 50%;
      }

      .username {
        margin-left: 11px;
        position: relative;
        top: 3px;

        span {
          font-size: 16px;
          font-family: PingFang;
          font-weight: bold;
          color: #333333;
          line-height: 20px;
          position: relative;
        }

        p {
          font-size: 13px;
          font-family: PingFang;
          font-weight: 400;
          color: #aaaaaa;
          line-height: 20px;
          position: relative;
          width: 200px;
        }
      }

      .money {
        display: flex;
        flex-direction: column;
        margin-left: 27px;
        position: relative;
        top: 1px;

        span {
          font-size: 16px;
          font-family: PingFang;
          font-weight: bold;
          color: #dc3333;
          margin-left: 14px;
        }

        p {
          font-size: 12px;
          font-family: PingFang;
          font-weight: 400;
          text-decoration: line-through;
          color: #aaaaaa;
          margin-left: 16px;
        }
      }
    }

    .carinfo {
      width: 357px;
      height: 60px;
      background-color: #e7e9ec;
      border-radius: 6px;
      margin-top: 10px;
      margin-left: 18px;

      .cartime {
        margin-top: 5px;
        margin-left: 15px;

        .time {
          font-size: 14px;
          font-family: PingFang;
          font-weight: 500;
          color: #666666;
        }

        .status {
          margin-left: 45px;
          font-size: 18px;
          font-family: PingFang;
          font-weight: 700;
          color: #666666;
        }
      }

      .carlocation {
        display: flex;
        margin-left: 7px;
        margin-top: 4px;

        .qidian {
          img {
            width: 16px;
            height: 18px;
          }

          span {
            position: relative;
            top: -4px;
            margin-left: 2px;
            font-size: 14px;
            font-family: PingFang;
            font-weight: bold;
            color: #444444;
          }
        }

        .zhongdian {
          margin-left: 25px;

          img {
            width: 16px;
            height: 18px;
          }

          span {
            position: relative;
            top: -4px;
            font-size: 14px;
            margin-left: 2px;
            font-family: PingFang;
            font-weight: bold;
            color: #444444;
          }
        }
      }
    }

    .msgtext {
      width: 358px;
      margin-top: 5px;
      margin-left: 18px;
      font-size: 16px;
      font-family: PingFang;
      font-weight: 400;
      color: #444444;
      line-height: 23px;
      text-align: justify;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .banner {
      margin-top: 10px;
      margin-left: 5px;

      img {
        object-fit: contain;
        object-position: center;
      }

      .img1 {
        width: 357px;
        height: 161px;
        margin-left: 13px;
      }

      .img2 {
        width: 173px;
        height: 161px;
        margin-left: 12px;
      }

      .img3 {
        width: 115px;
        height: 115px;
        margin-top: 2px;
        margin-left: 10px;
      }
    }

    .footer {
      display: flex;
      flex-direction: row;
      align-items: center;
      align-self: center;
      justify-content: center;
      width: 394px;

      .viewitem {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: auto 44px;
        padding-top: 16px;
        padding-bottom: 16px;

        img {
          width: 18px;
          height: 17px;
          margin-top: -1px;
          margin-right: 7px;
        }

        span {
          font-family: PingFang;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 14px;
          color: #878787;
        }
      }
    }
  }
}
</style>